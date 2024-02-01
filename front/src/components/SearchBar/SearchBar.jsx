import { useState } from "react";
import searchicon from "../../assets/searchicon.png";
import style from "./SearchBar.modules.css";
import random from "../../assets/random.png"


const formGroupStyle = {
  position: 'relative',
  width: '50%',
};

const formFieldStyle = {
  fontFamily: 'inherit',
  width: '20%',
  border: '0',
  borderBottom: `2px solid #000000`,
  outline: '0',
  fontSize: '1rem',
  color: "#000000",
  fontWeight: "500",
  padding: '7px 0',
  background: 'transparent',
  transition: 'border-color 0.2s',
};

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(id);
    }
  };

  const handleRandomIdClick = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  };

  const iconStyle = {
    height: "15px",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
  };

  return (
    <div style={formGroupStyle}>
      <input
        placeholder="Search by ID..."
        style={formFieldStyle}
        type="input"
        value={id}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="custom-input"
      />
      <button style={buttonStyle} onClick={() => { onSearch(id); }} className={style.button}>
        <img src={searchicon} style={iconStyle} alt="Buscar" />
      </button>
      <img
        src={random}
        className={`${"random"} ${"hover"}`}
        onClick={handleRandomIdClick}
        alt="Random"
      />
    </div>
  );
}
