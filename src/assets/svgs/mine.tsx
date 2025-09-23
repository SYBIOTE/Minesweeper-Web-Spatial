import React from 'react'

interface MineSVGProps {
  style?: React.CSSProperties
  className?: string
}

const MineSVG: React.FC<MineSVGProps> = () => (
  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#CCD6DD" d="M24.187 9.657l5.658-5.654L32 6.16l-5.658 5.655z"></path><circle fill="#ff0000" cx="14" cy="22" r="14"></circle><path fill="#ff0000" d="M19 11.342l5.658-5.657l5.657 5.658L24.657 17z"></path><circle fill="#F18F26" cx="32" cy="4" r="4"></circle><circle fill="#FDCB58" cx="32" cy="4" r="2"></circle></g></svg>
)

export default MineSVG
