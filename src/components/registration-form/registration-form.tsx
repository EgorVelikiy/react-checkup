import { useForm, type SubmitHandler } from "react-hook-form";
import './registration-form.css'
import { type FormData } from "../types";
import ValidationError from "../error/error";

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            age: '',
            city: '',
            color: ''
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        alert(`Спасибо за регистрацию, ${data.name}!`);
        reset();
    }

    return (
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="registration-form__header">
                <h3 className="form-title">Форма регистрации</h3>
                <span className="form-subtitle">Заполните все поля для регистрации</span>
            </div>
            <label htmlFor="name">
                Имя
                <input
                    id="name"
                    {...register("name", {
                        required: "Имя обязательно",
                        minLength: { value: 2, message: "Минимум 2 символа" },
                        maxLength: { value: 30, message: "Максимум 30 символов" }
                    })}
                    placeholder="Введите ваше имя"
                    className={errors.name ? 'input-error' : ''}
                />
               <ValidationError message={errors.name?.message} />
            </label>
            <label htmlFor="email">
                Email
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email обязателен",
                    })}
                    placeholder="example@email.com"
                    className={errors.email ? 'input-error' : ''}
                />
                <ValidationError message={errors.email?.message} />
            </label>
            <label htmlFor="password">
                Пароль
                <input
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Пароль обязателен",
                        minLength: { value: 6, message: "Минимум 6 символов" },
                    })}
                    placeholder="Введитие пароль"
                    className={errors.password ? 'input-error' : ''}
                />
                <ValidationError message={errors.password?.message} />
            </label>
            <label htmlFor="age">
                Возраст
                <input
                    id="age"
                    {...register("age", {
                        required: "Возраст обязателен",
                        min: { value: 1, message: "Возраст должен быть не менее 1" },
                        max: { value: 100, message: "Возраст должен быть не более 100" },
                    })}
                    placeholder="Введите ваш возраст"
                    className={errors.age ? 'input-error' : ''}
                />
                <ValidationError message={errors.age?.message} />
            </label>
            <label htmlFor="city">
                Город
                <input
                    id="city"
                    {...register("city", { required: "Город обязателен" })}
                    placeholder="Введите ваш город"
                    className={errors.city ? 'input-error' : ''}
                />
                <ValidationError message={errors.city?.message} />
            </label>
            <label htmlFor="color">
                Любимый цвет
                <select
                    id="color"
                    {...register("color", { required: "Выберите цвет" })}
                    className={errors.color ? 'input-error' : ''}
                >
                    <option value="" disabled hidden>Выберите цвет</option>
                    <option value="red">Красный</option>
                    <option value="blue">Синий</option>
                    <option value="green">Зеленый</option>
                </select>
                <ValidationError message={errors.color?.message} />
            </label>
            <button className="btn-submit" type="submit">
                Зарегистрироваться
            </button>
        </form>
    )
}