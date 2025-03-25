import styled from "styled-components";

export const HeroContainer = styled.div`
    display: flex;
    padding: ${({ theme }) => theme.spacing.double(2, 9)};
    gap: ${({ theme }) => theme.spacing.custom(2)};
    justify-content: space-between;
    margin-top: ${({ theme }) => theme.spacing.input};
    align-items: center;
    height: calc(100vh - 150px);
    ${({ theme }) => theme.media.smallLaptop} {
        padding: ${({ theme }) => theme.spacing.custom(3)};
    }
    ${({ theme }) => theme.media.tablet} {
        padding: ${({ theme }) => theme.spacing.custom(3)};
        flex-direction: column;
    }
    ${({ theme }) => theme.media.mobile} {
        padding: ${({ theme }) => theme.spacing.custom(2)};
        flex-direction: column;
    }
`;

export const BorderedContainer = styled.div<{ isActive?: boolean }>`
    padding: ${({ theme }) => theme.spacing.large};
    border: ${({ theme, isActive }) =>
        isActive ? theme.border.custom("1px", theme.colors.blue[300], "dashed") : theme.border.card};
    border-radius: ${({ theme }) => theme.borderRadius.card};

    ${({ theme }) => theme.media.tablet} {
        width: 100%;
        order: 1;
    }
    ${({ theme }) => theme.media.mobile} {
        width: 100%;
        order: 1;
    }
`;
export const Card = styled.div<{ isDragActive: boolean }>`
    width: ${({ theme }) => theme.spacing.custom(16)};
    height: ${({ theme }) => theme.spacing.custom(16.25)};
    border-radius: ${({ theme }) => theme.borderRadius.card};
    background: ${({ theme, isDragActive }) => (isDragActive ? theme.colors.blue[200] : theme.colors.blue[100])};
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    ${({ theme }) => theme.media.tablet} {
        width: 100%;
    }
    ${({ theme }) => theme.media.mobile} {
        width: 100%;
    }
`;

export const UploadInput = styled.input`
    height: 42px;
    border-radius: 24px;
    border: none;
    cursor: pointer;
    width: 100%;
    position: absolute;
    top: 0;
    border: none;
    outline: none;
    opacity: 0;
`;

export const UploadContainer = styled.div`
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

export const CardInput = styled.input`
    width: 100%;
    height: 100%;
    cursor: not-allowed;
`;

export const Content = styled.div`
    width: 55%;
    ${({ theme }) => theme.media.tablet} {
        width: 100%;
        order: 2;
    }
    ${({ theme }) => theme.media.mobile} {
        width: 100%;
        order: 2;
    }
`;
export const Subtitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.normal};
    color: ${({ theme }) => theme.colors.neutral.grey[400]};
`;
export const Heading = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.heading1};
    color: ${({ theme }) => theme.colors.black[100]};
    margin: ${({ theme }) => theme.spacing.double(1, 0)};
`;
export const HeroText = styled.p`
    font-size: ${({ theme }) => theme.fontSize.normal};
    color: ${({ theme }) => theme.colors.black[50]};
    line-height: 1.2;
    max-width: 80%;
`;
