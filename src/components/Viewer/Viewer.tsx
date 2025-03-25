"use client";
import { AppContext } from "@src/context/AppContext";
import { Annotations } from "../AnnotationMenu";
import { AnnotationPopup } from "./AnnotationPopup";
import { Container, PageOverlay, ViewerWrapper } from "./style";
import { Document, Page, pdfjs } from "react-pdf";
import { Pagination } from "./Pagination";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import { PageAnnotation } from "./PageAnnotation";
import { usePageNavigation } from "../../hooks/usePageNavigation";
import { usePageAnnotation } from "../../hooks/usePageAnnotation";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { font } from "@src/fonts";

pdfjs.GlobalWorkerOptions.workerSrc =
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useExportPdf } from "@src/hooks/useFileDownload";
import { toast } from "react-toastify";
import { getErrorMessage } from "@src/utils";
import { useFileUpload } from "@src/hooks/useFileUpload";
import { EmptyState } from "./EmptyState";

export const Viewer = () => {
    const { getFile } = useContext(AppContext);

    const popperRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [activeMenu, setActiveMenu] = useState<Annotations | null>(null);
    const [comment, setComment] = useState("");
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const [pageWidth] = useState(860);

    const { currentPage, handlePageLoad } = usePageNavigation();
    const { clearStorage } = useFileUpload();
    const {
        docRef,
        handleTextLayerRender,
        pageAnnotation,
        referenceEl,
        showPopupMenu,
        setShowPopupMenu,
        setReferenceEl,
        setSelectedTextInfo,
        setPageAnnotation,
        selectedTextInfo,
    } = usePageAnnotation();
    const { downloadFile } = useExportPdf();

    const scrollOffsetY = useMemo(() => docRef.current?.scrollTop ?? 0, [docRef]);

    useEffect(() => {
        const file = getFile();
        setFileUrl(file);
    }, []);

    const handleCommentSave = () => {
        if (selectedTextInfo) {
            const { text, rects, range } = selectedTextInfo;

            setPageAnnotation((prev) => [
                ...prev,
                { type: "comment", text, rects, range, comment: comment, pageNumber: currentPage },
            ]);
            setShowCommentPopup(false);
            handleReset();
        }
    };

    const handleFileSave = async () => {
        setDownloadLoading(true);
        try {
            if (fileUrl) {
                await downloadFile(fileUrl, pageAnnotation);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            clearStorage();
            setDownloadLoading(false);
        }
    };

    const handleMenuSelect = (type: Annotations) => {
        setActiveMenu(type);
        if (!selectedTextInfo || !selectedTextInfo.range) {
            return;
        }

        const { text, rects, range } = selectedTextInfo;
        if (type === "comment") {
            setShowCommentPopup(true);
        } else if (type === "sign") {
            console.log("Sign annotation selected");
        } else {
            setPageAnnotation((prev) => [...prev, { type, text, rects, range, pageNumber: currentPage }]);
            handleReset();
        }
    };

    const handleReset = () => {
        setShowPopupMenu(false);
        setSelectedTextInfo(null);
        setReferenceEl(null);
        setPopperElement(null);
        setActiveMenu(null);
        window.getSelection()?.removeAllRanges();
    };

    useOnClickOutside(popperRef, handleReset);

    return !fileUrl ? (
        <EmptyState />
    ) : (
        <Container className={font.normal.className}>
            <ViewerWrapper data-component={"Wrapper"} ref={wrapperRef}>
                <AnnotationPopup
                    activeMenu={activeMenu}
                    handleCommentSave={handleCommentSave}
                    handleMenuSelect={handleMenuSelect}
                    popperElement={popperElement}
                    referenceElement={referenceEl}
                    setComment={setComment}
                    showPopup={showPopupMenu}
                    showCommentPopup={showCommentPopup}
                    setPopperElement={setPopperElement}
                    setPopperRef={(el) => (popperRef.current = el)}
                />
                <PageOverlay>
                    <PageAnnotation annotations={pageAnnotation} offset={scrollOffsetY} />
                </PageOverlay>
                <Document
                    className={"pdf_wizard_custom_document_container"}
                    file={fileUrl}
                    inputRef={docRef}
                    onLoadSuccess={handlePageLoad}
                >
                    <Page
                        pageNumber={currentPage}
                        height={600}
                        width={pageWidth}
                        onRenderSuccess={handleTextLayerRender}
                        scale={600 / 1035}
                    />
                </Document>
            </ViewerWrapper>
            {fileUrl && (
                <Pagination
                    showSaveButton={pageAnnotation.length > 0}
                    onFileSave={handleFileSave}
                    isDownloading={downloadLoading}
                />
            )}
        </Container>
    );
};
