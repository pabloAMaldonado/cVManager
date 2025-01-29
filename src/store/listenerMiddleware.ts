
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { notificationInfo, notificationSuccess } from "../components/utils/notiManager";

import { addCv, removeCv, updateCv } from "../reducers/arrayCvReducer";
import {
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
} from '../reducers/cvReducer'

import { RootState } from "./store";

const listener = createListenerMiddleware()

const saveLocalStorage = (state: RootState, message: string) => {
    try {
        localStorage.setItem("cvs", JSON.stringify(state.cvs));
        if (message !== '') {
            notificationInfo(message);
        }
      } catch (error) {
        console.error("Failed to save data:", error);
        notificationInfo("Failed to save data. Please try again.");
      }
}

listener.startListening({
    actionCreator: addCv,
    effect: async (_, api) => {
        saveLocalStorage(api.getState() as RootState, "CV added and saved successfully");
    }
})

listener.startListening({
    actionCreator: removeCv,
    effect: async (_, api) => {
        saveLocalStorage(api.getState() as RootState, "CV removed successfully");
    }
})

listener.startListening({
    matcher: isAnyOf(
        updatePersonalData,
        updateResume,
        addWorkExperience,
        updateWorkExperience,
        addEducationExperience,
        updateEducationExperience,
        addSkill,
        updateSkill,
        removeWorkExperience,
        removeEducationExperience,
        removeSkill
    ), effect: async (_, api) => {
        const state = api.getState() as RootState;
        const dispatch = api.dispatch;
    
        const cv = state.cV;
        const index = state.index;

        dispatch(updateCv({ index, updatedCv: cv }));
        notificationInfo("CV updated and saved successfully");
      },    
})

listener.startListening({
    matcher: isAnyOf(
        updatePersonalData,
        updateResume,
        addWorkExperience,
        updateWorkExperience,
        addEducationExperience,
        updateEducationExperience,
        addSkill,
        updateSkill,
        removeWorkExperience,
        removeEducationExperience,
        removeSkill
    ), effect: async (action, api) => {
        switch (action.type) {
            case updatePersonalData.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Personal information updated successfully");
        break;

            case updateResume.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Resume updated successfully");
        break;

            case addWorkExperience.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Work experience added successfully");
        break;

            case updateWorkExperience.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Work experience updated successfully");
        break;

            case addEducationExperience.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Education experience added successfully");
        break;

            case updateEducationExperience.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Education experience updated successfully");
        break;

            case addSkill.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Skill added successfully");
        break;

            case updateSkill.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess("Skill updated successfully");
        break;
            
            case removeWorkExperience.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess('Entrie deleted succefully')
        break;
            case removeEducationExperience.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess('Entrie deleted succefully')
        break;
            case removeSkill.type:
                saveLocalStorage(api.getState() as RootState, '')
                notificationSuccess('Entrie deleted succefully')
        break;

        default:
            console.warn("Unhandled action type in listener middleware:", action.type);
        }
    }
})

export default listener;