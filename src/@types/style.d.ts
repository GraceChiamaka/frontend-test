import "styled-components";

type ColorsTheme = {
    black: {
        /** 50: #1E1E1E   */
        50: "#1E1E1E";

        /** 100: #0000000 */
        100: "#000000";

        /** 200: #101828 */
        200: "#101828";
    };
    blue: {
        /** 50: #E3EFFC */
        50: string;
        /** 100: #EAF6FD */
        100: string;

        /** 200: #C6DDF7 */
        200: string;

        /** 300: #0D5EBA */
        300: string;

        /** 400: #366BC5 */
        400: string;
    };

    /** white: #FFFFFF */
    white: string;

    neutral: {
        grey: {
            /** 50: #F9FAFB */
            50: string;

            /** 100: #F0F2F5 */
            100: string;

            /** 200: #D0D5DD */
            200: string;

            /** 300: #98A2B3 */
            300: string;

            /** 400: #FFFFFF */
            400: string;

            /** 500: #475367 */
            500: string;

            /** 600: #344054 */
            600: string;
        };
    };
    yellow: {
        /** 50: #FEF6E7 */
        50: string;

        /** 75: #FBE2B7 */
        75: string;

        /** 100: #F3A218 */
        100: string;

        /** 200: rgba(243, 162, 24, 0.5) */
        200: "string";
    };
};

type FontSizes = {
    custom: (fontSize: number) => string /* custom */;

    /** Tiny font size: `12px` */
    tiny: string;

    /** Small font size: `14px` */
    small: string;

    /** normal font size: `16px` */
    normal: string;

    /** heading1 font size: `40px` */
    heading1: string;
};

export type Spacing = {
    /**  small: 0.5rem */
    small: string;

    /**  normal: 1rem */
    normal: string;

    /** medium: 1.125rem */
    medium: string;

    /** large: 1.5rem */
    large: string;

    /**  input: 2.625rem: 42px */
    input: string;

    /**  double: (x: number, y: number) => string */
    double: (value: number, value2: number) => string;

    /**  custom: (value: number) => string */
    custom: (val: number) => string;
};

declare module "styled-components" {
    export interface DefaultTheme {
        colors: ColorsTheme;
        fontSize: FontSizes;
        spacing: Spacing;
        media: any;
        borderRadius;
        border;
        fontWeights: FontWeights;
    }
}
