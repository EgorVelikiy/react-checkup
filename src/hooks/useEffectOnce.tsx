import { useEffect, useRef, type EffectCallback } from "react";

export default function useEffectOnce(callback: EffectCallback) {
    const isCalled = useRef<boolean>(false);

    useEffect(() => {
        if (isCalled.current) {
            return
        }
        isCalled.current = true;
        callback();
    }, [callback])
}