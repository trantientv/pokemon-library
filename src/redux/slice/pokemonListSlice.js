import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pokemonList: [],
  nextUrl : "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
}

export const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    updateList : (state, action) => {
        state.pokemonList = action.payload
    },
    pushItem : (state, action) => {
        state.pokemonList.push(action.payload)
    },
    updateUrl : (state, action) => {
      state.nextUrl = action.payload
  },
  },
})

export const { updateList, pushItem, updateUrl } = pokemonListSlice.actions

export default pokemonListSlice.reducer