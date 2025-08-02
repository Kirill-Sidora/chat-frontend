import { Link } from "react-router-dom";
import "./style.css";

export default function WelcomeBlock() {
  return (
    <div>
      <div className="welcome-block">
        <Link to="/chat" className="center-link">
          <img
            height={150}
            src="src/assets/icons/logo.svg">
          </img>
        </Link>
      </div>
      <span className="text-style">Telegram 2</span>
    </div>
    
  );
}
