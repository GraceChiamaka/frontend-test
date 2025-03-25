/* eslint-disable react/display-name */
import styled from "styled-components";
import { Dispatch, forwardRef } from "react";
import { font } from "@src/fonts";

const COMMENT_MAX_LENGTH = 40;

const Layout = styled.div<{ expanded?: boolean }>`
    display: flex;
    max-height: 220px;
    border: 1px solid;
    background: ${({ theme }) => theme.colors.white};
    padding: 1rem 0;
    pointer-events: auto;
    gap: 1.5rem;
    width: ${({ expanded }) => (expanded ? "400px" : "180px")};
`;

const MenuContainer = styled.div`
    max-width: 150px;
    padding: 1rem 0;
    pointer-events: auto;
    z-index: 9999;
    flex: 0 0 120px;
`;

const Item = styled.div<{ active: boolean }>`
    cursor: pointer;
    font-size: 14px;
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.black[50]};
    &:hover {
        background: rgba(214, 246, 255, 0.5);
    }
    background: ${({ active }) => (active ? "rgba(214, 246, 255, 0.6)" : "transparent")};
`;

const CommentInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 1rem;
    gap: 8px;
    textarea {
        height: 42px;
        border: ${({ theme }) => theme.border.input};
        padding: 4px;
    }
    button {
        height: 32px;
        border: none;
        color: white;
        background: black;
        padding: 0.5rem 0;
        border-radius: 8px;
        outline: none;
        box-shadow: none;
        font-size: 14px;
    }
`;

export type Annotations = "highlight" | "underline" | "comment" | "sign";

type MenuProps = {
    onSelect: (value: Annotations) => void;
    isExpanded: boolean;
    expandedTitle?: string;
    onSaveComment?: () => void;
    selected: Annotations | null;
    setComment?: Dispatch<React.SetStateAction<string>>;
};

const menuItem: Annotations[] = ["highlight", "comment", "underline", "sign"];

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    const { expandedTitle, onSelect, isExpanded, onSaveComment, selected, setComment } = props;
    const handleSelect = (item: Annotations) => {
        onSelect(item);
    };
    return (
        <Layout ref={ref} className={font.medium.className} expanded={isExpanded}>
            <MenuContainer>
                {menuItem.map((item) => (
                    <Item key={`menu-item-${item}`} active={item === selected} onClick={() => handleSelect(item)}>
                        {item}
                    </Item>
                ))}
            </MenuContainer>
            {isExpanded && (
                <CommentInput>
                    <h3>{expandedTitle}</h3>
                    <textarea
                        maxLength={COMMENT_MAX_LENGTH}
                        onChange={({ target }) => setComment && setComment(target.value)}
                    ></textarea>
                    <button onClick={onSaveComment}>Add</button>
                </CommentInput>
            )}
        </Layout>
    );
});
