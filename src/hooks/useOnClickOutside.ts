import { useEffect } from "react";

/**
 * Custom hook that detects clicks outside of a specified element and triggers a handler function.
 *
 * @param {React.RefObject<HTMLElement | null>} ref
 * @param {(event: MouseEvent) => void} handler
 *
 */
export function useOnClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    handler: (event: MouseEvent) => void,
): void {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
}
