const colors = {
    black: {
        50: "#1E1E1E",
        100: "#000000",
        200: "#101828",
    },
    blue: {
        50: "#E3EFFC",
        100: "#EAF6FD",
        200: "#C6DDF7",
        300: "#0D5EBA",
        400: "#366BC5",
    },
    white: "#FFFFFF",
    neutral: {
        gray: {
            100: "#F2F4F7",
        },
        grey: {
            50: "#F9FAFB",
            75: "#F7F9FC",
            100: "#F0F2F5",
            200: "#E4E7EC",
            300: "#D0D5DD",
            400: "#98A2B3",
        },
    },
    yellow: {
        50: "#FEF6E7",
        75: "#FBE2B7",
        100: "#F3A218",
        200: "rgba(243, 162, 24, 0.5)",
    },
};

/**
 * @param maxWidth max width of media query
 * @param minWidth max width of media query
 */

const customMediaQuery = (minWidth: number, maxWidth: number) =>
    `@media only screen and (min-width: ${minWidth}px)  and  (max-width: ${maxWidth}px)`;
const extraMediaQuery = (minWidth: number) => `@media only screen and (min-width: ${minWidth}px)`;

interface Media {
    custom: (minWidth: number, maxWidth: number) => string;
    customDesktop: (minWidth: number) => string;
    mobile: string;
    tablet: string;
    smallLaptop: string;
    largeLaptop: string;
    extraLargeLaptop: string;
}

const media: Media = {
    custom: customMediaQuery,

    customDesktop: extraMediaQuery,
    /**
     * Mobile devices
     */
    mobile: customMediaQuery(250, 480),
    /**
     * iPads, Tablets
     */
    tablet: customMediaQuery(481, 768),
    /**
     * fairly large displays like small laptops
     */
    smallLaptop: customMediaQuery(769, 1024),
    /**
     * large laptops
     */
    largeLaptop: customMediaQuery(1025, 1200),
    /**
     * extra large laptops
     */
    extraLargeLaptop: extraMediaQuery(1201),
};

/**
 *
 * @param val  size as number(unitless)
 */

const customFontSize = (val: number) => `${val}rem`;
const customRadius = (val: number) => `${val}px`;
const customSpacing = (val: number) => `${val}rem`;
const customBorder = (pixel: string, color: string, style: "solid" | "dashed" = "solid") =>
    `${pixel} ${style} ${color}`;
const circleRadius = () => `50%`;
const doubleSpacing = (x: number, y: number) => `${x}rem ${y}rem`;

const fontSize = {
    custom: customFontSize,
    tiny: customFontSize(0.75),
    small: customFontSize(0.875),
    normal: customFontSize(1),
    heading1: customFontSize(2.5),
};

const fontFamily = {
    inter: "Inter, sans-serif",
    regular: "Onest, sans-serif",
    medium: "OnestMedium, sans-serif",
    semibold: "OnestSemiBold, sans-serif",
    bold: "OnestBold, sans-serif",
};
const weights = [400, 500, 600, 700];

const fontWeights = {
    regular: weights[0],
    medium: weights[1],
    semibold: weights[2],
    bold: weights[3],
};
const spacing = {
    small: customSpacing(0.5),
    normal: customSpacing(1),
    medium: customSpacing(1.125),
    large: customSpacing(1.5),
    input: customSpacing(2.625),
    double: doubleSpacing,
    custom: customSpacing,
};

const borderRadius = {
    default: "10px",
    input: "6px",
    button: "8px",
    card: "24px",
    custom: customRadius,
    round: circleRadius,
};

const border = {
    custom: customBorder,
    card: customBorder("1px", colors.blue[200], "dashed"),
    underline: customBorder("2px", colors.black[50]),
    input: customBorder("1px", colors.neutral.grey[300]),
};

export { colors, media, fontSize, fontFamily, borderRadius, spacing, border, fontWeights };
