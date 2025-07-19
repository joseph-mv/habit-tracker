import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface HabitState {
    name:string,
    notes:string,
    checklist:Record<string,boolean>
}

const initialState:HabitState[] =[]

const habitSlice = createSlice({
    name:'habit',
    initialState,
    reducers:{
        addHabit(state, action:PayloadAction<HabitState>){
            state.push(action.payload)
        },
        deleteHabit(state, action:PayloadAction<number>){
            const index = action.payload
            state.splice(index, 1)
        },
        editHabit(state, action:PayloadAction<{index:number, habit:HabitState}>){
            const {index,habit }= action.payload
            state[index] = habit
        },
        toggleHabitStatus(state:HabitState[], action:PayloadAction<{index:number,date:string}>){
            const {index,date} = action.payload
            const checklist = state[index].checklist
            
            checklist[date] = !checklist[date]
        }
    }
})

export const {addHabit, deleteHabit, editHabit,toggleHabitStatus} = habitSlice.actions
export default habitSlice.reducer