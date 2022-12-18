import { createSlice} from '@reduxjs/toolkit'

const initialState={
    show : "",
    current : "",
    egg: [],
    habitat : []
}

export const expolerDetailSlice = createSlice({
    name: "expoler",
    initialState,
    reducers:{
        setShow : (state,action)=>{
            state.show = action.payload
        },
        setCurrent : (state,action)=>{
            state.current = action.payload
        },
        setEgg : (state, action)=>{
            state.egg = action.payload
        },
        setHabitat : (state, action)=>{
            state.habitat = action.payload
        }
    }
})

export const { setEgg,setShow,setHabitat,setCurrent} = expolerDetailSlice.actions

export default expolerDetailSlice.reducer