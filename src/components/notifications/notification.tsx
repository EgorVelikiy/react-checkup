import type { PostStatus } from "../../types";
import Icon from "../icon/icon";
import './notification.css';

const notificationTitles: Partial<Record<PostStatus, string>> = {
    draft: 'Черновик сохранён',
    published: 'Пост опубликован!',
    error: 'Ошибка при публикации поста',
};

const notificationMessages: Partial<Record<PostStatus, string>> = {
    draft: 'Ваш пост сохранён как черновик. Вы можете продолжить редактирование или опубликовать его.',
    published: 'Ваш пост успешно обубликован. Текст теперь нельзя редактировать.',
    error: 'К сожалению, произошла ошибка при публикации вашего поста. Пожалуйста, попробуйте снова.',
};

export default function Notification({ status }: { status: PostStatus }) {

    return (
        <div className={`notification ${status}`}>
            <Icon name={status} />
            <div className="notification-info">
                <h3 className='notification-title'>
                    {notificationTitles[status]}
                </h3>
                <span className='notification-message'>{notificationMessages[status]}</span>
            </div>
        </div>
    )
}