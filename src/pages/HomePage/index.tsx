import IntroSlides from "@components/IntroSlides";
import WelcomeBlock from "@components/WelcomeBlock";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { type ReactElement, useEffect } from "react";
import "./style.css";

const nickNameChecker = (navigate: NavigateFunction) => {
  const nickName = localStorage.getItem("nickName");

  if (!nickName) {
    navigate("/registration");
  }

  return;
}

const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {nickNameChecker(navigate)}, [navigate]);

    return (
        <div className="home-page">
            <IntroSlides />
            <WelcomeBlock />
        </div>
    );
};

export default HomePage;