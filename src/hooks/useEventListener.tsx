import { useEffect, useRef, type RefObject } from "react";

export default function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap & SVGElementEventMap,
    KM extends keyof MediaQueryListEventMap,
    T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
    eventType: KW | KH | KM,
    handler: (
        event:
            | WindowEventMap[KW]
            | HTMLElementEventMap[KH]
            | SVGElementEventMap[KH]
            | MediaQueryListEventMap[KM]
            | Event
    ) => void,
    target?: RefObject<T>,
    eventOptions?: boolean | AddEventListenerOptions
) {
    const latestHandler = useRef(handler);

    useEffect(() => {
        latestHandler.current = handler;
        const targetElement = target?.current ?? window
        if (!(targetElement && targetElement.addEventListener)) return;

        const listener: typeof handler = (e) => {
            latestHandler.current(e);
        }

        targetElement.addEventListener(eventType, listener, eventOptions);

        return () => {
            targetElement.removeEventListener(eventType, listener, eventOptions);
        }

    }, [eventType, target, eventOptions, handler])
}