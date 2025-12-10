import { CityFormMemoized } from "../components/city-form/city-form";
import { useAppSelector } from "../hooks/redux";
import CitiesList from "../components/cities-list/cities-list";
import Message from "../components/message/message";
import './main-page.css';

export default function MainPage() {
    const cities = useAppSelector(state => state.cities.cities);
    const message = useAppSelector(state => state.cities.message)
    return (
        <div className="main-page">
            <div className="main-page__header">
                <h2 className="main-page__title">Прогноз погоды</h2>
                <span className="main-page__subtitle">Добавляйте и отслеживайте текущую погоду</span>
            </div>

            <CityFormMemoized />

            {cities.length > 0 ? (
                <CitiesList cities={cities} />
            ) : (
                <div className="tooltip">
                    Добавьте первый город, чтобы начать отслеживание погоды
                </div>
            )}

            {message && (
                <Message message={message}/>
            )}
        </div>
    )
}