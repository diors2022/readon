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
