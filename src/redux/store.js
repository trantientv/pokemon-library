import { configureStore } from '@reduxjs/toolkit'
import pokemonListReducer from './slice/pokemonListSlice'
import allPokemonReducer from './slice/allPokemonSlice'
import expolerDetailSlice from './slice/expolerDetailSlice'

export const store = configureStore(
  {
    reducer: {
      pokemonList : pokemonListReducer,
      allPokemon  : allPokemonReducer,
      expolerDetail : expolerDetailSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
  }
)