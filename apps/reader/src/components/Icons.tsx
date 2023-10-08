import React from 'react'

interface IconProps {
  className?: string
}

export function LeftArrow({ className }: IconProps) {
  return (
    <svg
      width="54"
      height="89"
      viewBox="0 0 54 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.60634 50.7861C-0.868778 47.311 -0.868778 41.6674 2.60634 38.1923L38.1915 2.60711C40.7492 0.0494242 44.5579 -0.701201 47.894 0.688845C51.2301 2.07889 53.3986 5.30379 53.3986 8.91791V80.0882C53.3986 83.6746 51.2301 86.9273 47.894 88.3173C44.5579 89.7074 40.7492 88.9289 38.1915 86.399L2.60634 50.8139V50.7861Z"
      />
    </svg>
  )
}

export function RightArrow({ className }: IconProps) {
  return (
    <svg
      width="54"
      height="89"
      viewBox="0 0 54 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50.4732 50.7861C53.9265 47.311 53.9265 41.6674 50.4732 38.1923L15.1116 2.60711C12.5699 0.0494242 8.78515 -0.701201 5.47 0.688845C2.15485 2.07889 0 5.30379 0 8.91791V80.0882C0 83.6746 2.15485 86.9273 5.47 88.3173C8.78515 89.7074 12.5699 88.9289 15.1116 86.399L50.4732 50.8139V50.7861Z"
      />
    </svg>
  )
}

export function FontSizeIncrease({ className }: IconProps) {
  return (
    <svg width="42" height="27" viewBox="0 0 42 27" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_439_774)">
        <path d="M21.9609 2.92383L13.4883 26.25H10.0254L19.7812 0.65625H22.0137L21.9609 2.92383ZM29.0625 26.25L20.5723 2.92383L20.5195 0.65625H22.752L32.543 26.25H29.0625ZM28.623 16.7754V19.5527H14.2441V16.7754H28.623Z" />
        <path d="M34.6751 4.57266C34.7668 4.35836 34.7234 4.10995 34.5641 3.93948L31.2813 0.432648C31.1727 0.315753 31.0206 0.25 30.8613 0.25C30.702 0.25 30.5499 0.315753 30.4413 0.432648L27.1585 3.93948C26.9992 4.10995 26.9557 4.35836 27.0475 4.57266C27.1392 4.78697 27.3468 4.92578 27.5785 4.92578H29.3164V11.9395C29.3164 12.3705 29.6616 12.7188 30.0889 12.7188H31.6337C32.061 12.7188 32.4061 12.3705 32.4061 11.9395V4.92578H34.1441C34.3758 4.92578 34.5834 4.78697 34.6751 4.57266Z" />
      </g>
      <defs>
        <clipPath id="clip0_439_774">
          <rect width="42" height="26.5" fill="white" transform="translate(0 0.25)" />
        </clipPath>
      </defs>
    </svg>
  )
}
