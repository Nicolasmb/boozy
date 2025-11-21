import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
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

export function Home() {
	const homeRef = useRef<HTMLDivElement>(null)

	// Initialize Lenis smooth scrolling
	useSmoothScroll()

	// Initialize scroll animations
	useScrollAnimation()

	useEffect(() => {
		const home = homeRef.current
		if (!home) return

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()
			home.scrollLeft += e.deltaY + e.deltaX
		}

		home.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			home.removeEventListener('wheel', handleWheel)
		}
	}, [])

	return (
		<div className='home' ref={homeRef}>
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
				<div className='column box-0'>
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
					<Link to="/sos-sexy" className="sos-sexy-text">
						¿SOS SEXY?
					</Link>
				</div>
				{/* 2º COLUMNA */}
				<div className='column'>
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
				<div className='row animate-on-scroll delay-500'>
					<div className='box-12'>
						<Link to="/presentacion" className="presentacion-text">
							PRESENTACIÓN
						</Link>
						<div className="te-animas-text">
							¿Te animás?
						</div>
					</div>
				</div>
				</div>
				{/* 4º COLUMNA - Videos & Images */}
				<div className='column'>
					<div className='box-17'>
						<div className='row animate-on-scroll delay-500'>
							<div className="te-animas-text">
								“FUSIÓN DE UN COCTEL PREMIUM
								& UN HELADO ARTESANAL”
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
						<div className='box-14 video-panel animate-on-scroll delay-700'>
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
					<div className='row'>
						{/* Box 16: ES AHORA - CTA Final */}
						<div className='box-16 animate-on-scroll delay-900'>
							<div className="es-ahora-overlay">
								<h2 className="es-ahora-title">ES AHORA</h2>
								<p className="es-ahora-text">Esto recién empieza</p>
								<div className="es-ahora-buttons">
									<Link to="/presentacion" className="btn-primary">
										Ver Sabores
									</Link>
									<Link to="/se-parte" className="btn-secondary">
										Quiero Distribuir
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
