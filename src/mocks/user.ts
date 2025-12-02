import type { UserI } from "../types/user";

export const user: UserI = {
    name: 'Александра Смирнова',
    email: 'anymail@mail.ru',
    avatarUrl: '',
    bio: 'Frontend разработчик с 5-летним опытом работы. Люблю создавать красивые и функциональные интерфейсы.'
}

export const users: UserI[] = [
    { name: 'Александра Смирнова', email: 'anymail@mail.ru', avatarUrl: '', bio: 'Frontend разработчик с 5-летним опытом работы. Люблю создавать красивые и функциональные интерфейсы.' },
    { name: 'Дмитрий Иванов', email: 'dmitry.ivanov@example.com', avatarUrl: '', bio: 'UX/UI дизайнер, специализируюсь на мобильных приложениях.' },
    { name: 'Мария Петрова', email: 'maria.petrova@example.com', avatarUrl: '', bio: 'Product Manager в tech стартапе. Увлекаюсь йогой и путешествиями.' },
]