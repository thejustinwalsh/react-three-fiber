/**
 * @fileoverview Internal Three.js re-exports - LEGACY ENTRY
 *
 * Pure WebGL path - no WebGPU imports.
 * Use this for the legacy import path: @react-three/fiber/legacy
 *
 * This keeps bundle size minimal for apps that don't need WebGPU.
 */

//* Build Flags ==============================
// Legacy build: WebGL only, no WebGPU
export const R3F_BUILD_LEGACY = true
export const R3F_BUILD_WEBGPU = false

//* Core Three.js (WebGL path) ==============================
export * from 'three'

//* Stubs for WebGPU-only features ==============================
// These prevent type/runtime errors in shared code
// They should never actually be used in legacy builds

// Inspector doesn't exist in legacy - stub it
export const Inspector = class Inspector {
  constructor() {
    throw new Error('Inspector is not available in legacy builds. Use @react-three/fiber/webgpu instead.')
  }
}

// WebGPURenderer stub - throws if someone tries to use it
export const WebGPURenderer = class WebGPURenderer {
  constructor() {
    throw new Error('WebGPURenderer is not available in legacy builds. Use @react-three/fiber/webgpu instead.')
  }
}

//* RenderTarget Compatibility ==============================
// Alias WebGLRenderTarget / WebGLCubeRenderTarget for shared code
// (e.g. useRenderTarget, <Environment>) that needs the renderer-appropriate
// flavor. The legacy build only ships the WebGL-prefixed classes from `three`.
export { WebGLRenderTarget as RenderTargetCompat, WebGLCubeRenderTarget as CubeRenderTargetCompat } from 'three'
// Stubs to prevent import errors in shared code (never instantiated due to
// build flags — `R3F_BUILD_WEBGPU === false` here, so any `new CubeRenderTarget()`
// branch is dead code that gets tree-shaken).
export const RenderTarget = null as any
export const CubeRenderTarget = null as any
