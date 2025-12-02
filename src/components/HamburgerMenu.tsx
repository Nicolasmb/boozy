import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export function HamburgerMenu() {
	const location = useLocation();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string>('home');
	const menuRef = useRef<HTMLDivElement>(null);
	const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	// Body scroll lock
	useEffect(() => {
		if (isOpen) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
			document.body.style.overflow = 'hidden';
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			document.body.style.overflow = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}

		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	// ESC key handler
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				closeMenu();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [isOpen]);

	// Auto-close on route change
	useEffect(() => {
		closeMenu();
	}, [location.pathname]);

	// Focus management and trap
	useEffect(() => {
		if (!isOpen) return;

		const menuElement = menuRef.current;
		if (!menuElement) return;

		const focusableElements = menuElement.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

		firstElement?.focus();

		const handleTab = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement?.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement?.focus();
			}
		};

		document.addEventListener('keydown', handleTab);
		return () => document.removeEventListener('keydown', handleTab);
	}, [isOpen]);

	// Active section detection
	useEffect(() => {
		const isHome = location.pathname === '/' || location.pathname === '/boozy' || location.pathname === '/boozy/';

		if (!isHome) {
			setActiveSection('');
			return;
		}

		const isMobile = window.innerWidth <= 768;

		if (isMobile) {
			// Mobile: Vertical scroll detection with IntersectionObserver
			const sections = ['home', 'blend', 'fusion', 'divertido', 'es-ahora'];
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
							setActiveSection(entry.target.id);
						}
					});
				},
				{
					threshold: [0.5],
					rootMargin: '-20% 0px -20% 0px'
				}
			);

			sections.forEach((sectionId) => {
				const element = document.getElementById(sectionId);
				if (element) observer.observe(element);
			});

			return () => observer.disconnect();
		} else {
			// Desktop: Horizontal scroll detection (copied from Footer.tsx)
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
		}
	}, [location.pathname]);

	const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
		e.preventDefault();
		closeMenu();

		// Si estamos en la home, hacer scroll a la sección
		if (location.pathname === '/' || location.pathname === '/boozy' || location.pathname === '/boozy/') {
			const element = document.getElementById(sectionId);
			if (element) {
				const isMobile = window.innerWidth <= 768;

				if (isMobile) {
					// Mobile: Vertical scroll
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
						inline: 'nearest'
					});
				} else {
					// Desktop: Horizontal scroll animation (copied from Footer.tsx)
					const pageContainer = document.querySelector('.page-container') as HTMLElement;
					if (pageContainer) {
						const targetLeft = element.offsetLeft - 100;
						const startLeft = pageContainer.scrollLeft;
						const distance = targetLeft - startLeft;
						const duration = 800;
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
			}
		} else {
			// Si no estamos en home, navegar primero y luego hacer scroll
			navigate('/', { state: { scrollTo: sectionId } });
		}
	};

	const isHome = location.pathname === '/' || location.pathname === '/boozy' || location.pathname === '/boozy/';
	const isActive = (path: string) => location.pathname === path;
	const isSectionActive = (sectionId: string) => isHome && activeSection === sectionId;

	return (
		<>
			{/* Hamburger Button */}
			<button
				ref={hamburgerButtonRef}
				className="hamburger-button"
				onClick={toggleMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={isOpen}
			>
				<div className="hamburger-icon">
					<span className="hamburger-line"></span>
					<span className="hamburger-line"></span>
					<span className="hamburger-line"></span>
				</div>
			</button>

			{/* Fullscreen Overlay */}
			{isOpen && (
				<div className="mobile-nav-overlay" role="dialog" aria-modal="true">
					<div
						className="mobile-nav-backdrop"
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								closeMenu();
							}
						}}
					/>
					<nav className="mobile-nav-content" ref={menuRef}>
						<button className="mobile-nav-close" onClick={closeMenu} aria-label="Close menu">
							✕
						</button>
						<div className="mobile-nav-links">
							<a
								href="#home"
								className={isSectionActive('home') ? 'active' : ''}
								onClick={(e) => handleSectionClick(e, 'home')}
							>
								BOOZY
							</a>
							<a
								href="#blend"
								className={isSectionActive('blend') ? 'active' : ''}
								onClick={(e) => handleSectionClick(e, 'blend')}
							>
								EL BLEND MÁS SEXY
							</a>
							<Link to='/sos-sexy' className={isActive('/sos-sexy') ? 'active' : ''} onClick={closeMenu}>
								¿SOS SEXY?
							</Link>
							<Link to='/presentacion' className={isActive('/presentacion') ? 'active' : ''} onClick={closeMenu}>
								PRESENTACIÓN
							</Link>
							<a
								href="#fusion"
								className={isSectionActive('fusion') ? 'active' : ''}
								onClick={(e) => handleSectionClick(e, 'fusion')}
							>
								FUSIÓN
							</a>
							<a
								href="#divertido"
								className={isSectionActive('divertido') ? 'active' : ''}
								onClick={(e) => handleSectionClick(e, 'divertido')}
							>
								DIVERTIDO
							</a>
							<Link to='/se-parte' className={isActive('/se-parte') ? 'active' : ''} onClick={closeMenu}>
								SÉ PARTE
							</Link>
							<Link to='/preguntas' className={isActive('/preguntas') ? 'active' : ''} onClick={closeMenu}>
								PREGUNTAS
							</Link>
							<a
								href="#es-ahora"
								className={isSectionActive('es-ahora') ? 'active' : ''}
								onClick={(e) => handleSectionClick(e, 'es-ahora')}
							>
								ES AHORA
							</a>
							<Link to='/contacto' className={isActive('/contacto') ? 'active' : ''} onClick={closeMenu}>
								CONTACTO
							</Link>
						</div>
					</nav>
				</div>
			)}
		</>
	);
}
