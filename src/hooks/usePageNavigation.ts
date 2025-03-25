import { useState } from "react";
import { DocumentCallback } from "react-pdf/src/shared/types.js";

export const usePageNavigation = () => {
    const [pageLoaded, setPageLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageLoad = (pdf: DocumentCallback) => {
        setTotalPages(pdf.numPages);
        setPageLoaded(true);
    };

    const prevPage = () => {
        setCurrentPage(currentPage >= 1 ? currentPage - 1 : currentPage);
    };
    const nextPage = () => {
        setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
    };
    return { currentPage, totalPages, handlePageLoad, nextPage, pageLoaded, prevPage };
};
