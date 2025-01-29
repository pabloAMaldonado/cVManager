

import React, { useEffect } from "react";
import useField from "../../hooks/useField";
import { useDispatch, useSelector } from "react-redux";

import { updateResume } from '../../reducers/cvReducer';

import { RootState } from "../../store/store";


const ResumeDataForm = () => {
    const dispatch = useDispatch();

    const data = useSelector((state: RootState) => state.cV)

    const resume = useField("text");

    useEffect(() => {
        resume.setValue(data.resume);
    }, []);

    const { value } = resume.spread;

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(updateResume(value));
      };

      return (
        <form className="formResume" onSubmit={onSubmit}>
            <>
                <label>
                Resume:
                <textarea {...resume.spread} placeholder="Enter the resume of your laboral life" />
                </label>
            </>

            <button type="submit">Submit</button>
        </form>
      )
}

export default ResumeDataForm
