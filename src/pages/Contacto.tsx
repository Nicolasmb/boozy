import { useState, type FormEvent } from 'react'
import { OptimizedImage } from '../components/OptimizedImage'
import { DraggableSticker } from '../components/DraggableSticker'

// Import images
import picture9WebP from '../assets/picture-9.webp'

// Import sticker
import stickerRed from '../assets/sticker-red.png'

export function Contacto() {
	const [formData, setFormData] = useState({
		nombre: '',
		email: '',
		telefono: '',
		tipoConsulta: 'consumidor',
		empresa: '',
		mensaje: ''
	})

	const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setFormStatus('sending')

		// TODO: Integrar con backend
		console.log('Form submitted:', formData)

		// Simulación de envío
		setTimeout(() => {
			setFormStatus('success')
			// Reset form después de 3 segundos
			setTimeout(() => {
				setFormStatus('idle')
				setFormData({
					nombre: '',
					email: '',
					telefono: '',
					tipoConsulta: 'consumidor',
					empresa: '',
					mensaje: ''
				})
			}, 3000)
		}, 1500)
	}

	return (
		<div className="page-container">
			{/* Hero Section */}
			<section className="hero-section-simple">
				<div className="hero-content">
					<h1 className="hero-title-simple">HABLEMOS</h1>
					<p className="hero-subtitle-simple">
						Hay productos que se consumen. Y hay otros que te hacen sentir algo.
					</p>
				</div>
				{/* Sticker decorativo */}
				<div style={{ position: 'absolute', top: '50%', right: '10%' }}>
					<DraggableSticker
						src={stickerRed}
						alt="BOOZY Sticker Rojo"
						initialX={0}
						initialY={0}
						initialRotation={-30}
						size={120}
						zIndex={10}
					/>
				</div>
			</section>

			{/* Content Section */}
			<section className="content-section">
				<div className="content-wrapper-contact">
					{/* Two Column Layout */}
					<div className="contact-grid">
						{/* Left Column - Form */}
						<div className="contact-form-column animate-on-scroll">
							<h2 className="section-title-contact">Dejanos tu mensaje</h2>

							{formStatus === 'success' ? (
								<div className="success-message">
									<h3>¡Mensaje enviado con éxito!</h3>
									<p>Te responderemos en menos de 24hs</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="contact-form">
									{/* Nombre */}
									<div className="form-group">
										<label htmlFor="nombre" className="form-label">
											Nombre completo *
										</label>
										<input
											type="text"
											id="nombre"
											name="nombre"
											value={formData.nombre}
											onChange={handleChange}
											required
											className="form-input"
											placeholder="Tu nombre"
										/>
									</div>

									{/* Email */}
									<div className="form-group">
										<label htmlFor="email" className="form-label">
											Email *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											className="form-input"
											placeholder="tu@email.com"
										/>
									</div>

									{/* Teléfono */}
									<div className="form-group">
										<label htmlFor="telefono" className="form-label">
											Teléfono
										</label>
										<input
											type="tel"
											id="telefono"
											name="telefono"
											value={formData.telefono}
											onChange={handleChange}
											className="form-input"
											placeholder="+54 11 1234 5678"
										/>
									</div>

									{/* Tipo de Consulta */}
									<div className="form-group">
										<label htmlFor="tipoConsulta" className="form-label">
											Tipo de consulta *
										</label>
										<select
											id="tipoConsulta"
											name="tipoConsulta"
											value={formData.tipoConsulta}
											onChange={handleChange}
											required
											className="form-select"
										>
											<option value="consumidor">Consumidor Final</option>
											<option value="distribuidor">Quiero Distribuir</option>
											<option value="evento">Evento Especial</option>
											<option value="otro">Otra Consulta</option>
										</select>
									</div>

									{/* Empresa - Condicional */}
									{(formData.tipoConsulta === 'distribuidor' || formData.tipoConsulta === 'evento') && (
										<div className="form-group">
											<label htmlFor="empresa" className="form-label">
												Empresa / Local
											</label>
											<input
												type="text"
												id="empresa"
												name="empresa"
												value={formData.empresa}
												onChange={handleChange}
												className="form-input"
												placeholder="Nombre de tu empresa o local"
											/>
										</div>
									)}

									{/* Mensaje */}
									<div className="form-group">
										<label htmlFor="mensaje" className="form-label">
											Mensaje *
										</label>
										<textarea
											id="mensaje"
											name="mensaje"
											value={formData.mensaje}
											onChange={handleChange}
											required
											className="form-textarea"
											placeholder="Contanos qué necesitás..."
											rows={5}
										/>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										className="btn-submit"
										disabled={formStatus === 'sending'}
									>
										{formStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
									</button>
								</form>
							)}
						</div>

						{/* Right Column - Info & Image */}
						<div className="contact-info-column">
							{/* Contact Info */}
							<div className="contact-info animate-on-scroll delay-200">
								<h3 className="info-title">Información de contacto</h3>
								<div className="info-item">
									<span className="info-icon">📧</span>
									<div>
										<p className="info-label">Email</p>
										<a href="mailto:gerencia@quieroboozy.com" className="info-link">
											gerencia@quieroboozy.com
										</a>
									</div>
								</div>
								<div className="info-item">
									<span className="info-icon">⏱️</span>
									<div>
										<p className="info-label">Tiempo de respuesta</p>
										<p className="info-text">Menos de 24 horas</p>
									</div>
								</div>
							</div>

							{/* Image */}
							<div className="contact-image animate-on-scroll delay-400">
								<OptimizedImage
									className="content-image-contact"
									webpSrc={picture9WebP}
									alt="BOOZY - Contacto"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
