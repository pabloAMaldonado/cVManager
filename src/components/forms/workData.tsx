
import React, { useEffect } from "react";
import useField from "../../hooks/useField";
import { useDispatch, useSelector } from "react-redux";

import { addWorkExperience, updateWorkExperience } from '../../reducers/cvReducer';
import { RootState } from "../../store/store";

import { dateConverter, dateReverter } from "../../hooks/dateConverter";

const WorkDataForm = ({ index }: { index: number | undefined | null }) => {
    const dispatch = useDispatch();

    const workData = useSelector((state: RootState) => state.cV.work)

    const title = useField("text");
    const city = useField("text");
    const employer = useField("text");
    const startDate = useField("date");
    const endDate = useField("date");
    const description = useField("text");

    useEffect(() => {
        if (index !== null && index !== undefined && workData[index]) {
            const entry = workData[index];
            title.spread.onChange({ target: { value: entry.title } } as React.ChangeEvent<HTMLInputElement>);
            city.spread.onChange({ target: { value: entry.city } } as React.ChangeEvent<HTMLInputElement>);
            employer.spread.onChange({ target: { value: entry.employer } } as React.ChangeEvent<HTMLInputElement>);
            startDate.spread.onChange({ target: { value: dateReverter(entry.startDate) } } as React.ChangeEvent<HTMLInputElement>);
            endDate.spread.onChange({ target: { value: dateReverter(entry.endDate) } } as React.ChangeEvent<HTMLInputElement>);
            description.spread.onChange({ target: { value: entry.description } } as React.ChangeEvent<HTMLInputElement>);
        }
    }, [index, workData]);

    const workEntry = {
        title: title.spread.value,
        city: city.spread.value,
        employer: employer.spread.value,
        startDate: dateConverter(startDate.spread.value),
        endDate: dateConverter(endDate.spread.value),
        description: description.spread.value,
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (index == null) {
            dispatch(addWorkExperience(workEntry));
        } else {
            dispatch(updateWorkExperience({ index, workEntry }))
        }
        title.onReset()
        city.onReset()
        employer.onReset()
        startDate.onReset()
        endDate.onReset()
        description.onReset()
      };

      return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                Job title:
                <input {...title.spread} placeholder="Enter the title" />
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
                Employer:
                <input {...employer.spread} placeholder="Enter your employer" />
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
                <input {...endDate.spread} placeholder="Enter the date, if left blank it means you still work here" />
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

export default WorkDataForm
