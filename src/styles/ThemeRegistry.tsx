"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "./index";

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
