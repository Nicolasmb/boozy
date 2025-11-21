import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
	const lenisRef = useRef<Lenis | null>(null)

	useEffect(() => {
		// Initialize Lenis for horizontal smooth scrolling
		const lenis = new Lenis({
			orientation: 'horizontal', // Horizontal scrolling
			gestureOrientation: 'both', // Allow both vertical and horizontal gestures
			smoothWheel: true,
			wheelMultiplier: 1.0,
			touchMultiplier: 2.0,
			infinite: false,
			duration: 1.2, // Smooth scroll duration
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
		})

		lenisRef.current = lenis

		// Request animation frame loop for Lenis
		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)

		// Cleanup
		return () => {
			lenis.destroy()
		}
	}, [])

	return lenisRef
}
