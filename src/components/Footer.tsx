import { Link } from 'react-router-dom';

export function Footer() {
	return (
		<div className='bottom-nav'>
			<div className='container'>
				<nav className='nav-menu'>
					<a href='#home' className='nav-link'>BOOZY</a>
					<a href='#blend' className='nav-link'>EL BLEND MÁS SEXY</a>
					<Link to='/sos-sexy' className='nav-link'>¿SOS SEXY?</Link>
					<Link to='/presentacion' className='nav-link'>PRESENTACIÓN</Link>
					<a href='#fusion' className='nav-link'>FUSIÓN</a>
					<a href='#divertido' className='nav-link'>DIVERTIDO</a>
					<Link to='/se-parte' className='nav-link'>SÉ PARTE</Link>
					<Link to='/preguntas' className='nav-link'>PREGUNTAS</Link>
					<a href='#es-ahora' className='nav-link'>ES AHORA</a>
					<Link to='/contacto' className='nav-link'>CONTACTO</Link>
				</nav>
			</div>
		</div>
	)
}
