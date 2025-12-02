import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Posición en coordenadas x, y
 */
interface Position {
	x: number
	y: number
}

/**
 * Valores retornados por el hook useDraggable
 */
interface UseDraggableReturn {
	/** Posición actual del elemento */
	position: Position
	/** Rotación actual en grados */
	rotation: number
	/** Indica si el elemento está siendo arrastrado */
	isDragging: boolean
	/** Indica si el elemento está siendo rotado */
	isRotating: boolean
	/** Indica si el mouse está sobre el elemento (hover) */
	isHovered: boolean
	/** Función para iniciar el arrastre (llamar en onMouseDown) */
	handleMouseDown: (e: React.MouseEvent) => void
	/** Función para iniciar el arrastre táctil (llamar en onTouchStart) */
	handleTouchStart: (e: React.TouchEvent) => void
	/** Función para iniciar la rotación (llamar en onMouseDown del handle) */
	handleRotateStart: (e: React.MouseEvent) => void
	/** Función para iniciar la rotación táctil (llamar en onTouchStart del handle) */
	handleRotateTouchStart: (e: React.TouchEvent) => void
	/** Función para cuando el mouse entra (onMouseEnter) */
	handleMouseEnter: () => void
	/** Función para cuando el mouse sale (onMouseLeave) */
	handleMouseLeave: () => void
	/** Función para resetear la posición a la inicial */
	resetPosition: () => void
}

/**
 * Hook personalizado para hacer elementos arrastrables y rotables con el mouse
 * Soporta arrastre, rotación y selección con controles visuales tipo DrawIO
 *
 * @param initialX - Posición inicial en el eje X (por defecto 0)
 * @param initialY - Posición inicial en el eje Y (por defecto 0)
 * @param initialRotation - Rotación inicial en grados (por defecto 0)
 *
 * @returns Objeto con la posición, rotación, estados y funciones de control
 *
 * @example
 * ```tsx
 * const { position, rotation, isDragging, handleMouseDown, handleRotateStart } = useDraggable(100, 200, 0)
 *
 * return (
 *   <div
 *     onMouseDown={handleMouseDown}
 *     style={{
 *       position: 'absolute',
 *       left: position.x,
 *       top: position.y,
 *       transform: `rotate(${rotation}deg)`,
 *       cursor: isDragging ? 'grabbing' : 'grab'
 *     }}
 *   >
 *     Arrastrame y rotame!
 *   </div>
 * )
 * ```
 */
export function useDraggable(
	initialX: number = 0,
	initialY: number = 0,
	initialRotation: number = 0
): UseDraggableReturn {
	// Estado: posición actual del elemento
	const [position, setPosition] = useState<Position>({ x: initialX, y: initialY })

	// Estado: rotación actual en grados
	const [rotation, setRotation] = useState(initialRotation)

	// Estado: si el elemento está siendo arrastrado
	const [isDragging, setIsDragging] = useState(false)

	// Estado: si el elemento está siendo rotado
	const [isRotating, setIsRotating] = useState(false)

	// Estado: si el mouse está sobre el elemento (hover)
	const [isHovered, setIsHovered] = useState(false)

	// Ref: posición del mouse cuando se inició el arrastre
	const dragStartPos = useRef<Position>({ x: 0, y: 0 })

	// Ref: posición del elemento cuando se inició el arrastre
	const elementStartPos = useRef<Position>({ x: initialX, y: initialY })

	// Ref: centro del elemento (para calcular el ángulo de rotación)
	const centerPos = useRef<Position>({ x: 0, y: 0 })

	// Ref: rotación del elemento cuando se empieza a rotar
	const rotationStart = useRef(initialRotation)

	// Ref: ángulo inicial del mouse cuando se empieza a rotar
	const initialMouseAngle = useRef(0)

	/**
	 * Calcula el ángulo entre dos puntos en grados
	 * Se usa para calcular la rotación basada en la posición del mouse
	 */
	const calculateAngle = (centerX: number, centerY: number, pointX: number, pointY: number): number => {
		const radians = Math.atan2(pointY - centerY, pointX - centerX)
		const degrees = radians * (180 / Math.PI)
		return degrees
	}

	/**
	 * Maneja el movimiento del mouse mientras se arrastra o rota
	 */
	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (isDragging) {
			// MODO ARRASTRE: Calcula cuánto se movió el mouse desde que empezó el arrastre
			const deltaX = e.clientX - dragStartPos.current.x
			const deltaY = e.clientY - dragStartPos.current.y

			// Actualiza la posición del elemento sumando el delta a la posición inicial
			setPosition({
				x: elementStartPos.current.x + deltaX,
				y: elementStartPos.current.y + deltaY
			})
		} else if (isRotating) {
			// MODO ROTACIÓN: Calcula el ángulo actual del mouse respecto al centro
			const currentAngle = calculateAngle(
				centerPos.current.x,
				centerPos.current.y,
				e.clientX,
				e.clientY
			)

			// Calcula cuánto se movió el mouse desde que empezó la rotación
			const angleDelta = currentAngle - initialMouseAngle.current

			// Aplica el delta a la rotación inicial
			setRotation(rotationStart.current + angleDelta)
		}
	}, [isDragging, isRotating])

	/**
	 * Maneja el movimiento táctil mientras se arrastra o rota
	 */
	const handleTouchMove = useCallback((e: TouchEvent) => {
		if (isDragging) {
			const touch = e.touches[0]
			const deltaX = touch.clientX - dragStartPos.current.x
			const deltaY = touch.clientY - dragStartPos.current.y

			setPosition({
				x: elementStartPos.current.x + deltaX,
				y: elementStartPos.current.y + deltaY
			})
		} else if (isRotating) {
			const touch = e.touches[0]
			const currentAngle = calculateAngle(
				centerPos.current.x,
				centerPos.current.y,
				touch.clientX,
				touch.clientY
			)

			const angleDelta = currentAngle - initialMouseAngle.current
			setRotation(rotationStart.current + angleDelta)
		}
	}, [isDragging, isRotating])

	/**
	 * Maneja cuando se suelta el botón del mouse
	 * Finaliza el arrastre o la rotación
	 */
	const handleMouseUp = useCallback(() => {
		setIsDragging(false)
		setIsRotating(false)
	}, [])

	/**
	 * Maneja cuando se presiona el botón del mouse sobre el elemento
	 * Inicia el arrastre y guarda las posiciones iniciales
	 */
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		e.preventDefault() // Previene el comportamiento por defecto (selección de texto, etc)
		e.stopPropagation() // Evita que el evento se propague

		setIsDragging(true)

		// Guarda la posición actual del mouse
		dragStartPos.current = { x: e.clientX, y: e.clientY }

		// Guarda la posición actual del elemento
		elementStartPos.current = position
	}, [position])

	/**
	 * Maneja cuando se inicia un toque sobre el elemento
	 * Inicia el arrastre para dispositivos táctiles
	 */
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		e.stopPropagation()

		setIsDragging(true)
		setIsHovered(true)

		const touch = e.touches[0]
		dragStartPos.current = { x: touch.clientX, y: touch.clientY }
		elementStartPos.current = position
	}, [position])

	/**
	 * Maneja cuando se presiona el botón del mouse sobre el handle de rotación
	 * Inicia la rotación y calcula el centro del elemento
	 */
	const handleRotateStart = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation() // Importante: evita que se active el arrastre

		setIsRotating(true)

		// Calcula el centro del elemento en coordenadas de pantalla
		const target = e.currentTarget.parentElement
		if (target) {
			const rect = target.getBoundingClientRect()
			centerPos.current = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			}
		}

		// Guarda la rotación actual del elemento
		rotationStart.current = rotation

		// Guarda el ángulo inicial del mouse respecto al centro
		initialMouseAngle.current = calculateAngle(
			centerPos.current.x,
			centerPos.current.y,
			e.clientX,
			e.clientY
		)
	}, [rotation])

	/**
	 * Maneja cuando se inicia un toque sobre el handle de rotación
	 * Inicia la rotación para dispositivos táctiles
	 */
	const handleRotateTouchStart = useCallback((e: React.TouchEvent) => {
		e.stopPropagation()

		setIsRotating(true)
		setIsHovered(true)

		const target = e.currentTarget.parentElement
		if (target) {
			const rect = target.getBoundingClientRect()
			centerPos.current = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			}
		}

		rotationStart.current = rotation

		const touch = e.touches[0]
		initialMouseAngle.current = calculateAngle(
			centerPos.current.x,
			centerPos.current.y,
			touch.clientX,
			touch.clientY
		)
	}, [rotation])

	/**
	 * Effect: Añade y remueve listeners cuando se está arrastrando o rotando
	 * Esto permite detectar el movimiento y soltar el mouse en toda la ventana
	 */
	useEffect(() => {
		if (isDragging || isRotating) {
			// Añade listeners globales para detectar movimiento y soltar en cualquier parte
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
			document.addEventListener('touchmove', handleTouchMove)
			document.addEventListener('touchend', handleMouseUp)

			// Cleanup: remueve los listeners cuando ya no se necesitan
			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
				document.removeEventListener('touchmove', handleTouchMove)
				document.removeEventListener('touchend', handleMouseUp)
			}
		}
	}, [isDragging, isRotating, handleMouseMove, handleMouseUp, handleTouchMove])

	/**
	 * Maneja cuando el mouse entra al área del sticker
	 */
	const handleMouseEnter = useCallback(() => {
		setIsHovered(true)
	}, [])

	/**
	 * Maneja cuando el mouse sale del área del sticker
	 * Mantiene el hover si se está arrastrando o rotando
	 */
	const handleMouseLeave = useCallback(() => {
		// No oculta los controles si está arrastrando o rotando
		if (!isDragging && !isRotating) {
			setIsHovered(false)
		}
	}, [isDragging, isRotating])

	/**
	 * Effect: Oculta los controles cuando termina de arrastrar/rotar
	 */
	useEffect(() => {
		if (!isDragging && !isRotating) {
			// Pequeño delay para verificar si el mouse sigue sobre el elemento
			const timer = setTimeout(() => {
				// Solo oculta si realmente el mouse no está sobre el elemento
				// Este check se hará automáticamente con handleMouseLeave
			}, 100)
			return () => clearTimeout(timer)
		}
	}, [isDragging, isRotating])

	/**
	 * Resetea el elemento a su posición y rotación inicial
	 */
	const resetPosition = useCallback(() => {
		setPosition({ x: initialX, y: initialY })
		setRotation(initialRotation)
	}, [initialX, initialY, initialRotation])

	return {
		position,
		rotation,
		isDragging,
		isRotating,
		isHovered,
		handleMouseDown,
		handleTouchStart,
		handleRotateStart,
		handleRotateTouchStart,
		handleMouseEnter,
		handleMouseLeave,
		resetPosition
	}
}
