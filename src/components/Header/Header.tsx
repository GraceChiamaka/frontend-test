"use client";
import styled from "styled-components";
import { Button } from "../Button";
import { font } from "@src/fonts";

const StyledHeader = styled.header`
    display: flex;
    padding: ${({ theme }) => theme.spacing.double(1, 9)};
    justify-content: space-between;
    align-items: center;
    flex: 0 1 0;
    ${({ theme }) => theme.media.tablet} {
        padding: ${({ theme }) => theme.spacing.double(1, 3)};
    }
    ${({ theme }) => theme.media.mobile} {
        padding: ${({ theme }) => theme.spacing.double(1, 2)};
    }
`;
const ButtonContainer = styled.div`
    width: 20%;
    ${({ theme }) => theme.media.tablet} {
        width: 40%;
    }
    ${({ theme }) => theme.media.mobile} {
        width: 40%;
    }
`;
const Logo = styled.div`
    font-size: 24px;
    width: 120px;
`;

export const Header = () => {
    return (
        <StyledHeader className={font.normal.className}>
            <Logo className={font.barrecito.className}>PDF Wizard</Logo>
            <ButtonContainer>
                <Button>Login </Button>
            </ButtonContainer>
        </StyledHeader>
    );
};
