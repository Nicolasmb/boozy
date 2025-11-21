import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import images

import stickerRed from '../assets/sticker-red.png'

// Import WebP versions
import picture2WebP from '../assets/picture-2.webp'

export function SosSexy() {
	return (
		<div className='sos-sexy-page'>
			<div className='sos-sexy-container'>
				{/* Columna izquierda - Imagen grande */}
				<div className='sos-sexy-images'>
					<div className='sos-sexy-image-item'>
						<OptimizedImage
							
							webpSrc={picture2WebP}
							alt='BOOZY - Cóctel helado premium'
							loading='lazy'
						/>
					</div>
				</div>

				{/* Columna derecha - Contenido de texto */}
				<div className='sos-sexy-content'>
					<div className='sos-sexy-title-container'>
						<h2 className='sos-sexy-main-title'>¿Qué es BOOZY?</h2>
						<DraggableSticker
							src={stickerRed}
							alt='BOOZY Sticker'
							initialX={700}
							initialY={-30}
							initialRotation={-15}
							size={100}
							zIndex={100}
						/>
					</div>

					<div className='sos-sexy-intro'>
						<p>
							BOOZY no es solo un cóctel helado. Es ese instante en el que alguien te pregunta algo inesperado:
						</p>
						<p className='sos-sexy-question'>¿Sos sexy?</p>
					</div>

					<div className='sos-sexy-story'>
						<p>Tu mente se detiene.</p>
						<p>Te sorprende.</p>
						<p>Te pone nervioso.</p>
						<p>Te hace reír un poco, porque no sabés bien qué responder. Una parte de vos quiere decir que sí. Otra duda.</p>
						<p>Hay un leve temblor interno. Un juego entre incomodidad y deseo. Y de pronto, elegís.</p>
						<p>Decidís decir que sí.</p>
					</div>

					<div className='sos-sexy-meaning'>
						<p>
							Ese momento —cuando rompés el patrón, cuando te animás a afirmarte, a salir de lo cómodo y responder con seguridad— eso es BOOZY.
						</p>
						<p>
							BOOZY es para quienes se animan a dar ese paso. Para quienes se permiten jugar, sorprenderse, disfrutar sin tantas vueltas.
						</p>
						<p>
							Es un postre con actitud, un cóctel con personalidad. Una experiencia divertida, diferente, auténtica.
						</p>
						<p>
							BOOZY es el blend más sexy. Porque ser sexy no es una apariencia. Es una decisión. Y vos,
						</p>
						<p className='sos-sexy-final-question'>¿te animás?</p>
					</div>

					<div className='sos-sexy-badge'>
						<span className='badge-trendy'>INNOVADOR & TRENDY</span>
					</div>
				</div>
			</div>
		</div>
	)
}
