import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import images
import stickerGreen from '../assets/sticker-green.png'

// Import WebP versions
import picture6WebP from '../assets/picture-6.webp'
import picture9WebP from '../assets/picture-9.webp'
import picture11WebP from '../assets/picture-11.webp'

export function Presentacion() {
	return (
		<div className='presentacion-page'>
			<div className='presentacion-container'>
				{/* Header section with title and sticker */}
				<div className='presentacion-header'>
					<div className='presentacion-title-container'>
						<h2 className='presentacion-main-title'>BOOZY</h2>
						<DraggableSticker
							src={stickerGreen}
							alt='BOOZY Sticker'
							initialX={900}
							initialY={0}
							initialRotation={12}
							size={120}
							zIndex={100}
						/>
					</div>
				</div>

				{/* Intro section */}
				<div className='presentacion-intro'>
					<p className='presentacion-tagline'>
						El cóctel helado que despierta tus sentidos.
					</p>
					<p className='presentacion-description'>
						Refrescante, atrevido y con estilo. BOOZY llega en dos sabores irresistibles,
						perfectos para climas cálidos y momentos donde el placer es protagonista.
					</p>
				</div>

				{/* Availability section */}
				<div className='presentacion-availability'>
					<p className='availability-title'>Disponible en:</p>
					<ul className='availability-list'>
						<li>
							<strong>Pote individual de 125cc:</strong> ideal para llevar, disfrutar en casa o como tentación al paso.
						</li>
						<li>
							<strong>Blade de 10 litros:</strong> pensado para bares y eventos que quieren servir sensualidad en copa.
						</li>
					</ul>
				</div>

				{/* Closing statement */}
				<div className='presentacion-closing'>
					<p className='presentacion-emphasis'>
						BOOZY no se vende. Se desea.
					</p>
				</div>

				{/* Three images in a row */}
				<div className='presentacion-images-row'>
					<div className='presentacion-image-item'>
						<OptimizedImage
							webpSrc={picture6WebP}
							alt='BOOZY - Variedad de sabores'
							loading='lazy'
						/>
					</div>
					<div className='presentacion-image-item'>
						<OptimizedImage
							webpSrc={picture9WebP}
							alt='BOOZY - Momento relajante'
							loading='lazy'
						/>
					</div>
					<div className='presentacion-image-item'>
						<OptimizedImage
							webpSrc={picture11WebP}
							alt='BOOZY - Estilo de vida'
							loading='lazy'
						/>
					</div>
				</div>

				{/* Bottom section - Innovation + Flavors in 3 columns */}
				<div className='presentacion-bottom-section'>
					{/* Innovation strategy section */}
					<div className='presentacion-innovation'>
						<p>
							Implementamos una <strong>ESTRATEGIA DE INNOVACIÓN CONTINUA,</strong>{' '}
							<span className='innovation-highlight'>
								desarrollando de manera constante sabores exclusivos.
							</span>
						</p>
						<p>
							Esta dinámica no solo capta el interés sostenido del consumidor,
							sino que también refuerza un <strong>ENFOQUE BOUTIQUE Y PERSONALIZADO.</strong>
						</p>
					</div>

					{/* Flavor cards section */}
					<div className='presentacion-flavors'>
						<div className='flavor-card flavor-lemon'>
							<h3 className='flavor-name'>LEMON PEARS</h3>
							<p className='flavor-ingredients'>LIMA MENTA JENGIBRE + VODKA PEARS</p>
							<p className='flavor-alcohol'>(8% graduación alcohólica)</p>
						</div>

						<div className='flavor-card flavor-red'>
							<h3 className='flavor-name'>RED SUNSET</h3>
							<p className='flavor-ingredients'>FRUTOS ROJOS + VODKA WILD BERRY</p>
							<p className='flavor-alcohol'>(8% graduación alcohólica)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
