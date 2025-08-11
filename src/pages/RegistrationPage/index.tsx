import CustomInput from "@components/CustomInput";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { type ReactElement, useState } from "react";
import { paths } from "@router/routes";
import "./style.css";

const isUsernameValid = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username.trim());
};

const handleSubmit = (nickName: string, navigate: NavigateFunction) => {
    if (nickName.trim()) {
        localStorage.setItem("nickName", nickName);
        navigate(paths.MESSAGE.path);
    }
};

const RegistrationPage = (): ReactElement => {
    const [nickName, setNickName] = useState<string>("");
    const navigate = useNavigate();

    const valid = isUsernameValid(nickName);
    const isInvalid = nickName !== "" && !valid;

    return (
        <div className="registration-page">
        <div className="introduce-text heading">Welcome!</div>
        <div className="subtitle-text subtitle">Please enter your name below.</div>

        <CustomInput
            value={nickName}
            onChange={(value) => setNickName(value)}
            placeholder="Name"
            name="nickname"
            className="input-text input-field"
            invalid={isInvalid}
        />

        <button
            onClick={() => handleSubmit(nickName, navigate)}
            className="button-text submit-button"
            disabled={!valid}
        >
        Sign up
        </button>
    </div>
);
};

export default RegistrationPage;
