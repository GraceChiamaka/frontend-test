"use client";
import styled from "styled-components";
import { Header } from "../Header";
import { Hero } from "./Hero";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.colors.white};
`;

export const Homepage = () => {
    return (
        <Container>
            <Header />
            <Hero />
        </Container>
    );
};
