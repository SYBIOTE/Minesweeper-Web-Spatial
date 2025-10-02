/// <reference types="vite/client" />

declare const __XR_ENV_BASE__: string

declare module '*.vrm' {
  const src: string
  export default src
}
declare module '*.vrma' {
  const src: string
  export default src
}
declare module '*.json?url' {
  const src: string
  export default src
}
