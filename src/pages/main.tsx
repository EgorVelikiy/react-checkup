import type { UserType } from "../types";
import { CreateUserFormMemoized } from "../components/create-user-form/create-user-form";
import { useCallback, useState } from "react";
import { useUsersFilter } from "../hooks/users-filter";
import { users } from "../mocks/users";
import FilterUsers from "../components/filter-users/filter-users";
import UserList from "../components/user-list/user-list";
import './main.css'

export default function MainPage() {
    const [usersState, setUsersState] = useState<UserType[]>(users);
    const {
        filteredUsers,
        filter,
        setProfession,
        setFieldFilter,
        toggleChemistsOnly,
        resetFilters
    } = useUsersFilter(usersState);

    const addUser = useCallback((userData: Omit<UserType, 'id'>) => {
        const newUser = {
            id: Date.now(),
            name: userData.name,
            profession: userData.profession
        }

        setUsersState(prev => {
            const updated = [...prev, newUser]
            return updated;
        })
    }, []);

    return (
        <div className="main-page">
            <h3 className="main-page__header">Список пользователей</h3>
            <div className="main-page__content">
                <CreateUserFormMemoized addUser={addUser} />
                <FilterUsers
                    users={usersState}
                    filter={filter}
                    toggleChemists={toggleChemistsOnly}
                    reset={resetFilters}
                    setProfession={setProfession}
                    setFieldFilter={setFieldFilter}
                />
                <UserList users={filteredUsers} />
            </div>
        </div>
    )
}