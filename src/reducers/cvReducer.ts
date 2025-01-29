
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PersonalData = {
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  linkedin: string;
  website: string;
};

type WorkExperience = {
  title: string;
  city: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Education = {
  degree: string;
  city: string;
  school: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Skill = {
  skill: string;
  level: string;
};

export type {
  PersonalData,
  WorkExperience,
  Education,
  Skill
}

export type CVState = {
  personalData: PersonalData;
  resume: string;
  work: WorkExperience[];
  education: Education[];
  skills: Skill[];
};

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

const jsonCvs = localStorage.getItem('cvs');
const jsonIndex = localStorage.getItem('index');

const cvs = jsonCvs ? JSON.parse(jsonCvs) : [];
const index = jsonIndex ? JSON.parse(jsonIndex) : 0;

const initialState = cvs[index] !== cv ? cvs[index] : cv;

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    updatePersonalData: (state, action: PayloadAction<PersonalData>
    ) => {
      state.personalData = action.payload;
    },
    updateResume: (state, action: PayloadAction<string>) => {
      state.resume = action.payload;
    },
    addWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      state.work.push(action.payload);
    },
    updateWorkExperience: (
      state,
      action: PayloadAction<{ index: number; workEntry: WorkExperience }>
    ) => {
      const { index, workEntry } = action.payload;
      if (index >= 0 && index < state.work.length) {
        state.work[index] = workEntry;
      }
    },
    removeWorkExperience: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.work.length) {
        state.work.splice(index, 1);
      }
    },
    addEducationExperience: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducationExperience: (
      state,
      action: PayloadAction<{ index: number; educationEntry: Education }>
    ) => {
      const { index, educationEntry } = action.payload;
      if (index >= 0 && index < state.education.length) {
        state.education[index] = educationEntry;
      }
    },
    removeEducationExperience: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.education.length) {
        state.education.splice(index, 1);
      }
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (
      state,
      action: PayloadAction<{ index: number; skillsEntry: Skill }>
    ) => {
      const { index, skillsEntry } = action.payload;
      if (index >= 0 && index < state.skills.length) {
        state.skills[index] = skillsEntry;
      }
    },
    removeSkill: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.skills.length) {
        state.skills.splice(index, 1);
      }
    },
    updateCv: (
      state,
      action: PayloadAction<{ index: number, cvs: CVState[] }>
    ) => {
      const {  index, cvs } = action.payload;

      return state = cvs[index]
    }
  },
});

export const {
  updatePersonalData,
  updateResume,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducationExperience,
  updateEducationExperience,
  removeEducationExperience,
  addSkill,
  updateSkill,
  removeSkill,
  updateCv,
} = cvSlice.actions;

export default cvSlice.reducer;
