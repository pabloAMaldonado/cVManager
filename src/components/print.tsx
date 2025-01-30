
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import StyleOne from "./styles/styleOne";

import { 
    Skill,
    WorkExperience,
    Education,
    CVState
} from "../reducers/cvReducer";

import x from '../assets/TablerX.svg'

import PdfPrint from './pdfPrint'

import './print.css'

import "./styles/cvStyle.css"

type PrintPdfProps = {
    setPrint: React.Dispatch<React.SetStateAction<boolean>>
}

const PrintPdf = ({ setPrint }: PrintPdfProps) => {
    const cv = useSelector((state: RootState) => state.cV)
    const [filter, setFilter] = useState<CVState>({
        personalData: cv.personalData,
        resume: cv.resume,
        work: [],
        education: [],
        skills: []
    })
    const selectStyler = 'Style 1'

    const filterHandler = (e: React.ChangeEvent<HTMLInputElement>, section: string, index: number, element: string) => {
        switch (section) {
            case 'work':
              if (e.target.checked) {
                setFilter((prev) => ({
                  ...prev,
                  work: [...prev.work, cv.work[index]],
                }));
              } else {
                setFilter((prev) => ({
                  ...prev,
                  work: prev.work.filter((item) => item.title !== element),
                }));
              }
              break;
          
            case 'education':
              if (e.target.checked) {
                setFilter((prev) => ({
                  ...prev,
                  education: [...prev.education, cv.education[index]],
                }));
              } else {
                setFilter((prev) => ({
                  ...prev,
                  education: prev.education.filter((item) => item.degree !== element),
                }));
              }
              break;
          
            case 'skill':
                if (e.target.checked) {
                    setFilter((prev) => ({
                        ...prev,
                        skills: [...prev.skills, cv.skills[index]]
                    }))
                } else {
                    setFilter((prev) => ({
                        ...prev,
                        skills: prev.skills.filter((item) => item.skill !== element)
                    }))
                }
                break;

            default:
              break;
          }
    }

    // const styleHandler = (style: string) => {
    //     switch (style) {
    //         case 'Style 1':
    //             setStyler('mit')
    //             setSelectStyler('Style 1')
    //             break;
    //         case 'Style 2':
    //             setStyler('berkeley')
    //             setSelectStyler('Style 2')
    //             break;
    //         case 'Style 3':
    //             setStyler('cambridge')
    //             setSelectStyler('Style 3')
    //             break;
    //         default:
    //             break;
    //     }
            
    // }

    const styles = ["Style 1"];

    const CloseButton = () => {
        const buttonHandler = () => {
            setPrint(false)
        }

        return (
            <button className='closeButton' onClick={buttonHandler}><img src={x} alt="close button" /></button>
        )
    }

    return (
        <div className="print">
            <div className="fullPrint">
                <div className="filter">
                    <div className="work-filterer">
                        <p>Work:</p>
                        {cv.work.length >= 1 && (cv.work
                        .map((element: WorkExperience, index: number) => (
                            <div key={index}>
                                <input
                                type="checkbox"
                                value={element.title}
                                onChange={(e) => filterHandler(e, 'work', index, element.title)}
                                />
                                <p>{element.title} - {element.employer}</p>
                            </div>
                        )))}
                    </div>
                    <div className="education-filterer">
                        <p>Education: </p>
                        {cv.education.length >= 1 && (cv.education
                        .map((element: Education, index: number) => (
                            <div key={index}>
                                <input
                                type="checkbox"
                                value={element.degree}
                                onChange={(e) => filterHandler(e, 'education', index, element.degree)}
                                />
                                <p>{element.degree} - {element.school}</p>
                            </div>
                        )))}
                    </div>
                    <div className="skills-filterer">
                        <p>Skills: </p>
                        {cv.skills.length >= 1 && (cv.skills
                        .map((element: Skill, index: number) => (
                            <div key={index}>
                                <input
                                type="checkbox"
                                value={element.skill}
                                onChange={(e) => filterHandler(e, 'skill', index, element.skill)}
                                />
                                <p>
                                    {element.skill}
                                    {element.level !== '' && <span> - {element.level}</span>}
                                </p>
                            </div>
                        )))}
                    </div>
                </div>

                <div className="styleSelecter">
                    <label htmlFor="style-select">Plantillas:</label>
                    <select
                        id="style-select"
                        value={selectStyler}
                        // onChange={(e) => styleHandler(e.target.value)}
                        style={{ cursor: "pointer" }}
                    >
                         <option value="" disabled>
                            Select a style
                        </option>
                        
                        {styles.map((style) => (
                            <option key={style} value={style}>
                                {style}
                            </option>
                        ))}
                    </select>

                    <PdfPrint />
                </div>
            </div>
            <StyleOne filter={filter} />
            <CloseButton />
        </div>
    )

}

export default PrintPdf
