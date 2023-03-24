import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy, useEffect } from 'react'
import App from "./App"
import * as Page from "./pages"
import { useCookies } from "react-cookie"
import api from "./services/api"

function AppRoutes() {
	const [cookies, , removeCookie] = useCookies(['login', 'user'])

	if (cookies.login && cookies.login.access_token) {
		api.defaults.headers.common['Authorization'] = `${cookies.login.token_type} ${cookies.login.access_token}`
	}
	useEffect(()=>{
		api.interceptors.response.use(res => res, (err) => {
			console.log(err);
			
			if (err.response.status == 401 && err.response.config.url != '/user/me') {
				removeCookie('login', {
					path: '/'
				})
				removeCookie('user', {
					path: '/'
				})
				window.location.href = '/'
			}
			return Promise.reject(err);
		});
	},[location])

	return (
		<BrowserRouter>
			<Suspense fallback={<div>Carregando...</div>}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="" element={<Page.Login />} />
						<Route path="cadastro" element={<Page.Cadastro />} />
						<Route path="esqueceu-senha" element={<Page.EsqueceuSenha />} />
						<Route path="painel" element={<Page.Dashboard />} />
						<Route path="perfil" element={<Page.Perfil />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default AppRoutes
