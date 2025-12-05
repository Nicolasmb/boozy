import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Home } from './pages/Home.tsx'
import { SosSexy } from './pages/SosSexy.tsx'
import { Presentacion } from './pages/Presentacion.tsx'
import { Preguntas } from './pages/Preguntas.tsx'
import { SeParte } from './pages/SeParte.tsx'
import { Contacto } from './pages/Contacto.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="sos-sexy" element={<SosSexy />} />
					<Route path="presentacion" element={<Presentacion />} />
					<Route path="preguntas" element={<Preguntas />} />
					<Route path="se-parte" element={<SeParte />} />
					<Route path="contacto" element={<Contacto />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
