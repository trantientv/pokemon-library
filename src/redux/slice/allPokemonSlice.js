import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allPokemon: [],
}

export const allPokemonSlice = createSlice({
  name: 'allPokemon',
  initialState,
  reducers: {
    setAllPokemon : (state, action) => {
        state.allPokemon = action.payload
    },
    pushItem : (state, action) => {
        state.pokemonList.push(action.payload)
    },
  },
})

export const { setAllPokemon } = allPokemonSlice.actions

export default allPokemonSlice.reducer