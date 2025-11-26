import { DraggableSticker } from '../components/DraggableSticker'

// Import sticker
import stickerBlack from '../assets/sticker-black.png'

// Import video
import tragosVideo from '../assets/tragos-redes-1-optimized.mp4'

export function SeParte() {
	return (
		<div className="page-container se-parte-page">
			{/* Two Column Section */}
			<section className="se-parte-two-column-section">
				{/* Sticker decorativo - outside grid */}
				<div className="se-parte-sticker-container">
					<DraggableSticker
						src={stickerBlack}
						alt="BOOZY Sticker"
						initialX={920}
						initialY={0}
						initialRotation={-15}
						size={120}
						zIndex={10}
					/>
				</div>

				<div className="se-parte-container">
					{/* Left Column - Text Content */}
					<div className="se-parte-left-column">
						<h2 className="se-parte-main-title">¿Querés vender BOOZY?</h2>

						<p className="se-parte-text">
							Súmate como punto de venta y llevá el cóctel más sexy a tu local o evento.
						</p>

						<p className="se-parte-text">
							Te damos freezer, copas, gráfica y todo lo que necesitas para destacarte.
						</p>

						<p className="se-parte-text">
							Contactanos para conocer más detalles.
						</p>

						<div className="se-parte-tagline">
							<p className="tagline-text">DONDE HAY BOOZY, HAY GANAS.</p>
							<div className="tagline-underline"></div>
						</div>
					</div>

					{/* Right Column - Video */}
					<div className="se-parte-right-column">
						<video
							autoPlay
							loop
							muted
							playsInline
							className="se-parte-side-video"
						>
							<source src={tragosVideo} type="video/mp4" />
						</video>
					</div>
				</div>
			</section>
		</div>
	)
}
