
import React, { useEffect } from "react";
import useField from "../../hooks/useField";
import { useDispatch, useSelector } from "react-redux";

import { addEducationExperience, updateEducationExperience } from '../../reducers/cvReducer';
import { RootState } from "../../store/store";

import { dateConverter, dateReverter } from "../../hooks/dateConverter";

const EducationDataForm = ({ index }: { index: number | undefined | null}) => {
    const dispatch = useDispatch();
    const educationData = useSelector((state: RootState) => state.cV.education)

    const degree = useField("text");
    const city = useField("text");
    const school = useField("text");
    const startDate = useField("date");
    const endDate = useField("date");
    const description = useField("text");

    useEffect(() => {
        if (index !== undefined && index !== null && educationData[index]) {
            const entry = educationData[index];
            degree.spread.onChange({ target: { value: entry.degree } } as React.ChangeEvent<HTMLInputElement>);
            city.spread.onChange({ target: { value: entry.city } } as React.ChangeEvent<HTMLInputElement>);
            school.spread.onChange({ target: { value: entry.school } } as React.ChangeEvent<HTMLInputElement>);
            startDate.spread.onChange({ target: { value: dateReverter(entry.startDate) } } as React.ChangeEvent<HTMLInputElement>);
            endDate.spread.onChange({ target: { value: dateReverter(entry.endDate) } } as React.ChangeEvent<HTMLInputElement>);
            description.spread.onChange({ target: { value: entry.description } } as React.ChangeEvent<HTMLTextAreaElement>);
        } else {
            degree.onReset()
            city.onReset()
            school.onReset()
            startDate.onReset()
            endDate.onReset()
            description.onReset()
        }
    }, [index]);

    const educationEntry = {
        degree: degree.spread.value,
        city: city.spread.value,
        school: school.spread.value,
        startDate: dateConverter(startDate.spread.value),
        endDate: dateConverter(endDate.spread.value),
        description: description.spread.value,
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (index == null) {
            dispatch(addEducationExperience(educationEntry));
        } else {
            dispatch(updateEducationExperience({ index, educationEntry }))
        }
        degree.onReset()
        city.onReset()
        school.onReset()
        startDate.onReset()
        endDate.onReset()
        description.onReset()
      };

      return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                Degree:
                <input {...degree.spread} placeholder="Enter the title" />
                </label>
            </div>

            <div>
                <label>
                City/Town:
                <input {...city.spread} placeholder="Enter the city/town" />
                </label>
            </div>

            <div>
                <label>
                School:
                <input {...school.spread} placeholder="Enter your employer" />
                </label>
            </div>

            <div>
                <label>
                Start date:
                <input {...startDate.spread} placeholder="Enter the date" />
                </label>
            </div>

            <div>
                <label>
                End date:
                <input {...endDate.spread} placeholder="Enter the date, if left blank it means you still education here" />
                </label>
            </div>

            <div>
                <label>
                Description:
                <textarea {...description.spread} placeholder="Enter the description" />
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
      )
}

export default EducationDataForm
