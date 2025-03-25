import { useState } from "react";
import { PageRects } from "../../hooks/usePageAnnotation";
import { Highlight, Comment, CommentButton, Underline, Sign, ViewComment } from "./style";
import { svg } from "@src/assets/svg";

import Image from "next/image";
const { CommentIcon } = svg;

type AnnotationProps = {
    annotations: PageRects[];
    offset: number;
};

export const PageAnnotation = ({ annotations, offset }: AnnotationProps) => {
    const [showComment, setShowComment] = useState(false);

    return annotations.map(({ rects, type, comment }) => {
        const commentOffset = 32;
        const pdfWidth = 800;

        const translateX = pdfWidth / 2 - (rects[0].left * commentOffset) / 2;

        if (type === "highlight")
            return <Highlight key={`${type}-${rects[0].left}`} rect={rects[0]} offsety={offset} />;
        if (type === "underline")
            return <Underline key={`${type}-${rects[0].left}`} rect={rects[0]} offsety={offset} />;
        if (type === "comment")
            return (
                <div key={`${type}-${rects[0].left}`}>
                    <Comment key={`${type}-${rects[0].left}`} rect={rects[0]} offsety={offset}>
                        <CommentButton onClick={() => setShowComment(true)}>
                            <Image src={CommentIcon} width={16} height={16} alt="comment icon" />
                        </CommentButton>
                    </Comment>
                    {showComment && (
                        <ViewComment
                            className={"comment-display"}
                            style={{
                                top: rects[0].top,
                                left: pdfWidth - rects[0].left,
                                transform: `translateX(${translateX}px)`,
                            }}
                        >
                            {comment}
                        </ViewComment>
                    )}
                </div>
            );
        if (type === "sign") return <Sign key={`${type}-${rects[0].left}`} rect={rects[0]} offsety={offset} />;
    });
};
