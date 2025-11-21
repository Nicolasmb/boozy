import { Link } from 'react-router-dom'
import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import images

import picture1bWebP from '../assets/picture-1b.webp'

// Import sticker
import stickerGreen from '../assets/sticker-green.png'

// Import video
import tragosVideo from '../assets/tragos-redes-1-optimized.mp4'

export function SeParte() {
	return (
		<div className="page-container">
			{/* Hero Section with Video Background */}
			<section className="hero-section-video">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="hero-video-background"
				>
					<source src={tragosVideo} type="video/mp4" />
				</video>
				<div className="hero-overlay">
					<h1 className="hero-title">CONVERTITE EN PUNTO BOOZY</h1>
					<p className="hero-subtitle">
						Llevá el cóctel más sexy a tu local o evento
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="content-section">
				<div className="content-wrapper">
					{/* Sticker decorativo */}
					<div style={{ position: 'relative', minHeight: '100px' }}>
						<DraggableSticker
							src={stickerGreen}
							alt="BOOZY Sticker Verde"
							initialX={50}
							initialY={20}
							initialRotation={15}
							size={100}
							zIndex={10}
						/>
					</div>

					{/* Propuesta de Valor */}
					<div className="value-prop">
						<h2 className="section-title">
							<span className="text-red">DONDE HAY BOOZY,</span>{' '}
							<span className="text-black">HAY GANAS</span>
						</h2>
						<p className="section-text">
							Súmate como punto de venta y ofrecé una experiencia única
							que tus clientes no van a olvidar.
						</p>
					</div>

					{/* Beneficios Grid */}
					<div className="benefits-grid">
						<div className="benefit-card animate-on-scroll">
							<div className="benefit-icon">❄️</div>
							<h3 className="benefit-title">Freezer Incluido</h3>
							<p className="benefit-text">
								Te damos el freezer para que tengas BOOZY siempre listo
							</p>
						</div>

						<div className="benefit-card animate-on-scroll delay-100">
							<div className="benefit-icon">🥂</div>
							<h3 className="benefit-title">Copas de Regalo</h3>
							<p className="benefit-text">
								Copas personalizadas para servir BOOZY con estilo
							</p>
						</div>

						<div className="benefit-card animate-on-scroll delay-200">
							<div className="benefit-icon">🎨</div>
							<h3 className="benefit-title">Gráfica Completa</h3>
							<p className="benefit-text">
								Material POP, afiches, stickers y todo lo que necesites
							</p>
						</div>

						<div className="benefit-card animate-on-scroll delay-300">
							<div className="benefit-icon">📈</div>
							<h3 className="benefit-title">Soporte Comercial</h3>
							<p className="benefit-text">
								Te acompañamos en cada paso para que vendas más
							</p>
						</div>
					</div>

					{/* Image Section */}
					<div className="image-section animate-on-scroll delay-400">
						<OptimizedImage
							className="content-image"
							
							webpSrc={picture1bWebP}
							alt="BOOZY en tu local"
							loading="lazy"
						/>
					</div>

					{/* Testimonial / Quote */}
					<div className="quote-section animate-on-scroll delay-500">
						<blockquote className="quote-text">
							"No solo vas a vender. Vas a provocar."
						</blockquote>
					</div>

					{/* CTA Section */}
					<div className="cta-section animate-on-scroll delay-600">
						<h2 className="cta-title">¿Te animás?</h2>
						<p className="cta-text">
							Contactanos para conocer más detalles sobre cómo convertirte
							en punto BOOZY
						</p>
						<div className="cta-buttons">
							<Link to="/contacto" className="btn-primary-large">
								Quiero ser Distribuidor
							</Link>
							<a
								href="mailto:gerencia@quieroboozy.com"
								className="btn-secondary-large"
							>
								Enviar Email
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
