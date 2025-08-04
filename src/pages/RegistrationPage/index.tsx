import { useNavigate, type NavigateFunction } from "react-router-dom";
import { type ReactElement, useState } from "react";
import { paths } from "@router/routes";
import "./style.css";

const handleSubmit = (nickName: string, navigate: NavigateFunction) => {
    if (nickName.trim()) {
        localStorage.setItem("nickName", nickName);
        navigate(paths.HOME.path); 
    }
};

const RegistrationPage = (): ReactElement => {
    const [nickName, setNickName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="registration-page">
            <header className="reg-header">
                <h1 className="reg-title title-text">Регистрация</h1>
            </header>
            <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Введите ваш nickName"
                className="input-field secondary-text"
            />
            <button onClick={() => handleSubmit(nickName, navigate)} className="submit-button">
                Зарегистрироваться
            </button>
        </div>
    );
};

export default RegistrationPage;