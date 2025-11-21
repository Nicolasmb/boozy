import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import images

import picture8Webp from '../assets/picture-8.webp'

import picture7Webp from '../assets/picture-7.webp'

// Import sticker
import stickerRed from '../assets/sticker-red.png'

export function Preguntas() {
  return (
    <div className='preguntas-page'>
      <div className='preguntas-container'>
        {/* Header con título y sticker */}
        <div className='preguntas-header'>
          <h1 className='preguntas-title'>Preguntas frecuentes</h1>
          <DraggableSticker
            src={stickerRed}
            alt="Boozy Sticker"
            initialX={950}
            initialY={-5}
            initialRotation={15}
            size={120}
            zIndex={10}
          />
        </div>

        {/* Sección de FAQs */}
        <div className='preguntas-faqs'>
          <div className='faq-item'>
            <p className='faq-question'>¿BOOZY emborracha?</p>
            <p className='faq-answer'>
              Tiene 8% de alcohol, como un cóctel clásico. No vas a olvidar tu nombre, pero sí vas a querer otro.
            </p>
          </div>

          <div className='faq-item'>
            <p className='faq-question'>¿Necesito un bartender?</p>
            <p className='faq-answer'>
              No. BOOZY se saca del freezer y se sirve. Tan simple como irresistible.
            </p>
          </div>

          <div className='faq-item'>
            <p className='faq-question'>¿Es legal venderlo?</p>
            <p className='faq-answer'>
              Sí. Es un cóctel con alcohol, como cualquier bebida que ya ofrezcas. Solo se vende a mayores de 18 años.
            </p>
          </div>

          <div className='faq-item'>
            <p className='faq-question'>¿Se derrite rápido?</p>
            <p className='faq-answer'>
              Como vos cuando lo probas. Pero no, aguanta lo suficiente para disfrutarlo con calma.
            </p>
          </div>

          <div className='faq-item'>
            <p className='faq-question'>¿Es un helado? ¿Es un cóctel?</p>
            <p className='faq-answer'>
              Es BOOZY. No lo encasilles.
            </p>
          </div>

          <div className='faq-item'>
            <p className='faq-question'>¿Puedo venderlo en eventos o fiestas privadas?</p>
            <p className='faq-answer'>
              Sí, ¡y queda espectacular! Lo servís en copas y te asegurás un "wow" en cada mesa.
            </p>
          </div>
        </div>

        {/* Grid de imágenes */}
        <div className='preguntas-images-grid'>
          <OptimizedImage
            
            webpSrc={picture8Webp}
            alt="Boozy producto"
            loading="lazy"
            className='preguntas-image'
          />
          <OptimizedImage
            
            webpSrc={picture7Webp}
            alt="El blend más sexy"
            loading="lazy"
            className='preguntas-image'
          />
        </div>
      </div>
    </div>
  )
}
