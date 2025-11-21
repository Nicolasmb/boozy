import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
	const elementsRef = useRef<HTMLElement[]>([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in')
						// Opcional: dejar de observar después de animar
						// observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: 0.1, // Trigger when 10% of element is visible
				rootMargin: '0px',
			}
		)

		// Observar todos los elementos con clase 'animate-on-scroll'
		const elements = document.querySelectorAll('.animate-on-scroll')
		elements.forEach((el) => observer.observe(el))

		return () => {
			elements.forEach((el) => observer.unobserve(el))
		}
	}, [])

	return elementsRef
}
