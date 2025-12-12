import type { UserType } from '../../types';
import UserCard from '../user-card/user-card';
import './user-list.css';

interface UserListProps {
    users: UserType[]
}

export default function UserList({ users }: UserListProps) {
    return (
        <div className='user-list-container'>
            <h3 className='users-count'>Пользователи ({users.length})</h3>
            <ul className='user-list'>
                {users.map(user => (
                    <li className='user-item' key={user.id}>
                        <UserCard user={user} />
                    </li>
                ))}
            </ul>
        </div>
    )
}