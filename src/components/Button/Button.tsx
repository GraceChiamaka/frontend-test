import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ variant: "default" | "outline" }>`
    border: ${({ theme, variant }) =>
        variant === "default" ? "none" : theme.border.custom("1px", theme.colors.black["50"])};
    cursor: pointer;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: ${({ theme, variant }) => (variant === "default" ? theme.colors.black[50] : theme.colors.white)};
    border-radius: ${({ theme }) => theme.borderRadius.card};
    color: ${({ theme, variant }) => (variant === "default" ? theme.colors.white : theme.colors.black["50"])};
    font-size: ${({ theme }) => theme.fontSize.small};
    height: ${({ theme }) => theme.spacing.input};
    padding: ${({ theme }) => theme.spacing.double(0, 2)};
    &:hover {
        transition: font-size 200ms;
        font-size: ${({ theme }) => theme.fontSize.normal};
    }
`;
export const Button = ({
    children,
    disabled,
    variant = "default",
    onClick,
}: {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    variant?: "default" | "outline";
}) => {
    return (
        <StyledButton type="button" disabled={disabled} onClick={onClick} variant={variant}>
            {children}
        </StyledButton>
    );
};
