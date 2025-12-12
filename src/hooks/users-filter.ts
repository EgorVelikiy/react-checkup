import type { FilterType, UserType } from "../types";
import { useCallback, useMemo, useState } from "react";

export function useUsersFilter(users: UserType[]) {
    const [filter, setFilter] = useState<FilterType>({
        profession: "",
        field: "",
        chemistsOnly: false
    });

    const setProfession = useCallback((profession: string) => {
        setFilter(prev => ({ ...prev, profession }));
    }, []);

    const setFieldFilter = useCallback((field: string) => {
        setFilter(prev => ({ ...prev, field }));
    }, []);

    const toggleChemistsOnly = useCallback(() => {
        setFilter(prev => ({
            ...prev,
            chemistsOnly: !prev.chemistsOnly
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilter({
            profession: "",
            field: "",
            chemistsOnly: false
        });
    }, []);

    const filteredUsers = useMemo(() => {
        let result = [...users];

        if (filter.profession) {
            result = result.filter(
                u => u.profession.toLowerCase() === filter.profession.toLowerCase()
            );
        }

        if (filter.profession === "all") result = [...users]

        if (filter.field) {
            result = result.sort((a, b) => {
                const key = filter.field as keyof UserType;

                const valueA = a[key];
                const valueB = b[key]

                if (typeof valueA === "number" && typeof valueB === "number") {
                    return valueA - valueB
                }

                return String(valueA).localeCompare(String(valueB))
            });
        }

        if (filter.chemistsOnly) {
            result = result.filter(u => u.profession.toLowerCase() === "chemist");
        }

        return result;
    }, [users, filter]);

    return {
        filteredUsers,
        filter,
        setProfession,
        setFieldFilter,
        toggleChemistsOnly,
        resetFilters
    };
}
