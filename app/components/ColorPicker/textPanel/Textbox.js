"use client";

import { useCallback, useContext, useState } from "react";
import styles from "./textbox.module.css";
import { ColorContext } from "../ColorPicker";
import { debounce } from "lodash";

export default function Textbox({ type }) {
  const attributes = {
    h: { label: "H", min: 0, max: 360, step: 1, type: "number" },
    s: { label: "S", min: 0, max: 100, step: 1, type: "number" },
    l: { label: "L", min: 0, max: 100, step: 1, type: "number" },
    r: { label: "R", min: 0, max: 255, step: 1, type: "number" },
    g: { label: "G", min: 0, max: 255, step: 1, type: "number" },
    b: { label: "B", min: 0, max: 255, step: 1, type: "number" },
    a: { label: "A", min: 0, max: 1, step: 0.01, type: "number" },
  };

  const validate = (value) => {
    if (value === "") {
      return false;
    }
    let t = parseFloat(value, 10);
    if (attributes[type].min <= t && t <= attributes[type].max && !isNaN(t)) {
      return true;
    }
    console.log(`value out of range`);
    return false;
  };

  const color = useContext(ColorContext);
  const [value, setValue] = useState(color[type]);
  const [valid, setValid] = useState(validate(value));
  const [changing, setChanging] = useState(false);

  if (!changing && value != color[type]) {
    setValue(color[type]);
  }

  const updateColor = useCallback(
    debounce((value) => {
      if (validate(value)) {
        setValid(true);
        console.log(`Changing color`);
        color.change(type, value);
      } else {
        setValid(false);
      }
      setChanging(false);
    }, 600),
    []
  );

  const handleChange = (e) => {
    setChanging(true);
    setValue(e.target.value);
    updateColor(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.label}>{attributes[type].label}</h3>
      <input
        type="text"
        className={`${styles.textInput}`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
