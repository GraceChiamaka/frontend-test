"use client";
import { useState, useRef } from "react";
import { Annotations } from "../components/AnnotationMenu";
import { usePageNavigation } from "./usePageNavigation";

export type ModifiedPageRect = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export type PageRects = {
    rects: ModifiedPageRect[];
    range: Range;
    text: string;
    type?: Annotations;
    comment?: string;
    pageNumber: number;
};

/**
 * Custom hook for managing text annotations on a page.
 * Handles text selection, annotation tracking, and event listeners for user interactions.
 */
export const usePageAnnotation = () => {
    const [selectedTextInfo, setSelectedTextInfo] = useState<PageRects | null>(null);
    const [pageAnnotation, setPageAnnotation] = useState<PageRects[]>([]);
    const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
    const [showPopupMenu, setShowPopupMenu] = useState(false);

    const { currentPage } = usePageNavigation();

    const docRef = useRef<HTMLDivElement | null>(null);
    const getSelection = () => {
        const selection = window.getSelection();

        if (!selection || selection.isCollapsed) {
            return {};
        }
        const range = selection.getRangeAt(0).cloneRange();
        const rects = range.getClientRects();

        // Convert to absolute positions
        const formattedRects = Array.from(rects).map((rect) => ({
            top: rect.top + window.scrollY,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        }));
        return { selectedRects: formattedRects, range };
    };

    const isAlreadyAnnotated = (x: number, y: number, annotations: PageRects[]) => {
        return annotations.some(({ rects }) =>
            rects.some(
                ({ top, left, width, height }) => x >= left && x <= left + width && y >= top && y <= top + height,
            ),
        );
    };

    const handleDoubleClick = (e) => {
        const { selectedRects, range } = getSelection();
        const target = e.target as HTMLElement;
        if (target || (e.currentTarget && target?.getAttribute("role") === "presentation")) {
            if (selectedRects && range) {
                setSelectedTextInfo({
                    rects: selectedRects,
                    text: e.target.textContent,
                    range,
                    pageNumber: currentPage,
                });
                setReferenceEl((e.currentTarget as HTMLElement) ?? target);
                setShowPopupMenu(true);
            }
        }
    };
    const handleTextLayerRender = () => {
        if (docRef.current) {
            const textElements = docRef.current?.querySelectorAll("span[role='presentation']") || [];
            textElements.forEach((el: HTMLElement) => {
                el.addEventListener("dblclick", (e) => handleDoubleClick(e));
            });
        }
    };

    return {
        docRef,
        getSelection,
        handleDoubleClick,
        handleTextLayerRender,
        isAlreadyAnnotated,
        selectedTextInfo,
        pageAnnotation,
        referenceEl,
        showPopupMenu,
        setSelectedTextInfo,
        setShowPopupMenu,
        setPageAnnotation,
        setReferenceEl,
    };
};
