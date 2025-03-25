import type { Metadata } from "next";
import StyledComponentsRegistry from "@src/styles/registry";
import GlobalStyle from "@styles/globalStyles";
import { AppContextProvider } from "../src/context/AppContext";

import { ThemeRegistry } from "@src/styles";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "PDF Wizard",
    description: "Pdf annotation tool",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ToastContainer position="top-right" autoClose={5000} />
                <GlobalStyle />
                <StyledComponentsRegistry>
                    <ThemeRegistry>
                        <AppContextProvider>{children}</AppContextProvider>
                    </ThemeRegistry>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
