import type { FieldName, UserType } from '../../types'
import { memo, useState } from 'react'
import './create-user-form.css'
import { useValidateUserData } from '../../hooks/validate-data'
import { ValidationErrorMemoized } from '../validation-error/validation-error'

interface CreateUserFormProps {
    addUser: (userData: Omit<UserType, 'id'>) => void
}

export function CreateUserForm({ addUser }: CreateUserFormProps) {
    const [userData, setUserData] = useState<Omit<UserType, 'id'>>({
        name: '', profession: '',
    })

    const { errors, validateAll, validate } = useValidateUserData();

    const changeUserDataHandler = (e: React.ChangeEvent<HTMLInputElement & { name: FieldName}>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));

        validate({ field: name, value: value})
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validateAll(userData)) return;

       addUser(userData);
        setUserData({ name: '', profession: '' });
    }

    return (
        <div className='create-from-container'>
            <h3 className='create-form__header'>Создать пользователя</h3>
            <form className='create-form' id='postForm' onSubmit={submitHandler}>
                <label htmlFor="name">
                    Имя
                    <input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={changeUserDataHandler}
                        placeholder="Введите имя"
                        className={`create-form__input ${errors.name ? 'input-error' : ''}`}
                        required
                    />
                    <ValidationErrorMemoized message={errors.name} />
                </label>
                <label htmlFor="profession">
                    Профессия
                    <input
                        id="profession"
                        name="profession"
                        value={userData.profession}
                        onChange={changeUserDataHandler}
                        placeholder="Введите профессию"
                        className={`create-form__input ${errors.profession ? 'input-error' : ''}`}
                        required
                    />
                    <ValidationErrorMemoized message={errors.profession} />
                </label>
            </form>
            <button
                className='create-user-btn'
                type="submit"
                form="postForm"
            >
                Создать
            </button>
        </div>
    )
}

export const CreateUserFormMemoized = memo(CreateUserForm)