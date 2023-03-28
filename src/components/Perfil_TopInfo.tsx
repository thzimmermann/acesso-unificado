import { useCookies } from "react-cookie"
import FixName from "../helpers/FixName"
import Banner from "../assets/images/bk_minha_conta.jpg"
import { EditTextarea } from "react-edit-text"
import { useState } from "react"
import api from "../services/api"
import validateRequest from "../helpers/validateRequest"
import { toast } from "react-toastify"

export const Perfil_TopInfo = ({dep}:any) => {
    const [cookies, setCookies] = useCookies(['user', 'image'])
    const [showImage, setShowImage] = useState<boolean>(cookies.user.ocultar_foto === "S"?false:true)
    const [edit, setEdit] = useState<boolean>(false)
    const [text, setText] = useState<string>('')


    const handleHideImage = async () => {
        setShowImage(!showImage)
        setCookies('image', !showImage)
        try {
            await api.post('/user/updateBio', {
                ocultar_foto:showImage?'S':'N'
            })
        } catch (error) {
            
        }
    }
    
    const handleChangeTextarea = async () => {
        setEdit(false)
        if(text.length <= 300){
            try {
                await api.post('/user/updateBio', {
                    bio:text
                })
            } catch (error) {
                validateRequest(error)
            }
        } else {
            toast.warning('Sua bio deve conter no máximo 300 caractéres.', {autoClose:2000})
            setText('')
        }
        
    }
    
    return (
        <div className="card card-flush mb-9 shadow-sm" id="kt_user_profile_panel">
            <div className="card-header rounded-top bgi-size-cover h-200px" style={{backgroundPosition: '100% 50%', backgroundImage:`url(${Banner})`}}>
            </div>
            <div className="card-body mt-n19">
                <div className="m-0">

                    <div className="d-flex align-items-end pb-4 mt-n19 avatarPerfil">
                        <div className="boxer position-relative mt-n3">
                            <span className="inicialNome fs-md-5x">{cookies.user.nome.charAt(0)}</span>
                            {showImage &&
                                <img src={cookies.user.avatar} alt="image" className="border border-white border-4"/>
                            }
                        </div>
                        <span className="ocultar">
                            {cookies.user.avatar != '' &&
                                <button onClick={handleHideImage} title="Ocultar foto" className={`btn btn-outline btn-outline-dashed ${showImage?' btn-outline-danger btn-active-light-danger': 'btn-active-light-success btn-outline-success '}  btn-active-light-danger fs-8 py-1 px-2 ms-3`}>{showImage ? 'Ocultar':'Mostrar'}</button>
                            }
                        </span>
                    </div>

                    <div className="d-flex flex-stack flex-wrap align-items-start">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center mb-2">
                                <div className="text-gray-800 fs-2 fw-bolder me-1">{FixName(cookies.user.nome)}</div> 
                            </div>
                            <span className="fw-bold text-gray-600 fs-6 w-500px h-100">
                                {/* Equipe TI SATC */}
                                <EditTextarea
                                    placeholder="Clique aqui para escrever sua bio"
                                    rows={3}
                                    className="mb-2 h-100"
                                    inputClassName="w-100 h-100px"
                                    onChange={v=>setText(v.target.value)}
                                    value={text}
                                    onBlur={handleChangeTextarea}
                                    onEditMode={()=>setEdit(true)}
                                />
                                {edit &&
                                    <div className="w-100 text-end">
                                        {text.length}/300
                                    </div>
                                }
                            </span>
                            <div className="d-flex align-items-center flex-wrap fw-semibold fs-7 pe-2">
                                <a href={`mailto:${cookies.user.email}`} className="d-flex align-items-center text-primary text-hover-primary">
                                    {cookies.user.email}
                                </a>
                            </div>
                        </div>
                        {dep > 0 &&
                            <div className="d-flex flex-column">
                                <div className="text-gray-800 fs-5 fw-bolder me-1">Total de dependentes: {dep}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}