import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCity, fetchWeather } from "../api";
import type { CityType } from "../types/city";
import type { RootState } from "./index";

export const addCity = createAsyncThunk(
    '/add/city',
    async (cityName: string, { getState, rejectWithValue }) => {
        try {
            const city = await fetchCity(cityName);
            
            const state = getState() as RootState;
            const exist = state.cities.cities.some(c => c.id === city.id)

            if (exist) return rejectWithValue("Город уже отслеживается");
            
            const weather = await fetchWeather(city.lat, city.long);

            return {
                id: city.id,
                name: city.name,
                latitude: city.lat,
                longitude: city.long,
                ...weather
            }
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
);

export const refreshWeatherAll = createAsyncThunk(
    '/refresh/weather',
    async (cities: CityType[], { rejectWithValue }) => {
        try {
            const results = await Promise.all(
                cities.map(async (c) => {
                    const weather = await fetchWeather(c.latitude, c.longitude);
                    return {
                        id: c.id,
                        name: c.name,
                        latitude: c.latitude,
                        longitude: c.longitude,
                        ...weather
                    };
                })
            );

            return results;
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
