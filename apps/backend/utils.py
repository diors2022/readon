from datetime import datetime
import math

from matplotlib import pyplot as plt
from IPython.display import display
from PIL import Image
import numpy as np
import pandas as pd

from peewee import IntegerField, Model, CharField, SqliteDatabase, AutoField
from velocityThreshold import detect_fix_ivt, find_sacc_from_fix

db = SqliteDatabase("events.db")


class Events(Model):
    id = AutoField(primary_key=True)
    time = IntegerField()
    agent = CharField()
    event = CharField()
    participant_id = IntegerField()
    old_value = CharField(null=True)
    new_value = CharField(null=True)
    screenshot_file = CharField(null=True)

    class Meta:
        database = db


def show_screenshot_for_record(_id):
    events = (
        Events.select().where(Events.id == _id).order_by(Events.time.asc()).limit(1)
    )
    if len(events) == 0:
        print("No events found for id: ", _id)
        return
    event = events[0]
    image_path = event.screenshot_file
    print(_id)
    display(Image.open(image_path))


X_PIXELS = 2560
Y_PIXELS = 1440
TIMESTAMP_IDENT = "system_time_stamp"
OFFSET = 10_000_000
DEGREES_PER_PIXEL = np.rad2deg(np.arctan((0.336 / Y_PIXELS) / 0.6))


def extract_gaze_data_between_timestamps(gaze_data, start_time, end_time):
    # gaze data is the entire json file
    # lower and upper bound are in seconds

    T_start = start_time
    T_end = end_time

    gaze_data_start_time = gaze_data["start_time"]
    # parse timestamp from format YYYY-MM-DD HH:MM:SS
    gaze_data_start_time = datetime.strptime(gaze_data_start_time, "%Y-%m-%d %H:%M:%S")
    # convert to unix timestamp
    T_G_start = datetime.timestamp(gaze_data_start_time)

    T_offset_start = T_start - T_G_start
    T_offset_start = T_offset_start * 1_000_000

    T_offset_end = T_end - T_G_start
    T_offset_end = T_offset_end * 1_000_000

    T_D_start = gaze_data["data"][0][TIMESTAMP_IDENT]

    lower_bound = T_D_start + T_offset_start + OFFSET
    upper_bound = T_D_start + T_offset_end + OFFSET

    # get all data between lower and upper bound
    gaze_data_between_timestamps = [
        packet
        for packet in gaze_data["data"]
        if packet[TIMESTAMP_IDENT] >= lower_bound
        and packet[TIMESTAMP_IDENT] <= upper_bound
    ]

    return gaze_data_between_timestamps


def extract_gaze_data_between_timestamps_proper(gaze_data, start_time, end_time):
    # gaze data is the entire json file
    # start_time and end_time are in milliseconds
    # Deepy copy gaze_data
    gaze_data = gaze_data.copy()

    T_s_0 = gaze_data["data"][0][TIMESTAMP_IDENT]  # microseconds
    system_start_time_mono = (
        gaze_data["system_start_time_mono"] / 1_000
    )  # convert nanoseconds to microseconds
    delta = T_s_0 - system_start_time_mono
    system_start_time_epoch = (
        gaze_data["system_start_time_epoch"] * 1_000_000
    )  # convert seconds to microseconds
    T_E_0 = system_start_time_epoch + delta

    T_x = start_time * 1_000  # convert milliseconds to microseconds
    T_y = end_time * 1_000  # convert milliseconds to microseconds
    lower_bound = T_s_0 + (T_x - T_E_0)
    upper_bound = T_s_0 + (T_y - T_E_0)

    # get all data between lower and upper bound
    gaze_data["data"] = [
        packet
        for packet in gaze_data["data"]
        if packet[TIMESTAMP_IDENT] >= lower_bound
        and packet[TIMESTAMP_IDENT] <= upper_bound
    ]

    return gaze_data


def find_gaze_packet_at_timestamp(gaze_data, timestamp, properties_to_check_validity):
    # gaze data is the entire json file
    # timestamp is in milliseconds

    T_s_0 = gaze_data["data"][0][TIMESTAMP_IDENT] # microseconds
    system_start_time_mono = gaze_data['system_start_time_mono']  / 1_000 # convert nanoseconds to microseconds
    delta = T_s_0 - system_start_time_mono
    system_start_time_epoch = gaze_data['system_start_time_epoch'] * 1_000_000 # convert seconds to microseconds
    T_E_0 = system_start_time_epoch + delta

    T_x = timestamp * 1_000 # convert milliseconds to microseconds
    lower_bound = T_s_0 +  (T_x - T_E_0)

    # get all data between lower and upper bound
    gaze_data_at_timestamp = next((
        packet
        for packet in gaze_data["data"]
        if packet[TIMESTAMP_IDENT] >= lower_bound
        and all(packet[prop] == 1 for prop in properties_to_check_validity)
    ))

    return gaze_data_at_timestamp


def print_record(record):
    print(
        record.id,
        record.time,
        record.agent,
        record.event,
        record.participant_id,
        record.old_value,
        record.new_value,
        record.screenshot_file,
    )


def show_screenshot_for_record(_id):
    events = Events.select().where(Events.id == _id).order_by(Events.time.asc()).limit(1)
    if len(events) == 0:
        print("No events found for id: ", _id)
        return
    event = events[0]
    image_path = event.screenshot_file
    print(_id)
    display(Image.open(image_path))


def show_participant_screenshots(participant_events):
    for event in participant_events:
        image_path = event.screenshot_file
        print_record(event)
        display(Image.open(image_path))


def extract_x_y_timestamps_from_gaze_data(gaze_data):
    x = []
    y = []
    timestamps = []

    for packet in gaze_data:
        if packet["right_gaze_point_validity"] == 0:
            continue
        x.append(packet["right_gaze_point_on_display_area"][0] * X_PIXELS)
        y.append(packet["right_gaze_point_on_display_area"][1] * Y_PIXELS)
        timestamps.append(packet[TIMESTAMP_IDENT])

    # timestamps_normalized = [(t - min(timestamps)) / (max(timestamps) - min(timestamps)) for t in timestamps]
    return x, y, timestamps


def merge_databases(other_database_name):
    ###
    db = SqliteDatabase("events.db")
    db.connect()
    db.execute_sql(
        f"""
        ATTACH '{other_database_name}' AS db2;
        INSERT INTO events (
            time,
            agent,
            event,
            participant_id,
            old_value,
            new_value,
            screenshot_file
        )
        SELECT
            time,
            agent,
            event,
            participant_id,
            old_value,
            new_value,
            screenshot_file
        FROM db2.events;
        DETACH db2;
        """
    )
