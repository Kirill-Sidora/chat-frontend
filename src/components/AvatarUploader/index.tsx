import Avatar from "@components/Avatar";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useEffect, type ReactElement } from "react";
import { useFileUpload } from "@hooks/useFileUpload";
import "./style.css";

const AvatarUploader = (): ReactElement => {
    const { setAvatarUrl } = useChatDataContext();

    const { fileSrc, clear, handleUploadClick } = useFileUpload({
        type: "file",
        accept: ".jpg, .jpeg, .png",
        multiple: false,
    });

    useEffect(() => {
        if (fileSrc) {
            setAvatarUrl(fileSrc);
        }
    }, [fileSrc, setAvatarUrl]);

    useEffect(() => {
        return () => {
            clear();
        };
    }, [clear]);

    return (
        <div className="avatar-uploader" onClick={handleUploadClick}>
            <Avatar />
        </div>
    );
};

export default AvatarUploader;
