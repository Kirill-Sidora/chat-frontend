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
                if (typeof result === "string") {
                    resolve({
                        data: result.split(",")[1],
                        name: name ?? getRandomId(),
                        type: blob.type,
                        size: blob.size,
                    });
                } else {
                    reject(new Error("Failed to read blob as base64"));
                }
            };

            reader.onerror = reject;

            reader.readAsDataURL(blob);
        });
    }

    public static base64ToObjectUrl(base64: string, mimeType?: string): string {
        const match = base64.match(/^data:(.*?);base64,(.*)$/);
        if (match) {
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
}

export default FileManager;
