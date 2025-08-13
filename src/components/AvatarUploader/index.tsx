import CustomButton from "@components/CustomButton";
import { useRef, useState, type ReactElement, type ChangeEvent } from "react";
import { typesOfButton } from "@utils/constants";

type AvatarState = {
    file: File | null; // Сам файл
    previewUrl: string | null; // URL для предпросмотра
};

const AvatarUploader = (): ReactElement => {
    const [selectedFile, setSelectedFile] = useState<AvatarState>({
        file: null,
        previewUrl: null,
    });
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const selectedFile = files[0];

        if (!selectedFile.type.startsWith("image/")) {
            alert("Пожалуйста, выберите файл изображения");
            return;
        }

        const previewUrl = URL.createObjectURL(selectedFile);

        setSelectedFile({
            file: selectedFile,
            previewUrl,
        });
    };

    const handleUpload = async () => {
        if (!selectedFile.file) {
            alert("Файл не выбран");
            return;
        }

        // Обновляем статус на "загрузка"
        setSelectedFile((prev) => ({ ...prev, status: "loading" }));

        try {
            const formData = new FormData();
            formData.append("avatar", selectedFile.file);

            // Отправка на сервер
            const response = await fetch(
                "http://localhost:3001/upload-avatar",
                {
                    method: "POST",
                    body: formData,
                    // Заголовки не нужны - браузер сам установит Content-Type
                }
            );

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const result = await response.json();
            console.log("Аватар успешно загружен:", result);

            // Обновляем статус
            setSelectedFile((prev) => ({ ...prev, status: "success" }));
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            setSelectedFile((prev) => ({ ...prev, status: "error" }));
            alert("Ошибка при загрузке аватара");
        }
    };

    return (
        <div className="avatar-container">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="avatar-input"
            />
            <CustomButton
                type={typesOfButton.loadAvatarButton}
                onClick={handleButtonClick}
            >
                <img src="src/assets/images/user-icon.png" className="avatar" />
            </CustomButton>
            <CustomButton
                type={typesOfButton.sendDataButton}
                onClick={handleUpload}
            >
                Change
            </CustomButton>
        </div>
    );
};

export default AvatarUploader;
