import CustomButton from "@components/CustomButton";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { type ReactElement, useState } from "react";
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

    return (
        <div className="registration-page">
            <div className="headline-1-text heading">Welcome!</div>
            <div className="subtitle-text subtitle">
                Please enter your name below.
            </div>

            <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Name"
                className="secondary-text input-field"
            />

            <CustomButton
                onClick={() => handleSubmit(nickName, navigate)}
                type="button-text submit-button"
            >
                Sign up
            </CustomButton>
        </div>
    );
};

export default RegistrationPage;
