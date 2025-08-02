import { Link } from "react-router-dom";
import "./style.css";

export default function WelcomeBlock() {
    return (
        <div>
            <div className="welcome-block">
                <Link to="/chat" className="center-link">
                    <img
                        height={150}
                        style={{}}
                        src="src/assets/icons/logo.svg"
                    ></img>
                </Link>
            </div>
            <span className="text-style headline-text">Telegram 2</span>
        </div>
    );
}
