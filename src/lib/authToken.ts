/**
 * Globaler Token-Store – entkoppelt den API-Client von React-Hooks.
 *
 * ProfilContext registriert Clerk's getToken() hier beim Mount.
 * apiFetch liest den Token ohne selbst ein Hook zu sein.
 */

type TokenGetter = () => Promise<string | null>

let _getter: TokenGetter | null = null

export function setTokenGetter(fn: TokenGetter): void {
  _getter = fn
}

export async function getAuthToken(): Promise<string | null> {
  if (!_getter) return null
  try {
    return await _getter()
  } catch {
    return null
  }
}
