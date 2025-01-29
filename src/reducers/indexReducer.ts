
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const index = localStorage.getItem('index')

const initialState: number = index ? JSON.parse(index) : 0;

const indexSlice = createSlice({
    name: 'selectedIndex',
    initialState,
    reducers: {
        setSelectedIndex: (state, action: PayloadAction<number>) => {
            localStorage.setItem('index', JSON.stringify(action.payload))
            return action.payload
        },
    },
});

export const { setSelectedIndex } = indexSlice.actions;
export default indexSlice.reducer;
