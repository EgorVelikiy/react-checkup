import { useMemo, useState } from 'react';
import type { SelectFieldKeys, FilterType, UserType } from '../../types';
import './filter-users.css';

interface FilterUsersProps {
    users: UserType[];
    filter: FilterType;
    toggleChemists: () => void;
    reset: () => void;
    setProfession: (profession: string) => void;
    setFieldFilter: (value: string) => void
}

export default function FilterUsers({
    users,
    filter,
    toggleChemists,
    reset,
    setProfession,
    setFieldFilter
}: FilterUsersProps) {

    const fieldNames: Record<SelectFieldKeys, string> = {
        profession: "Профессия",
    };

    const [selectedField, setSelectedField] = useState(filter.field);

    const uniqueProfessions = useMemo(() => {
        return Array.from(new Set(users.map(user => user.profession)));
    }, [users])

    return (
        <div className='filter'>
            <div className='filter__item'>
                <label>Фильтр по профессии</label>
                <div className='filter-actions'>
                    <button
                        className={filter.chemistsOnly ? 'only-chemists-active' : 'only-chemists'}
                        onClick={toggleChemists}
                    >
                        Показать только химиков
                    </button>
                    <button className='reset-filter-btn' onClick={reset}>
                        Сбросить фильтр
                    </button>
                </div>
            </div>
            <div className='filter__item'>
                <label>Все профессии</label>
                <select
                    id="professions"
                    value={filter.profession}
                    onChange={(e) => setProfession(e.target.value)}
                >
                    <option value="all">Все профессии</option>
                    {uniqueProfessions.map(profession => (
                        <option key={profession} value={profession}>{profession}</option>
                    ))}
                </select>
            </div>
            <div className='filter__item'>
                <label>Сортировка</label>
                <div className='filter-actions'>
                    <select
                        id="fields"
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                    >
                        <option value="Имя">Имя</option>
                        {Object.keys(users[0])
                            .filter(key => key !== "id" && key !== "name")
                            .map(key => (
                                <option key={key} value={key}>
                                    {fieldNames[key as SelectFieldKeys]}
                                </option>
                            ))}
                    </select>
                    <button
                        className='sort-btn'
                        onClick={() => setFieldFilter(selectedField)}
                    >
                        Сортировать
                    </button>
                </div>
            </div>
        </div>
    )
}
