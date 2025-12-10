import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { refreshWeatherAll } from "../../store/thunks";
import type { CityType } from "../../types/city";
import CityCard from "../city-card/city-card";
import './cities-list.css'

export default function CitiesList({ cities }: { cities: CityType[] }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(refreshWeatherAll(cities))
        }, 5 * 60 * 1000)

        return () => clearInterval(interval)
    }, [cities])

    return (
        <div className="cities-container">
            <div className="cities-header">
                <span>Отслеживается городов: {cities.length}</span>
                <button
                    className="refresh-btn"
                    onClick={() => dispatch(refreshWeatherAll(cities))}
                >
                    <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                        <path strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                    </svg>
                    Обновить всё
                </button>
            </div>
            <ul className="cities-list">
                {cities.map(c => (
                    <li className="cities-item" key={c.id}>
                        <CityCard city={c} />
                    </li>
                ))}
            </ul>
            <span className="info">Автоматическое обновление каждые 5 минут</span>
        </div>
    )
}