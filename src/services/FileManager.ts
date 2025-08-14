import { type IEncodedFileData } from "@app-types/file";
import { getRandomId } from "@utils/constants";

class FileManager {
    public static async blobToBase64Data(
        blob: Blob,
        name?: string
    ): Promise<IEncodedFileData> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result;

                if (typeof result !== "string") {
                    reject(new Error("Failed to read blob as base64"));
                } else {
                    resolve({
                        data: result.split(",")[1],
                        name: name ?? getRandomId(),
                        type: blob.type,
                        size: blob.size,
                    });
                }
            };

            reader.onerror = reject;

            reader.readAsDataURL(blob);
        });
    }

    public static base64ToObjectUrl(base64: string, mimeType?: string): string {
        const match = base64.match(/^data:(.*?);base64,(.*)$/);
        
        if (!match) {
            
        }
        else {
            mimeType = match[1];
            base64 = match[2];
        }

        base64 = base64.replace(/\s/g, "");

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], {
            type: mimeType || "application/octet-stream",
        });
        
        return URL.createObjectURL(blob);
    }

    public async uploadFile(options: {
        type: string;
        accept: string;
        multiple: boolean;
    }): Promise<File | null> {
        return new Promise((resolve) => {
            const fileInput = document.createElement('input');
            
            fileInput.type = options.type;
            fileInput.accept = options.accept;
            fileInput.multiple = options.multiple;

            fileInput.onchange = (event) => {
                resolve((event.target as HTMLInputElement).files?.[0] || null);
            };

            fileInput.oncancel = () => resolve(null);
            fileInput.click();
        });
    }
}

export default FileManager;