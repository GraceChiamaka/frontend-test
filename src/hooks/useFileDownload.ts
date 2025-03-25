import { Color, PDFDocument } from "pdf-lib";
import download from "downloadjs";
import { PageRects } from "./usePageAnnotation";
import { theme } from "@src/styles";

/**
 * Downloads  modified PDF with annotations applied.
 *
 * The URL of the PDF to be downloaded and modified.
 * @param {string} pdfUrl
 * 
 * Array of annotation data containing page number,
 * rectangles (position and dimensions), and annotation type.
 * @param {PageRects[]} annotations 
 * 
 * Resolves when the modified PDF has been downloaded.  
 * @returns {Promise<void>} 
 *
 * @description
 * 1. Fetches the original PDF as an array buffer.
 * 2. Loads the PDF document using `PDFDocument.load`.
 * 3. Iterates through the provided annotations and applies highlights or underlines:
 *    **Highlight**: Draws a rectangle with a yellow background.
 *   **Underline**: Draws a thin black line at the bottom of the text.
 *   ** Comments** Not visible in the modified pdf
 * 4. Saves the modified PDF and triggers a download.
 */
export const useExportPdf = () => {
    const downloadFile = async (pdfUrl: string, annotations: PageRects[]) => {
        const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();

        annotations.forEach(({ pageNumber, rects, type }) => {
            const page = pages[pageNumber];

            rects.forEach(({ left, top, width, height }) => {
                const yPosition = page.getHeight() - top - height; // Convert to PDF coordinates

                if (type === "highlight") {
                    page.drawRectangle({
                        x: left,
                        y: yPosition,
                        width,
                        height,
                        color: theme.colors.yellow["200"] as unknown as Color,
                    });
                }

                if (type === "underline") {
                    page.drawLine({
                        start: { x: left, y: yPosition },
                        end: { x: left + width, y: yPosition },
                        thickness: 1,
                        color: theme.colors.black["50"] as unknown as Color,
                    });
                }
            });
        });

        const modifiedPdfBytes = await pdfDoc.save();
        download(modifiedPdfBytes, "annotated.pdf", "application/pdf");
    };
    return {
        downloadFile,
    };
};
