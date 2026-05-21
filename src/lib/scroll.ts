export function scrollByPages(direction: 'left' | 'right') {
  const dir = direction === 'right' ? 1 : -1
  const mobileContainer = document.querySelector<HTMLElement>('.snap-x')
  if (mobileContainer && mobileContainer.offsetParent !== null) {
    mobileContainer.scrollBy({ left: window.innerWidth * dir, behavior: 'smooth' })
    return
  }
  const desktopContainer = document.querySelector<HTMLElement>('[data-swipeable="right"]')
  if (desktopContainer) {
    desktopContainer.scrollBy({ left: desktopContainer.clientWidth * dir, behavior: 'smooth' })
  }
}
