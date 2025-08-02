import introSlidesImagesData from "@app-types/images";
import { type ReactElement } from "react";
import "./style.css";

const IntroSlides = (): ReactElement => {
    return (
        <div className="home-page-intro-slides-wrapper">
            {introSlidesImagesData.map((image) => (
                <div
                    className="home-page-intro-slide"
                    key={image.id}
                    style={{ left: image.left, top: image.top }}
                >
                    <img
                        src={image.src}
                        height={image.height}
                        z-index={image.zIndex}
                    ></img>
                </div>
            ))}
        </div>
    );
};

export default IntroSlides;
