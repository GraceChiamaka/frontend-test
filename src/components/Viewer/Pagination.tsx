import styled from "styled-components";
import { usePageNavigation } from "../../hooks/usePageNavigation";
import { Button } from "../Button";

import Link from "next/link";

type PaginationProps = {
    isDownloading: boolean;
    showSaveButton: boolean;
    onFileSave: () => void;
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-self: baseline;
    justify-content: space-between;
    gap: 24px;
    padding: 1rem 0;
    width: 800px;
`;

const PageText = styled.p`
    min-width: 100px;
`;
export const Pagination = ({ isDownloading, showSaveButton, onFileSave }: PaginationProps) => {
    const { currentPage, pageLoaded, prevPage, nextPage, totalPages } = usePageNavigation();

    return (
        <Container data-component={"Pagination"}>
            <Link href={"/"} style={{ display: "inline-block", width: "100%" }}>
                <Button>Back to Home</Button>
            </Link>

            <Button
                variant={"outline"}
                aria-label={"previous  button"}
                disabled={!pageLoaded || currentPage <= 1}
                onClick={prevPage}
            >
                Previous
            </Button>
            <PageText>
                Page {currentPage || (currentPage ? 1 : "--")} of {totalPages || "--"}
            </PageText>
            <Button
                aria-label={"next button"}
                disabled={!pageLoaded || currentPage >= totalPages}
                variant={"outline"}
                onClick={nextPage}
            >
                Next
            </Button>
            {showSaveButton && (
                <Button onClick={onFileSave} disabled={isDownloading}>
                    {isDownloading ? "Downloading file ..." : "Save Changes"}
                </Button>
            )}
        </Container>
    );
};
