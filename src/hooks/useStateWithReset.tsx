import { useCallback, useMemo, useState } from "react"

export default function useStateWithReset<T>(state?: T | (() => T)) {
    // const initialState = useRef(state);
    // if (state !== initialState.current) initialState.current = state;

    const initialState: T = useMemo(() => {
        if (
            typeof state === 'function' && 
            state.length === 0 //?
        ) {
            // @ts-expect-error https://github.com/microsoft/TypeScript/issues/37663
            return state();
        }

        return state
    }, [state])

    const [value, setValue] = useState<T | null>(initialState);
    
    const resetValue = useCallback(() => {
        setValue(initialState);
    }, [initialState])

    return [
        value,
        setValue,
        resetValue,
    ]
}