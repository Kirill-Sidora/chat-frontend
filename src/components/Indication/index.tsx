import Timer from "@components/Timer";
import type { ReactElement } from "react";
import "./style.css";

const Indication = (): ReactElement => {
    return (
        <div className="indicator">
            <span className="red-dot"></span>
            
            <Timer />
        </div>
    );
};

export default Indication;
