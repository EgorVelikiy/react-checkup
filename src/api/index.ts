import api from "./utils/axios";
import { map } from "../types/city";

export async function fetchCity(cityName: string) {
    const params = {
        name: cityName,
        count: 1,
        language: 'ru',
        format: 'json',
    }
    
    const url = 'https://geocoding-api.open-meteo.com/v1/search'
    const response = await api.get(url, {
        params: params
    })

    const data = await response.data

    if (!data.results || data.results.length === 0) {
        throw new Error(`Не удалось загрузить информацию о городе ${cityName}`)
    }

    return {
        id: data.results[0].id,
        name: data.results[0].name,
        lat: data.results[0].latitude,
        long: data.results[0].longitude,
    }
}

export async function fetchWeather(lat: number, long: number) {
    const params = {
        latitude: lat,
        longitude: long,
        current_weather: true
    }
    const url = 'https://api.open-meteo.com/v1/forecast'
    const response = await api.get(url, {
        params: params
    })

    const data = await response.data

    if (!data) throw new Error('Не удалось загрузить погоду');

    const temp = `${data.current_weather.temperature}${data.current_weather_units.temperature}`
    const code = data.current_weather.weathercode;

    return {
        temperature: temp,
        description: map[code]?.desc ?? "Нет данных",
        icon: map[code]?.icon ?? "",
    }
}