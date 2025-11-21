interface OptimizedImageProps {
	src?: string
	webpSrc: string
	alt: string
	className?: string
	width?: string | number
	loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
	src,
	webpSrc,
	alt,
	className,
	width,
	loading = 'lazy'
}: OptimizedImageProps) {
	return (
		<picture>
			<source srcSet={webpSrc} type="image/webp" />
			<img
				src={src || webpSrc}
				alt={alt}
				className={className}
				width={width}
				loading={loading}
			/>
		</picture>
	)
}
