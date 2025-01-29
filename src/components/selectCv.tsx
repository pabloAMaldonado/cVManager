
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { notificationInfo, notificationSuccess } from "./utils/notiManager";
import { addCv, removeCv } from "../reducers/arrayCvReducer";
import { updateCv } from "../reducers/cvReducer";
import { setSelectedIndex } from "../reducers/indexReducer";


const CvSelector = () => {
    const cvs = useSelector((state: RootState) => state.cvs);
    const settedIndex = useSelector((state: RootState) => state.index)
    const cv = useSelector((state: RootState) => state.cV)
    const indexLength = cvs.length
    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = Number(event.target.value);
        const selectedCv = cvs[selectedIndex];

        if (selectedCv) {

          dispatch(setSelectedIndex(selectedIndex))
          dispatch(updateCv({ index: selectedIndex, cvs }));
          notificationInfo("CV loaded successfully");
        }
    }

    const handleNew = () => {
        dispatch(addCv(cv))
        dispatch(setSelectedIndex(indexLength))
        notificationSuccess('New template added')
    }

    const handleDelete = (index: number) => {
        dispatch(removeCv(index))
        dispatch(setSelectedIndex(indexLength))
        dispatch(updateCv({ index: 0, cvs }));
        notificationSuccess('Template deleted succefully')
    }

    return (
        <div className="cvSelector">
            <select
                id="cvs"
                onChange={handleChange}
                value={settedIndex}
            >
                {cvs.map((_, index) => (
                    <option key={index} value={index}>
                        {`Template ${ index + 1 }`}
                    </option>
                ))}
            </select>
            <button onClick={handleNew}>New</button>
            <button onClick={() => handleDelete(settedIndex)}>Delete</button>
        </div>
    )
}

export default CvSelector;
