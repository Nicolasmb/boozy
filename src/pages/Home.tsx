import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import WebP images
import picture1WebP from '../assets/picture-1.webp'
import picture2WebP from '../assets/picture-2.webp'
import picture3WebP from '../assets/picture-3.webp'
import picture4WebP from '../assets/picture-4.webp'
import picture5WebP from '../assets/picture-5.webp'
import picture6WebP from '../assets/picture-6.webp'
import picture8WebP from '../assets/picture-8.webp'
import boozyDarkImageWebP from '../assets/boozy-dark.webp'
import picture10WebP from '../assets/picture-10.webp'
import picture11WebP from '../assets/picture-11.webp'

// Import videos
import boozyVideo from '../assets/BOOZY2-optimized.mp4'
import tragosVideo from '../assets/tragos-redes-1-optimized.mp4'

// Import stickers
import stickerRed from '../assets/sticker-red.png'
import stickerGreen from '../assets/sticker-green.png'
import stickerBlack from '../assets/sticker-black.png'
import cinta from '../assets/cinta.png'

export function Home() {
	const homeRef = useRef<HTMLDivElement>(null)
	const location = useLocation()

	// Initialize Lenis smooth scrolling - DESACTIVADO para usar CSS scroll-behavior: smooth
	// useSmoothScroll()

	// Initialize scroll animations
	useScrollAnimation()

	useEffect(() => {
		const pageContainer = document.querySelector('.page-container') as HTMLElement
		if (!pageContainer) return

		// Configuración: ajusta estos valores si el scroll es muy lento/rápido
		const SCROLL_MULTIPLIER = 2.5 // Multiplicador base
		const LINE_HEIGHT = 40 // Píxeles por línea (estándar de navegadores)
		const PAGE_HEIGHT = 800 // Píxeles por página

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()

			let deltaX = e.deltaX
			let deltaY = e.deltaY

			// Normalizar según el deltaMode (especificación WheelEvent)
			// https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
			switch (e.deltaMode) {
				case WheelEvent.DOM_DELTA_PIXEL:
					// 0x00: Los deltas ya están en píxeles (más común)
					// No hacer nada, ya está normalizado
					break
				case WheelEvent.DOM_DELTA_LINE:
					// 0x01: Los deltas están en líneas (Firefox en Windows/Linux)
					deltaX *= LINE_HEIGHT
					deltaY *= LINE_HEIGHT
					break
				case WheelEvent.DOM_DELTA_PAGE:
					// 0x02: Los deltas están en páginas (muy raro)
					deltaX *= PAGE_HEIGHT
					deltaY *= PAGE_HEIGHT
					break
			}

			// Aplicar multiplicador para control más responsivo
			const scrollAmount = (deltaY + deltaX) * SCROLL_MULTIPLIER

			pageContainer.scrollLeft += scrollAmount
		}

		pageContainer.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			pageContainer.removeEventListener('wheel', handleWheel)
		}
	}, [])

	// Manejar scroll cuando se navega desde otra página
	useEffect(() => {
		const state = location.state as { scrollTo?: string } | null
		if (state?.scrollTo) {
			// Pequeño delay para asegurar que el DOM esté completamente cargado
			setTimeout(() => {
				const element = document.getElementById(state.scrollTo!)
				const pageContainer = document.querySelector('.page-container') as HTMLElement
				if (element && pageContainer) {
					// Scroll horizontal suave animado
					const targetLeft = element.offsetLeft - 100
					const startLeft = pageContainer.scrollLeft
					const distance = targetLeft - startLeft
					const duration = 800 // Duración en milisegundos
					let startTime: number | null = null

					function animation(currentTime: number) {
						if (startTime === null) startTime = currentTime
						const timeElapsed = currentTime - startTime
						const progress = Math.min(timeElapsed / duration, 1)

						// Easing function (easeInOutCubic)
						const ease = progress < 0.5
							? 4 * progress * progress * progress
							: 1 - Math.pow(-2 * progress + 2, 3) / 2

						pageContainer.scrollLeft = startLeft + distance * ease

						if (progress < 1) {
							requestAnimationFrame(animation)
						}
					}

					requestAnimationFrame(animation)
				}
			}, 300)
		}
	}, [location])

	return (
		<div className='home' ref={homeRef} id="home">
			{/* Contenedor de stickers - capa absoluta que se mueve con el scroll */}
			<div className='stickers-container'>
				{/* Sticker rojo #QUIEROBOOZY - arrastrable y rotable */}
				<DraggableSticker
					src={stickerRed}
					alt="BOOZY Sticker #QUIEROBOOZY"
					initialX={675}
					initialY={630}
					initialRotation={-45}
					size={120}
					zIndex={100}
				/>
				{/* Sticker verde - arrastrable y rotable */}
				<DraggableSticker
					src={stickerGreen}
					alt="BOOZY Sticker Verde"
					initialX={1450}
					initialY={70}
					initialRotation={0}
					size={110}
					zIndex={99}
				/>
			</div>

			<div className='main-content'>
				{/* 1º COLUMNA */}
				<div className='column box-0' id="productos">
					{/* Hero Product Image */}
					<div className='animate-on-scroll'>
						<a href="#productos" className="w-inline-block">
							<OptimizedImage
								className="image-2"
								webpSrc={picture1WebP}
								width="634"
								alt="BOOZY - El blend más sexy"
								loading="lazy"
							/>
						</a>
					</div>
					<div className='animate-on-scroll delay-200'>
						<Link to="/sos-sexy" className="sos-sexy-text">
							¿SOS SEXY?
						</Link>
					</div>
				</div>
				{/* 2º COLUMNA */}
				<div className='column' id="blend">
						<div className='row'>
							<div className="box-1 animate-on-scroll delay-200">
								<a href="#blend" className="link-block w-inline-block">
									<div className="text-block el-blend-mas-sexy">
										<span className="text-red">EL BLEND </span>
										<span className="text-black">MÁS SEXY</span>
									</div>
									<div>
										<OptimizedImage
											className="boozy-logo-image"
											webpSrc={boozyDarkImageWebP}
											alt="BOOZY"
											loading="eager"
										/>
									</div>
								</a>
							</div>
						</div>
						<div className='row animate-on-scroll delay-300'>
							<div className='box-5'>
								<div className='picture-box'>
									<OptimizedImage
										className='image'
										webpSrc={picture8WebP}
										alt='BOOZY - Experiencia única'
										loading="lazy"
									/>
								</div>
								<div className='picture-box'>
									<OptimizedImage
										className='image'
										webpSrc={picture2WebP}
										alt='BOOZY - Cóctel helado'
										loading="lazy"
									/>
								</div>
								<div className='picture-box'>
									<OptimizedImage
										className='image'
										webpSrc={picture3WebP}
										alt='BOOZY - Para los más sexy'
										loading="lazy"
									/>
							</div>
						</div>
					</div>
				</div>
				{/* 3ª COLUMNA */}
				<div className='column column-3'>
				{/* Contenedor de sticker con animación de scroll */}
				<div className='stickers-container animate-on-scroll delay-400'>
					<DraggableSticker
						src={stickerBlack}
						alt="BOOZY Sticker Negro"
						initialX={150}
						initialY={500}
						initialRotation={-45}
						size={115}
						zIndex={98}
				/>
				</div>
				{/* Second Column - Gallery & Sections */}
				<div className='row-alt animate-on-scroll delay-400'>
					<div className='box-6'></div>
					<div className='box-7'>
						<div className='picture-box'>
							<OptimizedImage
								className='image'
								webpSrc={picture4WebP}
								alt='BOOZY - Innovador y trendy'
								loading="lazy"
							/>
						</div>
					</div>
					<div className='box-8'>
						<div className='picture-box'>
							<OptimizedImage
								className='image'
								webpSrc={picture5WebP}
								alt='BOOZY - Único en el mercado'
								loading="lazy"
							/>
						</div>
					</div>
					<div className='box-9'>
						<Link to="/preguntas" className="preguntas-vertical-text">
							PREGUNTAS
						</Link>
					</div>
					<div className='box-11'>
						<div className='picture-box'>
							<OptimizedImage
								className='image'
								
								webpSrc={picture6WebP}
								alt='BOOZY - Fusión perfecta'
								loading="lazy"
							/>
						</div>
					</div>
				</div>

				{/* PRESENTACIÓN Section */}
				<div className='row animate-on-scroll delay-500' id="sabores">
					<div className='box-12'>
						<Link to="/presentacion" className="presentacion-text">
							PRESENTACIÓN
						</Link>
						<div className="te-animas-text">
							¿TE ANIMÁS?
						</div>
					</div>
				</div>
				</div>
				{/* 4º COLUMNA - Videos & Images */}
				<div className='column column-4' id="fusion">
					<div className='box-17'>
						<div className='row animate-on-scroll delay-500'>
							<div className="fusion-text">
								"<strong className='highlight'>FUSIÓN DE UN COCTEL PREMIUM</strong> &amp; UN HELADO ARTESANAL”
							</div>
						</div>
					</div>
					<div className='row'>
						{/* Box 13: FUSIÓN - Video BOOZY2.mp4 */}
						<div className='box-13 video-panel animate-on-scroll delay-600'>
							<video
								src={boozyVideo}
								autoPlay
								loop
								muted
								playsInline
								preload="auto"
								className="video-content"
							/>
							<div className="video-overlay">
								<h3 className="video-title">FUSIÓN</h3>
								<p className="video-subtitle">Helado + Cóctel = BOOZY</p>
							</div>
						</div>

						{/* Box 14: DIVERTIDO - Video TRAGOS REDES 1.mp4 */}
						<div className='box-14 video-panel animate-on-scroll delay-700' id="divertido">
							<video
								src={tragosVideo}
								autoPlay
								loop
								muted
								playsInline
								preload="auto"
								className="video-content"
							/>
							<div className="video-overlay">
								<h3 className="video-title">DIVERTIDO</h3>
								<p className="video-subtitle">Donde hay BOOZY, hay ganas</p>
							</div>
							{/* Box 15: Image - picture-10 */}
							<div className='box-15 animate-on-scroll delay-800'>
								<div className='picture-box'>
									<OptimizedImage
										className='image'
										webpSrc={picture10WebP}
										alt='BOOZY - Momentos únicos'
										loading="lazy"
									/>
								</div>
							</div>
						</div>
						<div className='picture-box'>
							<OptimizedImage
								className='image'
								webpSrc={picture11WebP}
								alt='BOOZY - Es ahora'
								loading="lazy"
							/>
						</div>
					</div>

				</div>
				{/* 5º COLUMNA - Videos & Images */}
				<div className='column'>
					{/* Box 16: ES AHORA - CTA Final */}
					<div className='box-16 animate-on-scroll delay-600' id="es-ahora">
						<div className="es-ahora-container">
							{/* LEFT COLUMN: Images with Overlay */}
							<div className="es-ahora-images">
								<div className="es-ahora-image-wrapper es-ahora-image-top">
									<OptimizedImage
										className='es-ahora-image'
										webpSrc={picture3WebP}
										alt='BOOZY - Producto'
										loading="lazy"
									/>
								</div>
								<div className="es-ahora-sexy-text">
									<div className="es-ahora-sexy-wrapper">
										<span className="es-ahora-plus">+</span>
										<span className="es-ahora-sexy">SEXY</span>
									</div>
								</div>
								<div className="es-ahora-image-wrapper es-ahora-image-bottom">
									<OptimizedImage
										className='es-ahora-image'
										webpSrc={picture4WebP}
										alt='BOOZY - Producto lifestyle'
										loading="lazy"
									/>
								</div>
							</div>

							{/* RIGHT COLUMN: Content */}
							<div className="es-ahora-content">
								<h2 className="es-ahora-subtitle"><strong>ESTO RECIÉN EMPIEZA</strong></h2>
								<div className="es-ahora-logo-image">
									<OptimizedImage
										className='es-ahora-logo'
										webpSrc={boozyDarkImageWebP}
										alt='BOOZY Logo'
										loading="lazy"
									/>
								</div>
								<p className="es-ahora-text"><strong>BOOZY no es una moda.</strong></p>
								<p className="es-ahora-text">Es una declaración.</p>
								<p className="es-ahora-text">
									Detrás de cada pote hay ideas, pruebas, errores, aciertos.
									Hay noches sin dormir, apuestas personales y una obsesión:
									<strong> crear algo que valga la pena sentir.</strong>
								</p>
								<p className="es-ahora-text">
									BOOZY es eso que se nota. Que llama la atención, que despierta sonrisas,
									que no se olvida fácil.
								</p>
								<p className="es-ahora-text">
									Si buscás algo distinto, si querés que te miren dos veces,
									si estás cansado de lo mismo y te animás a más...
								</p>
								<p className="es-ahora-text"><strong>BOOZY es para vos.</strong></p>
								<p className="es-ahora-text">
									Y si tenés un local, un evento o una barra,
									<strong> convertite en punto BOOZY</strong> y serví una experiencia.
									No solo vas a vender. Vas a provocar.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Floating cinta at the end */}
				<div className="floating-cinta animate-on-scroll delay-900">
					<img src={cinta} alt="BOOZY Cinta" loading="lazy" />
				</div>
			</div>
		</div>
	)
}
