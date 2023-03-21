import Dash_Header from "../../components/Dash_Header"
import Dash_HeaderSecondary from "../../components/Dash_HeaderSecondary"

import Dash_Footer from "../../components/Dash_Footer"
import Dash_Card from "../../components/Dash_Card"
import Dash_Slide from "../../components/Dash_Slide"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { AcessosCardType } from "../../assets/types/type"

export default function Dashboard() {
    const [cookies, setCookies] = useCookies(['user'])
    const [acessos, setAcessos] = useState([] as AcessosCardType[])

    useEffect(()=>{
        if(!cookies.user){
            (async()=>{
                try {
                    let res = await api.get('/user/me')
                    setCookies('user', res.data)
                } catch (error) {
                    
                }
            })()
        }
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
			<div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Dash_Header />  
                <Dash_HeaderSecondary />
            </div>

            <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                <div className="app-container container-xxl d-flex flex-row flex-column-fluid">
                    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">

                        <div className="d-flex flex-column flex-column-fluid">
                            <div id="kt_app_content" className="app-content flex-column-fluid separaMoldeCards">

                                <div className="row g-5 g-xxl-10">
                                    <div className="col-xxl-6 mb-xxl-10">
                                        <div className="card card-reset mb-5 mb-xl-10">
                                            <div className="card-body p-0">
                                                <div className="row g-5 g-lg-9">

                                                    {/* CARD */}
                                                    {acessos.map((i:AcessosCardType, k:number)=>{

                                                        return <Dash_Card item={i} k={k} />
                                                    })}

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* SLIDE */}
                                    <div className="col-xxl-6 mb-5 mb-xl-10">
                                        <Dash_Slide />
                                    </div>
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