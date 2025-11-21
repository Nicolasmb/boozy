import { Link } from 'react-router-dom';

export function Header() {
	return (
		<>
			<div className='topbar'>
				<div className='container'>
					<div className='bar'>
						<Link
							to="/"
							aria-current="page"
							className="boozy w-inline-block w--current"
							aria-label="BOOZY - El blend más sexy"
						>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
