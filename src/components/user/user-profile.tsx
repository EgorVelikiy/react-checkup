import type { UserI } from "../../types/user"
import './user-profile.scss'

interface UserProfileProps {
    user: UserI,
}

export default function UserProfile({ user }: UserProfileProps) {

    return (
        <div className="user">
            <div className="user__avatar">
                {user.avatarUrl && (
                    <img src={user.avatarUrl} alt='avatar'></img>
                )}
            </div>
            <div className="user__content">
                <h3 className="name">{user.name}</h3>
                <span className="email">{user.email}</span>
                <div className="bio">
                    {user.bio}
                </div>
            </div>
        </div>
    )
}