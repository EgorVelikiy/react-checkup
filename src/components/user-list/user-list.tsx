import type { User } from "../../types/user";
import { useState } from "react";
import { users } from "../../mocks/user-list";
import UserItem from "../user-item/user-item";
import './user-list.css'
import Tooltip from "../tooltip/tooltip";

export default function UserList() {
    const [userList, setUserList] = useState<User[]>(users);

    const updateUserList = (user: User) => {
        setUserList(prevState => {
            return prevState.map(u => u.id === user.id ? user : u)
        });
    }

    return (
        <div className="user-list-container">
            <div className="user-list">
                <h3>Список пользователей</h3>
                <ul className="users">
                    {userList.map(user => (
                        <li key={user.id} className="users-item">
                            <UserItem user={user} updateUserList={updateUserList} />
                        </li>
                    ))}
                </ul>
            </div>
            <Tooltip />
        </div>
    )
}