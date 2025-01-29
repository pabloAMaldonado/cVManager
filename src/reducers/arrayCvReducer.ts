
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CVState } from "./cvReducer";

const cv: CVState = {
    personalData: {
      firstName: "",
      lastName: "",
      email: "",
      cellphone: "",
      linkedin: "",
      website: "",
    },
    resume: "",
    work: [],
    education: [],
    skills: [],
  };
  

const storedCvs = localStorage.getItem('cvs');
const initialState: CVState[] = storedCvs ? JSON.parse(storedCvs) : [];

const arraySlice = createSlice({
    name: 'array',
    initialState,
    reducers: {
        addCv: (state) => {
            state.push(cv)
        },
        updateCv: (
            state,
            action: PayloadAction<{ index: number; updatedCv: CVState }>
        ) => {
            const { index, updatedCv } = action.payload;
            if (index >= 0 && index < state.length) {
              state[index] = updatedCv;
            }
        },
        removeCv: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.length) {
              state.splice(index, 1);
            }
        },  
    }
})

export const {
    addCv,
    updateCv,
    removeCv
} = arraySlice.actions

export default arraySlice.reducer;
