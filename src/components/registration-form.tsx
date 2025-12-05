import { useForm, type SubmitHandler } from "react-hook-form";
import './registration-form.css'

interface FormData {
    name: string;
    email: string;
    password: string;
    age: string;
    city: string;
    color: string;
}

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
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
                />
                <span className="error">{errors.name?.message}</span>
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
                />
                <span className="error">{errors.email?.message}</span>
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
                />
                <span className="error">{errors.password?.message}</span>
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
                />
                <span className="error">{errors.age?.message}</span>
            </label>
            <label htmlFor="city">
                Город
                <input
                    id="city"
                    {...register("city", { required: "Город обязателен" })}
                    placeholder="Введите ваш город"
                />
                <span className="error">{errors.city?.message}</span>
            </label>
            <label htmlFor="color">
                Любимый цвет
                <select
                    id="color"
                    {...register("color", { required: "Выберите цвет" })}
                >
                    <option value="" disabled hidden>Выберите цвет</option>
                    <option value="red">Красный</option>
                    <option value="blue">Синий</option>
                    <option value="green">Зеленый</option>
                </select>
                <span className="error">{errors.color?.message}</span>
            </label>
            <button
                className="btn-submit"
                type="submit"
            >
                Зарегистрироваться
            </button>
        </form>
    )
}