
import React, { useState, useEffect } from "react";
import useField from "../../hooks/useField";
import { useDispatch, useSelector } from "react-redux";

import { updatePersonalData } from '../../reducers/cvReducer';

import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";

const PersonalDataForm = () => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const persoData = useSelector((state: RootState) => state.cV)

    const dispatch = useAppDispatch();
    const firstName = useField("text");
    const lastName = useField("text");
    const email = useField("email");
    const cellphone = useField("tel");

    const linkedin = useField("url");
    const website = useField("url");

    useEffect(() => {
        firstName.spread.onChange({ target: { value: persoData.personalData.firstName } } as React.ChangeEvent<HTMLInputElement>);
        lastName.spread.onChange({ target: { value: persoData.personalData.lastName } } as React.ChangeEvent<HTMLInputElement>);
        email.spread.onChange({ target: { value: persoData.personalData.email } } as React.ChangeEvent<HTMLInputElement>);
        cellphone.spread.onChange({ target: { value: persoData.personalData.cellphone } } as React.ChangeEvent<HTMLInputElement>);
        linkedin.spread.onChange({ target: { value: persoData.personalData.linkedin } } as React.ChangeEvent<HTMLInputElement>);
        website.spread.onChange({ target: { value: persoData.personalData.website } } as React.ChangeEvent<HTMLInputElement>);
        
    }, []);


    const [extend, setExtend] = useState(false);

    const extendHandler = () => {
        setExtend(!extend)
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            firstName: firstName.spread.value,
            lastName: lastName.spread.value,
            email: email.spread.value,
            cellphone: cellphone.spread.value,
            linkedin: linkedin.spread.value,
            website: website.spread.value,
        }
    
        dispatch(updatePersonalData(data));
      };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                First name:
                <input {...firstName.spread} placeholder="Enter your name" />
                </label>
            </div>

            <div>
                <label>
                Last name:
                <input {...lastName.spread} placeholder="Enter your name" />
                </label>
            </div>

            <div>
                <label>
                Number:
                <input {...cellphone.spread} placeholder="Enter your number" />
                </label>
            </div>

            <div>
                <label>
                Email:
                <input {...email.spread} placeholder="Enter your email" />
                </label>
            </div>

            { extend === false && (
                <button onClick={extendHandler}>Optional</button>
            )}

            { extend === true && (
                <>
                    <button onClick={extendHandler}>Less</button>
                    <div>
                        <label>
                        LinkedIn:
                        <input {...linkedin.spread} placeholder="Enter your linkedIn" />
                        </label>
                    </div>

                    <div>
                        <label>
                        Website:
                        <input {...website.spread} placeholder="Enter your website" />
                        </label>
                    </div>
                </>
            )}

            <button type="submit">Submit</button>
        </form>
    )
}

export default PersonalDataForm
