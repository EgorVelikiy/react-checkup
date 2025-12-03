import { useState, type ReactNode } from "react"
import './modal.css'

interface ModalProps {
    title: string,
    children: ReactNode,
}

export default function Modal({ title, children, }: ModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    return (
        <>
            {!isOpen ? (
                <div className="modal--closed">
                    <span>Модальное окно</span>
                    <button
                        className="btn__open"
                        onClick={() => setIsOpen(true)}
                    >
                        Открыть модальное окно
                    </button>
                </div>
            ) : (
                <div className="modal-overlay" onPointerDown={() => setIsOpen(false)}>
                    <div
                        className="modal-window"
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <div className="modal__header">
                            <h3>{title}</h3>
                            <button
                                className="btn__close"
                                onClick={() => setIsOpen(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="modal__content">
                            {children}
                        </div>
                    </div >
                </div >
            )}
        </>
    )
}