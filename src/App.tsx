import './App.css'
import { useEffect, useRef } from 'react'

function App() {
	const desktopRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const desktop = desktopRef.current
		if (!desktop) return

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()
			desktop.scrollLeft += e.deltaY + e.deltaX
		}

		desktop.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			desktop.removeEventListener('wheel', handleWheel)
		}
	}, [])

	return (
		<>
			<div className='desktop' ref={desktopRef}>
				<div className='topbar'>
					<div className='container'>
						<div className='bar'>
							<a href="/" aria-current="page" className="boozy w-inline-block w--current">
							</a>
						</div>
					</div>
				</div>
				<div className='viewport'>
					<div className='main-content'>
						<div className='row'>
							<div className='column'>
								<div className='main-box-1-wrapper'>
									<div className='product-wrapper'>
										<div className="w-dyn-list">
											<div role="list" className="w-dyn-items">
												<div role="listitem" className="w-dyn-item">
													<a href="/product/cheeseburger-trufada" className="link-burger-home w-inline-block">
														<img className="image-2" src="src/assets/home-truffle-tinny.png" width="634" alt=""></img>
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className='row'>
										<div>
											<div className="box-1">
												<a href="/vicio-cities" className="link-block w-inline-block">
													<div className="burger-club-wrapper">
														<div className="div-block-14"></div>
														<div className="text-block">FOR THE HOTTEST PEOPLE</div>
													</div>
													<div className="boozy-link-wrapper">
														<div className="boozy-text-wrapper">
															<div className="boozy-text">
																BOOZY
															</div>
														</div>
													</div>
												</a>
												{/* <div className="arrown-cities"></div>
												<div className="burger-cities"></div>
												<div className="star-3"></div>
												<div className="star-4"></div>
												<div className="fire-1"></div>
												<div className="fire-2"></div>
												<div className="fire-3"></div>
												<div className="fire-4"></div>
												<div className="fire-5"></div>
												<div className="fire-6"></div>
												<div className="fire-7"></div>
												<div className="fire-8"></div>
												<div className="fire-9"></div> */}
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='column'>
											<div className='box-2'></div>
											<div className='row'>
												<div className='box-3'></div>
												<div className='box-4'>
													<div className="sos-sexy-text">
														¿SOS SEXY?
													</div>
												</div>
											</div>
										</div>
										<div className='box-5'>
											<div className='picture-box'>
												<img className='image' src='src/assets/picture-1.jpg' alt=''></img>
											</div>
											<div className='picture-box'>
												<img className='image' src='src/assets/picture-2.jpg' alt=''></img>
											</div>
											<div className='picture-box'>
												<img className='image' src='src/assets/picture-3.jpg' alt=''></img>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='column'>
								<div className='row-alt'>
									<div className='box-6'>
									</div>
									<div className='box-7'>
										<div className='picture-box'>
											<img className='image' src='src/assets/picture-4.jpg' alt=''></img>
										</div>
									</div>
									<div className='box-8'>
										<div className='picture-box'>
											<img className='image' src='src/assets/picture-5.jpg' alt=''></img>
										</div>
									</div>
									<div className='box-9'>
										<div className="preguntas-vertical-text">
											PREGUNTAS
										</div>
									</div>
									<div className='box-11'>
										<div className='picture-box'>
											<img className='image' src='src/assets/picture-6.jpg' alt=''></img>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='box-12'>
										<div className="presentacion-text">
											PRESENTACION
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='box-13'></div>
									<div className='box-14'>
										<div className="te-animas-text">
											TE ANIMAS?
										</div>
										<div className='picture-box'>
											<img className='image' src='src/assets/picture-7.jpg' alt=''></img>
										</div>
									</div>
									<div className='box-16'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-bar'>
					<div className='container'>
						<div className='footer'>
							<div className='footer-left-links'>
								<a href="" draggable="false" role="menuitem">
									<span>BOOZY</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>EL BLEN MAS SEXY</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>¿SOS SEXY?</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>PRESENTACION </span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>FUSION</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>DIVERTIDO</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>SE PARTE </span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>PREGUNTAS</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>ES AHORA</span>
								</a>
								<a href="" draggable="false" role="menuitem">
									<span>CONTACTO</span>
								</a>
							</div>
							<div className='footer-right-links'></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
