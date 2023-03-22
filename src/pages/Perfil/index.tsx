import Dash_Header from "../../components/Header"
import Dash_HeaderSecondary from "../../components/HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import Dash_Card from "../../components/Dash_Card"
import Dash_Slide from "../../components/Dash_Slide"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AcessosCardType } from "../../assets/types/type"
import { Perfil_TopInfo } from "../../components/Perfil_TopInfo"
import { Perfil_InfoForm } from "../../components/Perfil_InfoForm"
import { Link } from "react-router-dom"
import { Perfil_PasswordForm } from "../../components/Perfil_PasswordForm"

export default function Perfil() {
    const [cookies, setCookies] = useCookies(['user'])
    const [acessos, setAcessos] = useState([] as AcessosCardType[])

    useEffect(()=>{
        // GET USUARIO LOGADO
        if(!cookies.user){
            (async()=>{
                try {
                    let res = await api.get('/user/me')
                    setCookies('user', res.data, {path:'/'})
                } catch (error) {
                    
                }
            })()
        }
        
        // GET CARDS
        (async()=>{
            try {
                let res = await api.get('/user/acessos')
                setAcessos(res.data)
            } catch (error) {
                
            }
        })()
    },[])

    return cookies.user && (
        <div className="d-flex flex-column flex-root app-root h-100" id="kt_app_root" >

            {/* HEADER */}
			<div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <div id="kt_app_header" className="app-header">
                    <Dash_Header />  
                    <Dash_HeaderSecondary />
                </div>
            {/*</div>*/}

                {/* BODY */}
                <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
                        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">

                            <div className="d-flex flex-column flex-column-fluid">          
                                <div id="kt_app_toolbar" className="app-toolbar  py-3 py-lg-6 ">
                                    <div className="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10" id="kt_toolbar">
                                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3 ">
                                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Minha conta</h1>
                                        </div>
                                        <div className="d-flex align-items-center pt-4 pb-7 pt-lg-1 pb-lg-2">
                                            <div>
                                                <Link to='/painel' className="btn btn-sm btn-light" id="kt_drawer_chat_toggle">Voltar</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="kt_app_content" className="app-content flex-column-fluid ">
                                    {/* INFORMACOES DO USUARIO COM BANNER */}
                                    <Perfil_TopInfo />

                                    {/* FORM DO USUARIO */}
                                    <Perfil_InfoForm />

                                    {/* FORM DA SENHA */}
                                    <Perfil_PasswordForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dash_Footer />
		</div>
    )
}