import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Footer() {
	const location = useLocation();
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState<string>('home');

	const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
		e.preventDefault();

		// Si estamos en la home, hacer scroll a la sección
		if (location.pathname === '/' || location.pathname === '/boozy' || location.pathname === '/boozy/') {
			const element = document.getElementById(sectionId);
			if (element) {
				const pageContainer = document.querySelector('.page-container') as HTMLElement;
				if (pageContainer) {
					// Scroll horizontal suave animado
					const targetLeft = element.offsetLeft - 100; // offset para mejor visualización
					const startLeft = pageContainer.scrollLeft;
					const distance = targetLeft - startLeft;
					const duration = 800; // Duración en milisegundos
					let startTime: number | null = null;

					function animation(currentTime: number) {
						if (startTime === null) startTime = currentTime;
						const timeElapsed = currentTime - startTime;
						const progress = Math.min(timeElapsed / duration, 1);

						// Easing function (easeInOutCubic)
						const ease = progress < 0.5
							? 4 * progress * progress * progress
							: 1 - Math.pow(-2 * progress + 2, 3) / 2;

						if (pageContainer) {
							pageContainer.scrollLeft = startLeft + distance * ease;
						}

						if (progress < 1) {
							requestAnimationFrame(animation);
						}
					}

					requestAnimationFrame(animation);
				}
			}
		} else {
			// Si no estamos en home, navegar primero y luego hacer scroll
			navigate('/', { state: { scrollTo: sectionId } });
		}
	};

	// Detectar la sección visible en el viewport (solo en home)
	useEffect(() => {
		const isHome = location.pathname === '/' || location.pathname === '/boozy' || location.pathname === '/boozy/';

		if (!isHome) {
			setActiveSection('');
			return;
		}

		const pageContainer = document.querySelector('.page-container');
		if (!pageContainer) return;

		const handleScroll = () => {
			const sections = ['home', 'blend', 'fusion', 'divertido', 'es-ahora'];
			const scrollLeft = pageContainer.scrollLeft;
			const containerWidth = pageContainer.clientWidth;

			// Encontrar qué sección está más centrada en el viewport
			let closestSection = 'home';
			let minDistance = Infinity;

			sections.forEach(sectionId => {
				const element = document.getElementById(sectionId);
				if (element) {
					const elementLeft = element.offsetLeft;
					const elementCenter = elementLeft + (element.offsetWidth / 2);
					const viewportCenter = scrollLeft + (containerWidth / 2);
					const distance = Math.abs(elementCenter - viewportCenter);

					if (distance < minDistance) {
						minDistance = distance;
						closestSection = sectionId;
					}
				}
			});

			setActiveSection(closestSection);
		};

		// Ejecutar inmediatamente
		handleScroll();

		// Escuchar scroll
		pageContainer.addEventListener('scroll', handleScroll);
		return () => pageContainer.removeEventListener('scroll', handleScroll);
	}, [location.pathname]);

	const isHome = location.pathname === '/' || location.pathname === '/boozy' || location.pathname === '/boozy/';
	const isActive = (path: string) => location.pathname === path;
	const isSectionActive = (sectionId: string) => isHome && activeSection === sectionId;

	return (
		<div className='bottom-nav'>
			<div className='container'>
				<nav className='nav-menu'>
					<a
						href='#home'
						className={`nav-link ${isSectionActive('home') ? 'active' : ''}`}
						onClick={(e) => handleSectionClick(e, 'home')}
					>
						BOOZY
					</a>
					<a
						href='#blend'
						className={`nav-link ${isSectionActive('blend') ? 'active' : ''}`}
						onClick={(e) => handleSectionClick(e, 'blend')}
					>
						EL BLEND MÁS SEXY
					</a>
					<Link to='/sos-sexy' className={`nav-link ${isActive('/sos-sexy') ? 'active' : ''}`}>¿SOS SEXY?</Link>
					<Link to='/presentacion' className={`nav-link ${isActive('/presentacion') ? 'active' : ''}`}>PRESENTACIÓN</Link>
					<a
						href='#fusion'
						className={`nav-link ${isSectionActive('fusion') ? 'active' : ''}`}
						onClick={(e) => handleSectionClick(e, 'fusion')}
					>
						FUSIÓN
					</a>
					<a
						href='#divertido'
						className={`nav-link ${isSectionActive('divertido') ? 'active' : ''}`}
						onClick={(e) => handleSectionClick(e, 'divertido')}
					>
						DIVERTIDO
					</a>
					<Link to='/se-parte' className={`nav-link ${isActive('/se-parte') ? 'active' : ''}`}>SÉ PARTE</Link>
					<Link to='/preguntas' className={`nav-link ${isActive('/preguntas') ? 'active' : ''}`}>PREGUNTAS</Link>
					<a
						href='#es-ahora'
						className={`nav-link ${isSectionActive('es-ahora') ? 'active' : ''}`}
						onClick={(e) => handleSectionClick(e, 'es-ahora')}
					>
						ES AHORA
					</a>
					<Link to='/contacto' className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}>CONTACTO</Link>
				</nav>
			</div>
		</div>
	)
}
