import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAP — runs a GSAP animation inside a scoped context.
 * Automatically cleans up on unmount.
 *
 * @param {Function} fn  — receives { gsap, ScrollTrigger }
 * @param {Array}    deps — re-run deps (default [])
 * @returns ref — attach to the root container element
 */
export function useGSAP(fn, deps = []) {
  const ref = useRef(null)
  const ctx = useRef(null)

  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useIso(() => {
    if (!ref.current) return
    ctx.current = gsap.context(() => fn({ gsap, ScrollTrigger }), ref)
    return () => ctx.current?.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
