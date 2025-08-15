import Avatar from "@components/Avatar";
import FileManager from "@services/FileManager";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useEffect, type ReactElement } from "react";
import { useFileUpload } from "@hooks/useFileUpload";
import "./style.css";

const AvatarUploader = (): ReactElement => {
    const { setAvatarUrl } = useChatDataContext();

    const { file, fileSrc, clear, handleUploadClick } = useFileUpload({
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
        const convertAndSaveAvatar = async () => {
            if (file) {
                try {
                    const base64Data = await FileManager.blobToBase64Data(file);
                    const dataUrl = `data:${file.type};base64,${base64Data.data}`;

                    setAvatarUrl(dataUrl);
                } catch (error) {
                    console.error("Ошибка конвертации аватара:", error);
                }
            }
        };

        convertAndSaveAvatar();
    }, [file, setAvatarUrl]);

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
