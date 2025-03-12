import { Field } from "formik"
import { useState } from "react"
import { ChangePasswordType } from "../../assets/types/type"

export default function ChangePassword({tabIndex, name, errors, touched, placeholder}:ChangePasswordType) {
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password')
    const [capsLockOn, setCapsLockOn] = useState(false);

    const handleChangePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setCapsLockOn(event.getModifierState("CapsLock"));
    };

    return (
        <>
            <Field type={passwordType} placeholder={placeholder} name={name} autoComplete='off'
            className={`form-control form-control-lg bg-transparent ${errors && touched && 'is-invalid'}`}
            onKeyUp={handleKeyUp}/>
            <button onClick={handleChangePasswordVisibility} tabIndex={-1} type='button' className={`password-control ${passwordType === 'text' && 'view'}`}></button>

            {capsLockOn && (
                <div className="text-warning mt-1">
                    ⚠ Caps Lock está ativado!
                </div>
            )}
        </>
    )
}