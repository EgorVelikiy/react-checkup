import type { UserType } from '../../types';
import './user-card.css';

interface UserCardProps {
    user: UserType
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className="card user">
            <div className="user__content">
                <h3 className="user-name">{user.name}</h3>
                <span className="user-profession">{user.profession}</span>
            </div>
        </div>
    )
}