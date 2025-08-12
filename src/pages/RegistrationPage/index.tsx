import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { type ReactElement, useState } from "react";
import { isValidMessage } from "@utils/constants";
import { paths } from "@router/routes";
import "./style.css";

const handleSubmit = (nickName: string, navigate: NavigateFunction) => {
    if (nickName.trim()) {
        localStorage.setItem("nickName", nickName);
        navigate(paths.MESSAGE.path);
    }
};

const RegistrationPage = (): ReactElement => {
    const [nickName, setNickName] = useState<string>("");
    const navigate = useNavigate();

    const isValid = isValidMessage(nickName);
    const isValidationError = nickName !== "" && !isValid;
    const isBlocked = nickName.trim() === "" || !isValid;

    return (
        <div className="registration-page">
            <div className="introduce-text heading">Welcome!</div>
            <div className="subtitle-text subtitle">
                Please enter your name below.
            </div>

            <CustomInput
                value={nickName}
                onChange={(value) => setNickName(value)}
                placeholder="Name"
                name="nickname"
                className="input-text input-field"
                invalid={isValidationError}
            />

            <CustomButton
                onClick={() => handleSubmit(nickName, navigate)}
                type="submit-button"
                disabled={isBlocked}
            >
                Sign up
            </CustomButton>
        </div>
    );
};

export default RegistrationPage;
