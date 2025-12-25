import { useCallback, useRef } from "react";

export default function useFocus<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    const focusHandler = useCallback(() => {
        ref.current?.focus();
    }, [])

    return [ref, focusHandler]
}