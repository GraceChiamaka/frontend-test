import { createPortal } from "react-dom";
import { Annotations, Menu } from "../AnnotationMenu";
import { usePopper } from "react-popper";
import { Dispatch, useRef } from "react";
import { PopupArrow } from "./style";

interface AnnotationPopupProps {
    showPopup: boolean;
    popperElement: HTMLDivElement | null;
    setPopperElement: (el: HTMLDivElement | null) => void;
    referenceElement: HTMLElement | null;
    handleMenuSelect: (type: Annotations) => void;
    handleCommentSave: () => void;
    activeMenu: Annotations | null;
    setComment: Dispatch<React.SetStateAction<string>>;
    showCommentPopup: boolean;
    setPopperRef: (el: HTMLDivElement | null) => void;
}

export const AnnotationPopup = ({
    activeMenu,
    handleCommentSave,
    handleMenuSelect,
    popperElement,
    setComment,
    showCommentPopup,
    setPopperElement,
    setPopperRef,
    showPopup,
    referenceElement,
}: AnnotationPopupProps) => {
    const arrowRef = useRef(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "bottom",
        modifiers: [{ name: "arrow", options: { element: arrowRef.current } }],
    });

    if (!showPopup) return null;

    return createPortal(
        <div
            ref={(el) => {
                setPopperElement(el);
                setPopperRef(el);
            }}
            style={{ ...styles.popper, zIndex: 1000, position: "absolute" }}
            {...attributes.popper}
        >
            <PopupArrow
                ref={arrowRef}
                style={{
                    ...styles.arrow,
                }}
            />
            <Menu
                expandedTitle={"Comment"}
                isExpanded={showCommentPopup}
                onSaveComment={handleCommentSave}
                onSelect={handleMenuSelect}
                selected={activeMenu}
                setComment={setComment}
            />
        </div>,
        document.body,
    );
};
