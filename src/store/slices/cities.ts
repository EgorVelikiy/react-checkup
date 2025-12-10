import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CityType, Message } from "../../types/city";
import { addCity, refreshWeatherAll } from '../thunks';

interface CitiesState {
    cities: CityType[];
    loading: boolean;
    message: Message | null
}

const initialState: CitiesState = {
    cities: [],
    loading: false,
    message: null,
}

const CitiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        removeCity: (state, action: PayloadAction<CityType['id']>) => {
            const city = state.cities.find(c => c.id === action.payload);
            state.message = {
                status: 'info',
                text: `Город ${city?.name} успешно удален`
            }
            state.cities = state.cities.filter(c => c.id !== action.payload)
        },
        clearMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCity.pending, (state, action) => {
                state.cities.push({
                    id: action.meta.requestId,
                    name: '',
                    latitude: 0,
                    longitude: 0,
                    temperature: '',
                    description: '',
                    loading: true,
                    icon: '',
                    error: null,
                });
            })
            .addCase(addCity.fulfilled, (state, action) => {
                const index = state.cities.findIndex(c => c.id === action.meta.requestId);
                if (index !== -1) {
                    state.cities[index] = {
                        ...action.payload,
                        loading: false,
                        error: null
                    }
                }
                state.message = {
                    status: 'success',
                    text: `Город ${action.payload.name} успешно добавлен`
                }
            })
            .addCase(addCity.rejected, (state, action) => {
                state.message = {
                    status: 'error',
                    text: action.payload as string
                }
                const index = state.cities.findIndex((c) => c.loading === true);
                if (index !== -1) state.cities.splice(index, 1);
            })
            .addCase(refreshWeatherAll.pending, (state) => {
                state.cities.forEach(c => c.loading = true);
            })
            .addCase(refreshWeatherAll.fulfilled, (state, action) => {
                for (const newWeather of action.payload) {
                    const city = state.cities.find(c => c.id === newWeather.id);
                    if (city) {
                        city.temperature = newWeather.temperature;
                        city.description = newWeather.description;
                        city.icon = newWeather.icon;
                        city.loading = false
                    }
                }
                state.message = {
                    status: 'success',
                    text: 'Данные успешно обновлены'
                }
            })
            .addCase(refreshWeatherAll.rejected, (state, action) => {
                state.message = {
                    status: 'error',
                    text: action.payload as string
                }
            })
    }
})

export const { removeCity, clearMessage } = CitiesSlice.actions;
export default CitiesSlice.reducer;