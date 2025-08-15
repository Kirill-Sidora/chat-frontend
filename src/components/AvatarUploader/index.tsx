import { useState, useEffect, useRef, type ReactElement } from "react";
import { useFileUpload } from "@hooks/useFileUpload";
import "./style.css";
import Avatar from "@components/Avatar";

const AvatarUploader = (): ReactElement => {
    const defaultAvatar = "src/assets/images/user-icon.png";

    const [currentAvatarUrl, setCurrentAvatarUrl] =
        useState<string>(defaultAvatar);

    const objectUrlRef = useRef<string | null>(null);

    const { file, fileSrc, handleUploadClick } = useFileUpload({
        type: "file",
        accept: ".jpg, .jpeg, .png",
        multiple: false,
    });

    //TODO Разобраться как работает данный useEffect
    // Конвертация файла в base64 и сохранение
    useEffect(() => {
        const convertAndSaveAvatar = async () => {
            if (file) {
                try {
                    // Создаем временный Object URL для предпросмотра
                    const tempUrl = URL.createObjectURL(file);
                    objectUrlRef.current = tempUrl;
                    setCurrentAvatarUrl(tempUrl);

                    // Конвертируем файл в base64
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const dataUrl = reader.result as string;

                        // Сохраняем в localStorage
                        localStorage.setItem("avatarUrl", dataUrl);

                        // Обновляем URL для отображения
                        setCurrentAvatarUrl(dataUrl);

                        // Освобождаем временный Object URL
                        URL.revokeObjectURL(tempUrl);
                        objectUrlRef.current = null;
                    };
                    reader.onerror = () => {
                        throw new Error("Failed to read file");
                    };
                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error("Ошибка сохранения аватара:", error);
                }
            }
        };

        convertAndSaveAvatar();
    }, [file]);

    useEffect(() => {
        if (!fileSrc) return;

        setCurrentAvatarUrl(fileSrc);

        localStorage.setItem("avatar", fileSrc);
    }, [fileSrc]);

    useEffect(() => {
        const savedAvatar = localStorage.getItem("avatarUrl");
        if (savedAvatar) {
            setCurrentAvatarUrl(savedAvatar);
        }
    }, []);

    return (
        <div className="avatar-uploader" onClick={handleUploadClick}>
            <Avatar url={currentAvatarUrl} />
        </div>
    );
};

export default AvatarUploader;
