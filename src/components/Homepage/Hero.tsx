"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import {
    Card,
    CardInput,
    Content,
    BorderedContainer,
    HeroContainer,
    UploadContainer,
    UploadInput,
    Subtitle,
    Heading,
    HeroText,
} from "./style";
import { svg } from "@src/assets/svg";
import { useState, useCallback, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useFileUpload } from "../../hooks/useFileUpload";
import { font } from "@src/fonts";
import { Button } from "../Button";
import { getErrorMessage } from "@src/utils";

const { FileIcon } = svg;

export const Hero = () => {
    const router = useRouter();
    const [uploadProgress, setUploadProgress] = useState(false);

    const { processFileUpload } = useFileUpload();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setUploadProgress(true);
        try {
            const file = acceptedFiles[0];
            await processFileUpload(file);

            setUploadProgress(false);
            router.push("/preview");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(getErrorMessage(error));
                console.error("File upload failed", error);
            }
        } finally {
            setUploadProgress(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

    const handleFileUpload = useCallback(async (ev: ChangeEvent<HTMLInputElement>) => {
        ev.stopPropagation();
        if (!ev?.target.files || ev.target.files.length === 0) return;

        setUploadProgress(true);
        try {
            const file = ev.target.files[0];
            if (!file) {
                toast.error("No file was selected");
            }
            await processFileUpload(file);
            router.push("/preview");
        } catch (error) {
            if (error) {
                if (error instanceof Error) {
                    toast.error(getErrorMessage(error));
                    console.error("File upload failed", error);
                }
            }
        } finally {
            setUploadProgress(false);
        }
    }, []);

    const renderUploadButton = useMemo(
        () => <Button>{uploadProgress ? "Uploading file ..." : "Choose Files"}</Button>,
        [uploadProgress],
    );

    return (
        <HeroContainer className={font.normal.className}>
            <Content className={font.normal.className}>
                <Subtitle>Tools/PDF Annotator</Subtitle>
                <Heading className={font.semiBold.className}>PDF Annotator</Heading>
                <HeroText>
                    All in one pdf annotator to help you add annotations to your documents Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Animi, incidunt expedita ea cumque itaque, soluta sit, assumenda
                    voluptatum praesentium atque earum ducimus illo fugiat temporibus numquam quod quas eius magni.
                </HeroText>
            </Content>

            <BorderedContainer data-component={"Bordered-CardContainer"} isActive={isDragActive}>
                <Card data-component={"Card"} {...getRootProps()} isDragActive={isDragActive}>
                    <CardInput type={"file"} {...getInputProps()} disabled={true} />
                    <Image src={FileIcon} alt="file icon" width={120} objectFit={"contain"} />
                    <p className={font.medium.className}>Drop your files here</p>
                </Card>
                <UploadContainer>
                    <UploadInput type={"file"} onChange={handleFileUpload} accept="application/pdf" />
                    {renderUploadButton}
                </UploadContainer>
            </BorderedContainer>
        </HeroContainer>
    );
};
