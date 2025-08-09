import type { IEncodedFileData } from "@app-types/file";
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

    public static base64ToObjectURL(base64: string): string {
        console.log("BASE 64: ", base64);

        try {
            const byteString = atob(base64);
            const byteArray = new Uint8Array(byteString.length);

            for (let i = 0; i < byteString.length; i++) {
                byteArray[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([byteArray]);
            return URL.createObjectURL(blob);
        } catch (err) {
            console.error("Invalid Base64 string:", err);
            throw err;
        }
    }

    public static bufferToObjectURL(buffer: Buffer, mimeType?: string): string {
        const uint8Array = new Uint8Array(buffer);
        const blob = new Blob(
            [uint8Array],
            mimeType ? { type: mimeType } : undefined
        );
        return URL.createObjectURL(blob);
    }

    public static bufferToFile(
        buffer: Buffer | Uint8Array,
        fileName: string,
        mimeType: string
    ): File {
        // Convert Buffer (Node.js) to Uint8Array if needed
        const uint8Array =
            buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

        // Create File from Uint8Array
        return new File([uint8Array], fileName, { type: mimeType });
    }
}

export default FileManager;
