import axios from "axios";
import React, { useState } from "react";
import AsyncSelect from "react-select/async";

async function getData(url) {
  let res = await axios.get(url);
  return res.data;
}

export default function CustomAsyncSelect({
  url,
  name,
  handleChange,
  placeholder = "",
  labelName = "name",
  setData = null,
}) {
  const [inputValue, setInputValue] = useState("");
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const loadOptions = async (inputValue) => {
    let res = await getData(url);
    if (setData) {
      setData(res);
    }

    return res
      .filter((r) =>
        r[labelName].toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((t) => ({ value: t.id, label: t[labelName] }));
  };

  return (
    <AsyncSelect
      className="pb-16"
      noOptionsMessage={() => "Seçenek bulunamadı"}
      cacheOptions
      defaultOptions
      styles={selectStyles}
      placeholder={placeholder}
      name={name}
      loadOptions={loadOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  );
}
