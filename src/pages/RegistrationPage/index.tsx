import { useNavigate, type NavigateFunction } from "react-router-dom";
import { type ReactElement, useState } from "react";
import { paths } from "@router/routes";
import "./style.css";

const handleSubmit = (nickName: string, navigate: NavigateFunction) => {
    if (!nickName.trim()) return;
    
    localStorage.setItem("nickName", nickName);
    navigate(paths.MESSAGE.path);
};

const RegistrationPage = (): ReactElement => {
    const [nickName, setNickName] = useState<string>("");
    const navigate = useNavigate();

    return (
        <div className="registration-page">
            <div className="title-text heading">Welcome!</div>
            <div className="subtitle-text subtitle">Please enter your name below.</div>

            <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Name"
                className="secondary-text input-field"
            />

            <button
                onClick={() => handleSubmit(nickName, navigate)}
                className="button-text submit-button"
            >
                Sign up
            </button>
        </div>
    );
};

export default RegistrationPage;
