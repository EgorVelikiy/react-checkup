import { useEffect, useRef } from "react";

export default function usePrevious<T>(state: T): T | null {
    const prevState = useRef<T | null>(null);

    useEffect(() => {
        prevState.current = state;
    })

    return prevState.current
}