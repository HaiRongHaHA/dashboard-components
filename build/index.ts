/**
 * TIPS This is a temporary solution to fix the building error
 * ReferenceError: __name is not defined after upgrade the vue to @3.3.x
 */
export const defGlobalThisName = () => {
  const __defProp = Object.defineProperty
  const __name = (target: any, value: any) =>
    __defProp(target, 'name', { value, configurable: true })
  ;(globalThis as any).__name = __name
}
