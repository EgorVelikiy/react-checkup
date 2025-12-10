import { useAppDispatch } from "../../hooks/redux";
import { removeCity } from "../../store/slices/cities";
import type { CityType } from "../../types/city";
import Spinner from "../loading-spinner/loading-spinner";
import './city-card.css';

export default function CityCard({ city }: { city: CityType }) {
    const dispatch = useAppDispatch();

    return (
        <div className="city-card">
            <div className="city-card__header">
                <span>{city.name}</span>
                <button className="delete-city" onClick={() => dispatch(removeCity(city.id))}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                </button>
            </div>
            {city.loading ? (
                <div className="loading">
                    <Spinner />
                </div>
            ) : (
                <div className="city-card__content">
                    <h1>{city.icon}</h1>
                    <div>
                        <h1 className="city-temp">{city.temperature}</h1>
                        <span className="weather-description">{city.description}</span>
                    </div>
                </div>
            )}
        </div>
    )
}