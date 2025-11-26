import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import images
import picture12WebP from '../assets/picture-12.webp'

// Import sticker
import stickerBlack from '../assets/sticker-black.png'

export function Contacto() {

	return (
		<div className="page-container">
			{/* Hero Section with Background Image */}
			<section className="hero-section-contacto">
				<div className="hero-background-overlay" />
				<OptimizedImage
					className="hero-background-image-contacto"
					webpSrc={picture12WebP}
					alt="BOOZY - Contacto Background"
					loading="eager"
				/>

				<div className="hero-content-contacto">
					<h1 className="hero-text-contacto">
						Hay productos que se consumen.
					</h1>
					<p className="hero-text-contacto-italic">
						Y hay otros que te hacen sentir algo.
					</p>

					{/* Email Display */}
					<div className="email-display-contacto">
						<span className="email-label">Email:</span>
						<a href="mailto:gerencia.quieroboozy.com" className="email-link-hero">
							gerencia.quieroboozy.com
						</a>
					</div>
				</div>

				{/* Sticker decorativo */}
				<div style={{ position: 'absolute', top: '30%', right: '8%', zIndex: 5 }}>
					<DraggableSticker
						src={stickerBlack}
						alt="BOOZY Sticker Negro"
						initialX={-400}
						initialY={220}
						initialRotation={-25}
						size={140}
						zIndex={5}
					/>
				</div>
			</section>
		</div>
	)
}
