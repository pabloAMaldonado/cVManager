
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/store";

import PersonalDataForm from "./forms/personalData";
import ResumeDataForm from "./forms/resumeData";
import SkillsDataForm from "./forms/skillData";
import EducationDataForm from "./forms/educationData";
import WorkDataForm from "./forms/workData";

import { Education, Skill, WorkExperience } from "../reducers/cvReducer";

import {
    removeEducationExperience,
    removeSkill,
    removeWorkExperience
} from "../reducers/cvReducer";

import CvSelector from "./selectCv";
import PrintPdf from "./print";

import './page.css'

const MainPage = () => {
    const wholeData = useSelector((state: RootState) => state.cV)
    const dispatch = useDispatch()

    const [currentForm, setCurrentForm] = useState<string>('')
    const [print, setPrint] = useState<boolean>(false)
    const [index, setIndex] = useState<number | null | undefined>(null)

    const setForm = (event: React.FormEvent, form: string, index: number | null | undefined) => {
        event.preventDefault()

        setCurrentForm(form)
        setIndex(index);
    }

    const handlePrint = () => {
        setPrint(true)
    }

    const deleteSkill = (index: number) => {
        dispatch(removeSkill({index}))
    }

    const deleteWork = (index: number) => {
        dispatch(removeWorkExperience({index}))
    }

    const deleteEducation = (index: number) => {
        dispatch(removeEducationExperience({index}))
    }

    return (
        <div className="form-page" >
            <div className="select-forms">
                <CvSelector />

                <div className="divForms">
                    <p>Formas</p>

                    <div>
                        <div className="toForms"><p>Informacion personal</p> <button  onClick={(event) => setForm(event, 'personal', null)}>Escoger</button></div>
                    </div>

                    <div>
                        <div className="toForms"><p>Resume</p> <button  onClick={(event) => setForm(event, 'resume', null)}>Escoger</button></div>
                    </div>
                    
                    <div>
                        <div className="toForms"><p>Educacion</p> <button  onClick={(event) => setForm(event, 'education', null)}>Escoger</button></div>
                        <div className="entriesForm">
                            {wholeData.education.length > 0 && (
                                wholeData.education
                                .map((entry: Education, index: number) => (
                                <div className="arrayFromForm" key={index}>
                                    <p>{entry.degree} - {entry.school}</p>
                                    <button  onClick={(event) => setForm(event, 'education', index)}>Escoger</button>
                                    <button onClick={() => deleteEducation(index)} >Delete</button>
                                </div>
                            )))}
                        </div>
                    </div>

                    <div>
                        <div className="toForms"><p>Trabajos</p> <button  onClick={(event) => setForm(event, 'work', null)}>Escoger</button></div>
                        <div className="entriesForm">
                            {wholeData.work.length > 0 && (
                                    wholeData.work
                                .map((entry: WorkExperience, index: number) => (
                                    <div className="arrayFromForm" key={index}>
                                        <p>{entry.title} - {entry.employer}</p>
                                        <button onClick={(event) => setForm(event, 'work', index)}>Escoger</button>
                                        <button onClick={() => deleteWork(index)} >Delete</button>
                                    </div>
                                ))
                            )}
                        </div>
                        
                    </div>

                    <div className="asd">
                        <div className="toForms"><p>Habilidades</p> <button  onClick={(event) => setForm(event, 'skills', null)}>Escoger</button></div>
                        <div className="entriesForm">
                            {wholeData.skills.length >= 0 && (
                                wholeData.skills
                                .map((entry: Skill, index: number) => (
                                <div className="arrayFromForm" key={index}>
                                    <p>{entry.skill}</p>
                                    <button onClick={(event) => setForm(event, 'skills', index)}>Escoger</button>
                                    <button onClick={() => deleteSkill(index)} >Delete</button>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>

                <button onClick={handlePrint}>To print PDF</button>
            </div>

            <div className="forms">
                {currentForm === "personal" && <PersonalDataForm />}
                {currentForm === "resume" && <ResumeDataForm />}
                {currentForm === "education" && <EducationDataForm index={index} />}
                {currentForm === "work" && <WorkDataForm key={index} index={index} />}
                {currentForm === "skills" && <SkillsDataForm index={index} />}
                {!currentForm && <p>Please select a form.</p>}
            </div>

            {print && (
                <PrintPdf setPrint={setPrint}/>
            )}
        </div>
    )
}

export default MainPage
