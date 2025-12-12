import type { FieldName, UserType } from "../types";
import { useState } from "react";

type UserFieldValidate = {
    field: FieldName,
    value: string,
}

type UserData = Omit<UserType, 'id'>

const rules = {
    name: {
        regex: /^[A-Za-z]+$/,
        min: 2,
        max: 40,
        trim: "Имя не может быть пустым",
        rg: "Имя не должно содержать цифр или специальных символов",
        length: "Имя должно быть от 2 до 40 символов",
    },
    profession: {
        regex: /^[A-Za-z\s]+$/,
        min: 5,
        max: 100,
        trim: "Поле профессии не должно быть пустым",
        rg: "Поле профессии не должно содержать цифр или специальных символов",
        length: "Поле профессии должно быть от 5 до 100 символов",
    }
}

export function useValidateUserData() {
    const [errors, setErrors] = useState({
        name: '', profession: '',
    });

    const validate = ({ field, value }: UserFieldValidate) => {
        let newError = '';
        let rule = rules[field];

        let isValid = true

        if (!value.trim()) {
            newError = rule.trim;
            isValid = false;
        } else if (!rule.regex.test(value)) {
            newError = rule.rg;
            isValid = false;
        } else if (value.length < rule.min || value.length > rule.max) {
            newError = rule.length;
            isValid = false
        }

        setErrors(prev => {
            if (prev[field] === newError) return prev;
            return { ...prev, [field]: newError }
        });

        return isValid
    }

    const validateAll = (userData: UserData) => {
        for (let key in userData) {
            const field = key as keyof UserData
            if (!validate({ field: field, value: userData[field] })) return false
        }
        return true
    }

    return {
        errors,
        validateAll,
        validate
    }
}