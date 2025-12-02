import { Link } from 'react-router-dom';
import { HamburgerMenu } from './HamburgerMenu';

export function Header() {
	return (
		<>
			<div className='topbar'>
				<div className='container'>
					<div className='bar'>
						<div className="header-left">
							<HamburgerMenu />
						</div>
						<Link
							to="/"
							aria-current="page"
							className="boozy w-inline-block w--current"
							aria-label="BOOZY - El blend más sexy"
						>
						</Link>
						<div className="header-right"></div>
					</div>
				</div>
			</div>
		</>
	)
}
