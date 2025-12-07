import { useState, type FormEventHandler } from 'react'
import type { PostStatus } from '../../types'
import Notification from '../notifications/notification'
import Icon from '../icon/icon';
import './post.css'

export default function Post() {
    const [status, setStatus] = useState<PostStatus>('editing');
    const [textareaData, setTextareaData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const publishHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            const isError = Math.random() < 0.3;

            if (isError) {
                setStatus('error');
            } else {
                setStatus('published');
            }

            setIsLoading(false);
            setTextareaData('');
            triggerNotification();
        }, 1500);
    }

    const resetHandler = () => {
        setTextareaData('');
        setStatus('editing');
        setShowNotification(false);
    }

    const saveDraftHandler = () => {
        localStorage.setItem('draft', textareaData);
        setTextareaData('');
        setStatus('draft');
        triggerNotification();
    }

    const getDraftHandler = () => {
        const draft = localStorage.getItem('draft');
        setTextareaData(draft || 'Не удалось загрузить черновик');
        setStatus('editing');
        setShowNotification(false);
    }

    const triggerNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <div className='post'>
            <div className='post__header'>
                <h2 className='post-title'>Создание поста</h2>
                <span className='post-subtitle'>Создайте новый пост, сохраните как черновик или опубликуйне</span>
            </div>
            <div className='post-container'>
                <form id='postForm' className='post-form' onSubmit={publishHandler}>
                    <div className='post__content'>
                        <label htmlFor="postText" className='post-label'>
                            Текст поста
                            <textarea
                                id="postText"
                                className='post-textarea'
                                placeholder='Введите текст вашего поста...'
                                value={textareaData}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaData(e.target.value)}>
                            </textarea>
                        </label>
                    </div>
                </form>
                <div className='post__actions'>
                    <button className='post-button post-button-save-draft' onClick={saveDraftHandler} disabled={!textareaData}>
                        <Icon name='draft' />
                        Сохранить как черновик
                    </button>
                    <button
                        className='post-button post-button-publish'
                        type="submit"
                        disabled={!textareaData}
                        form="postForm">
                        {isLoading ? 'Публикация...' : 'Опубликовать'}
                    </button>
                    <button
                        className='post-button post-button-reset'
                        disabled={!textareaData}
                        onClick={resetHandler}
                    >
                        Сбросить
                    </button>
                    <button className='post-button post-button-get-draft' onClick={getDraftHandler} disabled={status !== 'draft'}>
                        Вернуться к редактированию
                    </button>
                </div>
                {showNotification && <Notification status={status} />}
            </div>
        </div >
    )
}