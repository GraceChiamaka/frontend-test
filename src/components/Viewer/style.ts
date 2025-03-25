import styled from "styled-components";
import { ModifiedPageRect } from "../../hooks/usePageAnnotation";

export const ViewerWrapper = styled.div`
    height: calc(100vh - 120px);
    position: relative;
`;

export const Highlight = styled.div<{ rect: ModifiedPageRect; offsety: number }>`
    position: absolute;
    top: ${({ rect, offsety }) => rect.top + offsety}px;
    left: ${({ rect }) => rect.left}px;
    width: ${({ rect }) => rect.width}px;
    height: ${({ rect }) => rect.height}px;
    background: ${({ theme }) => theme.colors.yellow["200"]};
`;

export const Underline = styled.div<{ rect: ModifiedPageRect; offsety: number }>`
    position: absolute;
    top: ${({ rect, offsety }) => rect.top + offsety}px;
    left: ${({ rect }) => rect.left}px;
    width: ${({ rect }) => rect.width}px;
    height: ${({ rect }) => rect.height}px;
    border-bottom: ${({ theme }) => theme.border.underline};
`;

export const Comment = styled.div<{ rect: ModifiedPageRect; offsety: number }>`
    position: absolute;
    top: ${({ rect, offsety }) => rect.top + offsety}px;
    left: ${({ rect }) => rect.left}px;
    width: ${({ rect }) => rect.width}px;
    height: ${({ rect }) => rect.height}px;

    button {
        left: ${({ rect }) => rect.width / 2}px;
        top: -${({ rect }) => rect.height}px;
    }
`;

export const CommentButton = styled.button`
    width: 24px;
    height: 24px;
    position: relative;
    pointer-events: auto;
    cursor: pointer;
`;

export const Sign = styled.div<{ rect: ModifiedPageRect; offsety: number }>`
    position: absolute;
    top: ${({ rect, offsety }) => rect.top + offsety}px;
    left: ${({ rect }) => rect.left}px;
    width: ${({ rect }) => rect.width}px;
    height: ${({ rect }) => rect.height}px;
    border-bottom: ${({ theme }) => theme.border.underline};
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: white;
`;

export const PageOverlay = styled.div`
    width: 800px;
    height: 100%;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
`;

export const ViewComment = styled.div`
    background: white;
    padding: 0.5rem 1rem;
    border: ${({ theme }) => theme.border.input};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    color: ${({ theme }) => theme.colors.black[50]};
    background: ${({ theme }) => theme.colors.blue[100]};
    width: 300px;
    position: absolute;
`;

export const PopupArrow = styled.span`
    display: inline-block;
    background: transparent;
    border-style: solid;
    border-color: transparent transparent black transparent;
    border-width: 10px;
    top: -20px;
`;
