import { useState } from "react";
import type { User } from "../../types/user";
import './user-item.css'

interface UserItemProps {
    user: User;
    updateUserList: (user: User) => void;
}

export default function UserItem({ user, updateUserList }: UserItemProps) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [userName, setUserName] = useState(user.name)

    const saveUserHandler = () => {
        if (userName.length < 3) {
            alert('Введите имя пользователя');
            return
        }
        
        setIsEditOpen(false)
        const newUser = { ...user, name: userName }
        updateUserList(newUser)
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            saveUserHandler();
        }

        if (e.key === "Escape") {
            setUserName(user.name);
            setIsEditOpen(false)
        }
    }

    return (
        <div className="user-card">
            {isEditOpen ? (
                <input
                    className="input-user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={keyDownHandler}
                    autoFocus
                />
            ) : (
                <div className="user-name">
                    {user.name}
                </div>
            )}
            {isEditOpen ? (
                <button className="edit-btn save-user" onClick={saveUserHandler}>
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">

                        </path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Сохранить
                </button>
            ) : (
                <button className="edit-btn edit-user" onClick={() => setIsEditOpen(true)}>
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                        </path>
                    </svg>
                    Переименовать
                </button>
            )}
        </div>
    )
}