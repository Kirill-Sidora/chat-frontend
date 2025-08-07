import { type ReactElement, useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import "./style.css";

const handleSubmit = (nickName: string, navigate: NavigateFunction) => {
    if (nickName.trim()) {
        localStorage.setItem("nickName", nickName);
        navigate("/chat");
    }
};

const RegistrationPage = (): ReactElement => {
    const [nickName, setNickName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="registration-page">
            <div className="animated-heading">Welcome!</div>
            <div className="animated-subtitle">Please enter your name below.</div>

            <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Name"
                className="input-field secondary-text"
            />

            <button onClick={() => handleSubmit(nickName, navigate)} className="submit-button">
                Sign up
            </button>
        </div>
    );
};

export default RegistrationPage;
