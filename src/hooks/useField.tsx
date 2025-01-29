
import React, { useState } from "react";

const useField = (type: string) => {
    const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  const spread = {
    type,
    value,
    onChange,
  };

  return {
    spread,
    setValue,
    onReset,
  };
}

export default useField
