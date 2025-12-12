export type UserType = {
    id: number,
    name: string,
    profession: string
}

export type FilterType = {
    profession: string,
    field: string,
    chemistsOnly: boolean,
}

export type FieldName = "name" | "profession";

export type SelectFieldKeys = Exclude<keyof UserType, 'id' | 'name'>