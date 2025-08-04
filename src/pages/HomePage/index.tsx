import IntroSlides from "@components/IntroSlides";
import WelcomeBlock from "@components/WelcomeBlock";
import { type ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    const nickName = localStorage.getItem("nickName");
    if (!nickName) {
      navigate("/registration");
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <IntroSlides />
      <WelcomeBlock />
    </div>
  );
};

export default HomePage;
