"use client";
import { createContext, ReactNode, useMemo, useState } from "react";
import { useFileUpload } from "../hooks/useFileUpload";

type AppContextProps = {
    file: string;
    getFile: () => string | null;
    updateFile: (value: string) => void;
};

export const AppContext = createContext({ file: "" } as AppContextProps);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<string>("");
    const { getFileFromStorage, base64ToBlob } = useFileUpload();
    const updateFile = (fileBlob: string) => setFile(fileBlob);

    const getFile = (): string | null => {
        const base64File = getFileFromStorage();

        if (base64File) {
            const fileObj = base64ToBlob(base64File ?? "");
            if (fileObj) {
                return URL.createObjectURL(fileObj);
            }
        }

        return null;
    };

    const contextValue = useMemo(() => ({ file, getFile, updateFile }), []);

    return <AppContext.Provider value={contextValue}> {children} </AppContext.Provider>;
};
