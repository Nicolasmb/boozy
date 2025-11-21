import { useDraggable } from '../hooks/useDraggable'

/**
 * Props para el componente DraggableSticker
 */
interface DraggableStickerProps {
	/** URL de la imagen del sticker */
	src: string
	/** Texto alternativo para accesibilidad */
	alt?: string
	/** Posición inicial en X (en píxeles) */
	initialX?: number
	/** Posición inicial en Y (en píxeles) */
	initialY?: number
	/** Rotación inicial en grados */
	initialRotation?: number
	/** Tamaño del sticker (ancho y alto) en píxeles */
	size?: number
	/** Índice z para controlar qué sticker está encima */
	zIndex?: number
}

/**
 * Componente de sticker arrastrable y rotable tipo DrawIO
 *
 * Este componente crea un sticker que puede ser:
 * - Arrastrado libremente con el mouse
 * - Rotado usando el handle superior cuando está seleccionado
 * - Muestra un bounding box con puntos de control al seleccionarlo
 *
 * @example
 * ```tsx
 * <DraggableSticker
 *   src="/sticker.png"
 *   alt="Sticker de BOOZY"
 *   initialX={100}
 *   initialY={200}
 *   initialRotation={0}
 *   size={120}
 * />
 * ```
 */
export function DraggableSticker({
	src,
	alt = 'Sticker',
	initialX = 0,
	initialY = 0,
	initialRotation = 0,
	size = 100,
	zIndex = 10
}: DraggableStickerProps) {
	// Usa el hook personalizado para manejar arrastre y rotación
	const {
		position,
		rotation,
		isDragging,
		isRotating,
		isHovered,
		handleMouseDown,
		handleRotateStart,
		handleMouseEnter,
		handleMouseLeave
	} = useDraggable(initialX, initialY, initialRotation)

	return (
		<div
			className="sticker-wrapper"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				// Posicionamiento absoluto para poder moverlo libremente
				position: 'absolute',
				left: `${position.x}px`,
				top: `${position.y}px`,

				// Tamaño del sticker
				width: `${size}px`,
				height: `${size}px`,

				// Z-index: sube al frente cuando se arrastra o rota
				zIndex: isDragging || isRotating ? 9999 : zIndex,

				// Evita que el texto/imagen sea seleccionable
				userSelect: 'none',
				WebkitUserSelect: 'none'
			}}
		>
			{/* Contenedor del sticker con rotación */}
			<div
				className="sticker"
				onMouseDown={handleMouseDown}
				style={{
					width: '100%',
					height: '100%',

					// Aplica la rotación
					transform: `rotate(${rotation}deg)`,

					// Cursor: mano cerrada cuando arrastra, mano abierta cuando no
					cursor: isDragging ? 'grabbing' : 'grab',

					// Transición suave cuando no está arrastrando ni rotando
					transition: isDragging || isRotating ? 'none' : 'transform 0.2s ease',

					// Para mejor rendimiento en animaciones
					willChange: isDragging || isRotating ? 'transform' : 'auto'
				}}
			>
				{/* Brillos plateados - rotan junto con el sticker */}
				<span className="sparkle sparkle-1" style={{ top: '25%', left: '20%' }} />
				<span className="sparkle sparkle-2" style={{ top: '70%', left: '75%' }} />
				<span className="sparkle sparkle-3" style={{ top: '45%', left: '50%' }} />
				<span className="sparkle sparkle-4" style={{ top: '15%', left: '65%' }} />
				<span className="sparkle sparkle-5" style={{ top: '80%', left: '30%' }} />
				<span className="sparkle sparkle-6" style={{ top: '50%', left: '85%' }} />

				{/* Handle de rotación - rota junto con el sticker */}
				{(isHovered || isDragging || isRotating) && (
					<div
						className="rotation-handle"
						onMouseDown={handleRotateStart}
						title="Arrastrar para rotar"
					>
						↻
					</div>
				)}

				<img
					src={src}
					alt={alt}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'contain',
						pointerEvents: 'none', // Evita que la imagen interfiera con el arrastre
						userSelect: 'none'
					}}
					draggable={false} // Desactiva el arrastre nativo de HTML
				/>
			</div>
		</div>
	)
}
