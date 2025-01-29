
import React from "react"

import { CVState } from "../../reducers/cvReducer"

import linkedIn from '../../assets/MdiLinkedin.png';
import www from '../../assets/TdesignInternet.png';
import mail from '../../assets/IconoirMail.png';
import telephone from '../../assets/MaterialSymbolsCall.png';

import './cvStyle.css'

type StyleOneProps = {
    filter: CVState
}
const StyleOne = ({ filter }: StyleOneProps) => {

    return (
        <div className='pdfViewer' id='cv'>
            <div className='personalData'>
                <h1>{ filter.personalData.firstName } { filter.personalData.lastName }</h1>
                <div className="contactInfo">
                    <span >
                        <img src={telephone} alt="Cellphon icon" />
                        <p>{ filter.personalData.cellphone }</p>
                    </span>
                    
                    <span>
                        <img src={mail} alt="Email icon" />
                        <p>{ filter.personalData.email }</p>
                    </span>
                    
                </div>

                <div className="contactInfoExtra">
                    { filter.personalData.linkedin !== '' && (
                        <span>
                            <img src={linkedIn} alt={'LinkedIn icon'} />
                            <p>{ filter.personalData.linkedin }</p>
                        </span>
                        ) }
                    { filter.personalData.website !== '' && (
                        <span>
                            <img src={www} alt="Website icon" />
                            <p>{ filter.personalData.website }</p>
                        </span>
                        ) }
                </div>
            </div>

            <div className="resume">
                <p>{ filter.resume }</p>
            </div>

            { filter.work.length > 0 && (
                <div className="workCv">
                    {filter.work.map((element, index) => (
                        <span key={index}>
                            { index >= 1 && (<hr/>) }
                            <span>
                                <span className="workHeader"><p>{ element.title }</p>  <p>{ element.employer }</p></span>
                                <p>{ element.city }</p></span>
                            <span className="workDate"><p>{ element.startDate } - { element.endDate == '' ? 'Actualmente' : element.endDate }</p></span>
                            <p>{ element.description }</p>
                        </span>
                    ))}
            </div>
            )}
            
            { filter.education.length > 0 && (
                <div className="eduCv">
                    {filter.education.map((element, index) => (
                        <span key={index}>
                            { index >= 1 && (<hr/>) }
                            <span>
                                <span > <p>{ element.degree } </p> <p>{ element.school }</p> </span>
                                <p>{ element.city }</p>
                                </span>
                                <span ><p>{ element.startDate } - { element.endDate == ''? 'Actualmente' : element.endDate }</p> </span>
                                <p>{ element.description }</p>
                            </span>
                ))}
            </div>
        )}

            { filter.skills.length > 0 && (<div className="skillCv">
                {filter.skills.map((element, index) => (
                    <span key={index}>
                        <p>{ element.skill }</p>
                        { element.level !== '' && (
                            <>
                                <p>-</p>
                                <p>{ element.level }</p>
                            </>
                            )}
                    </span>
                ))}
            </div>
        )}
    </div>

    )
}

export default StyleOne;
