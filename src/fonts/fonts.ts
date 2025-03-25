import { Geist, Barriecito } from "next/font/google";

const normal = Geist({
    weight: "400",
    subsets: ["latin"],
});
const medium = Geist({
    weight: "500",
    subsets: ["latin"],
});
const semiBold = Geist({
    weight: "600",
    subsets: ["latin"],
});
const bold = Geist({
    weight: "700",
    subsets: ["latin"],
});

const barrecito = Barriecito({
    weight: "400",
    subsets: ["latin"],
});
export const font = {
    barrecito,
    normal,
    medium,
    semiBold,
    bold,
};
