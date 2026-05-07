/**
 * @fileoverview Internal Three.js re-exports - WEBGPU ONLY ENTRY
 *
 * Pure WebGPU path - no WebGL legacy.
 * Use this for the explicit webgpu import path: @react-three/fiber/webgpu
 *
 * This is for apps that want ONLY WebGPU with no legacy fallback.
 * Attempting to use WebGLRenderer will cause type/runtime errors (intentional).
 */

//* Build Flags ==============================
// WebGPU-only build: no legacy WebGL
export const R3F_BUILD_LEGACY = false
export const R3F_BUILD_WEBGPU = true

//* Core Three.js (WebGPU path) ==============================
export * from 'three/webgpu'

//* Addons ==============================
export { Inspector } from 'three/addons/inspector/Inspector.js'

//* Stubs for legacy-only features ==============================
// WebGLRenderer stub - throws if someone tries to use it in webgpu-only build
export const WebGLRenderer = class WebGLRenderer {
  constructor() {
    throw new Error(
      'WebGLRenderer is not available in webgpu-only builds. Use @react-three/fiber or @react-three/fiber/legacy instead.',
    )
  }
}

// Type stubs for legacy types (never actually used)
export type WebGLRendererParameters = never
export type WebGLShadowMap = never

//* RenderTarget Compatibility ==============================
// Alias RenderTarget / CubeRenderTarget for shared code (e.g. useRenderTarget,
// <Environment>) that needs the renderer-appropriate flavor. In the WebGPU
// build, the renderer-agnostic classes from `three/webgpu` are the canonical
// choice; the legacy WebGL classes don't exist on this entry.
// CubeRenderTarget is exported from `three/webgpu` at runtime since 0.181.x
// but `@types/three@0.181.0` (our pin) doesn't declare the export — the type
// declaration was added in `@types/three@0.183.1`. Suppress until the type
// pin is bumped (separate PR — bumping currently surfaces unrelated drift in
// useUniform/useUniforms hooks where `UniformNode.setName` typing changed).
// @ts-expect-error - CubeRenderTarget type lag in @types/three@0.181.0
export { RenderTarget as RenderTargetCompat, CubeRenderTarget as CubeRenderTargetCompat } from 'three/webgpu'
// Stubs to prevent import errors in shared code (never instantiated due to
// build flags — `R3F_BUILD_LEGACY === false` here, so any `new WebGLCubeRenderTarget()`
// branch is dead code that gets tree-shaken).
export const WebGLRenderTarget = null as any
export const WebGLCubeRenderTarget = null as any
