"use client";
const STORAGE_KEY = "pdf_wizard_file";

export const useFileUpload = () => {
    /**
     * Converts uploaded file to base64 string
     * @param  {File} file to be uploadded
     * @returns {Promise<base64 string>}
     */
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    return reject(new Error("File reading failed"));
                }
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
    /**
     * Converts a Base64-encoded string to a Blob object.
     *
     * @param {string} base64 - The Base64 string to convert. It should be in the format "data:<MIME-type>;base64,<encoded-data>".
     * @returns {Blob | null} - A Blob object representing the decoded data, or null if conversion fails.
     */
    const base64ToBlob = (base64: string): Blob | null => {
        const [meta, data] = base64.split(",");
        const mime = meta.match(/:(.*?);/)?.[1] || "";

        const binary = atob(data);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }
        return new Blob([array], { type: mime });
    };

    const saveFileToStorage = (item: string) => {
        localStorage.setItem(STORAGE_KEY, item);
    };
    const clearStorage = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    const getFileFromStorage = () => {
        return localStorage.getItem(STORAGE_KEY);
    };
    /**
     * Converts a file to a Base64 string and saves it to storage.
     *
     * @param {File} file - The file to be uploaded.
     * @returns {Promise<void>} Resolves when the file is successfully processed.
     */
    const processFileUpload = async (file: File) => {
        const base64File = await fileToBase64(file);
        saveFileToStorage(base64File);
    };
    return { base64ToBlob, clearStorage, fileToBase64, getFileFromStorage, processFileUpload, saveFileToStorage };
};
