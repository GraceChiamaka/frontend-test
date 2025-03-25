"use client";
import { font } from "@src/fonts";
import styled from "styled-components";
import { Header } from "../Header";
import { Button } from "../Button";
import Link from "next/link";

const Content = styled.div`
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.colors.blue["100"]};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    width: 300px;
    margin-top: 1.5rem;
`;

export const EmptyState = () => {
    return (
        <>
            <Header />
            <Content className={font.medium.className}>
                No file found, upload file
                <ButtonContainer>
                    <Link href={"/"}>
                        <Button>Upload File</Button>
                    </Link>
                </ButtonContainer>
            </Content>
        </>
    );
};
