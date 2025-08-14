import CustomButton from "@components/CustomButton";
import {
    useRef,
    useState,
    useEffect,
    type ReactElement,
    type ChangeEvent,
} from "react";
import { typesOfButton } from "@utils/constants";

type AvatarState = {
    file: File | null;
    previewUrl: string | null;
};

const AvatarUploader = (): ReactElement => {
    const [currentAvatar, setCurrentAvatar] = useState<string>(
        "src/assets/images/user-icon.png"
    );
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
            //TODO Стоит расширить тип, с добавлением jpg, png и т.д.
            alert("Пожалуйста, выберите файл изображения");
            return;
        }

        const previewUrl = URL.createObjectURL(selectedFile);

        setSelectedFile({
            file: selectedFile,
            previewUrl,
        });
        setIsFileSelected(true);
    };

    const handleUpload = (): void => {
        // if (!selectedFile.file) {
        //     alert("Файл не выбран");
        //     return;
        // }

        // Извлекаем previewUrl в отдельную переменную
        const previewUrl = selectedFile.previewUrl;

        if (!previewUrl) {
            // Теперь TypeScript знает тип previewUrl
            alert("Файл не выбран");
            return;
        }

        const isConfirmed = window.confirm(
            "Вы уверены, что хотите изменить аватар?"
        );
        if (isConfirmed) {
            // Устанавливаем новый аватар из временного URL
            setIsFileSelected(false);
            setCurrentAvatar(previewUrl);

            // Сбрасываем временное состояние
            setSelectedFile({
                file: null,
                previewUrl: null,
            });

            alert("Аватар успешно изменен!");
        }

        // Очистка временных ресурсов
        useEffect(() => {
            return () => {
                if (selectedFile.previewUrl) {
                    URL.revokeObjectURL(selectedFile.previewUrl);
                }
            };
        }, [selectedFile.previewUrl]);

        // try {
        //     const formData = new FormData();
        //     formData.append("avatar", selectedFile.file);

        //     const response = await fetch(
        //         "http://localhost:3001/upload-avatar",
        //         {
        //             method: "POST",
        //             body: formData,
        //         }
        //     );

        //     if (!response.ok) {
        //         throw new Error(`Ошибка сервера: ${response.status}`);
        //     }

        //     const result = await response.json();
        //     console.log("Аватар успешно загружен:", result);
        // } catch (error) {
        //     console.error("Ошибка загрузки:", error);
        //     alert("Ошибка при загрузке аватара");
        // }
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
                <img
                    src={currentAvatar}
                    className="avatar"
                    alt="User avatar"
                    onError={(event) => {
                        event.currentTarget.src =
                            "src/assets/images/user-icon.png";
                    }}
                />
            </CustomButton>
            {isFileSelected && (
                <CustomButton
                    type={typesOfButton.sendDataButton}
                    onClick={handleUpload}
                >
                    Change
                </CustomButton>
            )}
        </div>
    );
};

export default AvatarUploader;
