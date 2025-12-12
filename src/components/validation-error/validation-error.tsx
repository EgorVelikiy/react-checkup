import { memo } from 'react'
import './validation-error.css'

export function ValidationError({ message }: { message?: string }) {
    return (
        <div className="error">
            {message}
        </div>
    )
}

export const ValidationErrorMemoized = memo(ValidationError)