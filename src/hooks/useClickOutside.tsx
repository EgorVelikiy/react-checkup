import { useEffect, useRef, type RefObject } from "react";

export default function useClickOutside<T extends HTMLElement>(
    target: RefObject<T>,
    handler: (event: MouseEvent | FocusEvent | TouchEvent) => void,
    eventType: 'mousedown' | 'touchstart' = "mousedown",
    eventOptions?: boolean | AddEventListenerOptions
) {
    const latestHandler = useRef(handler);

    useEffect(() => {
        latestHandler.current = handler;
        const listener = (e: MouseEvent | FocusEvent | TouchEvent) => {
            const eventTarget = e.target as Node;
            if (!eventTarget || !eventTarget.isConnected) return;

            const isOutside = target.current && !target.current.contains(eventTarget);

            if (!isOutside) return;

            latestHandler.current(e)
        }

        window.addEventListener(eventType, listener, eventOptions);

        return () => {
            window.removeEventListener(eventType, listener, eventOptions);
        }
    }, [target, eventType, eventOptions, handler]);
}