// utils/authHelper.ts

let logoutFn: (() => void) | null = null

export function registerLogout(fn: () => void) {
  logoutFn = fn
}

export function callLogout() {
  if (logoutFn) {
    logoutFn()
    window.location.href = '/'
  } else {
    console.warn('logout não registrado')
  }
}
