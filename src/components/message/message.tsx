import { useAppDispatch } from "../../hooks/redux"
import type { Message } from "../../types/city";
import { clearMessage } from "../../store/slices/cities";
import { useEffect } from "react";
import Icon from "../message-icon/message-icon";
import './message.css'

type MessageProps = {
    message: Message;
}

export default function Message({ message }: MessageProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer  = setTimeout(() => {
            dispatch(clearMessage())
        }, 3000);

        return () => clearTimeout(timer)
    }, [])


    return (
        <div className="message-container">
            <Icon status={message.status} />
            {message.text}
        </div>
    )
}