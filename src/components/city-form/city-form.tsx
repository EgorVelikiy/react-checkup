import { useAppDispatch } from '../../hooks/redux';
import { memo, useState } from 'react'
import { addCity } from '../../store/thunks';
import './city-form.css'

function CityForm() {
    const dispatch = useAppDispatch();
    const [cityName, setCityName] = useState('');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch(addCity(cityName));
        setCityName('');
    }

    return (
        <form className='city-form' onSubmit={submitHandler}>
            <input
                className="city-form__input"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder='Введите название города...'
                autoFocus
            />
            <button
                className="city-form__add"
                type='submit'
                disabled={!cityName}
            >
                <span>+</span> Добавить
            </button>
        </form>
    )
}

export const CityFormMemoized = memo(CityForm)