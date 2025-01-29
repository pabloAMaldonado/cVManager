
import React, { useEffect } from "react";
import useField from "../../hooks/useField";
import { useDispatch, useSelector } from "react-redux";

import { addSkill, updateSkill } from '../../reducers/cvReducer';
import { RootState } from "../../store/store";

const SkillsDataForm = ({ index }: { index: number | undefined | null }) => {
    const dispatch = useDispatch();

    const SkillsData = useSelector((state: RootState) => state.cV.skills)

    const skill = useField("text");
    const level = useField("text");


    useEffect(() => {
        if (index !== undefined && index !== null && SkillsData[index]) {
            const entry = SkillsData[index];
            skill.spread.onChange({ target: { value: entry.skill } } as React.ChangeEvent<HTMLInputElement>);
            level.spread.onChange({ target: { value: entry.level } } as React.ChangeEvent<HTMLInputElement>);
        } else {
            skill.onReset()
            level.onReset() 
        }
    }, [index]);

    const skillsEntry = {
        skill: skill.spread.value,
        level: level.spread.value,
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (index == null) {
            dispatch(addSkill(skillsEntry));
        } else {
            dispatch(updateSkill({ index, skillsEntry }))
        }
        skill.onReset()
        level.onReset()
      };

      return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                Skill:
                <input {...skill.spread} placeholder="Enter the skill" />
                </label>
            </div>

            <div>
                <label>
                Level:
                <input {...level.spread} placeholder="Enter the level" />
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
      )
}

export default SkillsDataForm
