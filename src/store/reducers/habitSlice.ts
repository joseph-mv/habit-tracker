import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface HabitState {
    name:string,
    notes:string,
    checklist?:Record<string,boolean>[]
}

const initialState:HabitState[] =[]

const habitSlice = createSlice({
    name:'habit',
    initialState,
    reducers:{
        addHabit(state, action:PayloadAction<HabitState>){
            state.push(action.payload)
        }
    }
})

export const {addHabit} = habitSlice.actions
export default habitSlice.reducer