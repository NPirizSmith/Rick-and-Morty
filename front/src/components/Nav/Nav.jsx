import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";
import rnmIcon from "../../assets/logogif.gif";

const iconStyle = {
  width: "150px",
  height: "auto",
  position: "absolute",
  top: "-6px",
};

export default function Nav({ onSearch }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.navContainer}>
      <div className={style.nav}>
        <Link className={style.rnmIcon} to="/home">
          <img src={rnmIcon} style={iconStyle} alt="RNM Icon" />
        </Link>

        {windowWidth < 850 ? (
          <div className={style.menuButton} onClick={handleMenuToggle}>
            ☰
          </div>
        ) : (
          <div className={style.navButtons}>
            <Link to="/favorites">
              <button className={style.buttonAnimation}>
                <span>Favorites</span>
              </button>
            </Link>
            <Link to="/about">
              <button className={style.buttonAnimation}>
                <span>About</span>
              </button>
            </Link>
          </div>
        )}

        {menuVisible && (
          <div className={style.mobileMenu}>
            <Link to="/favorites" onClick={handleMenuToggle}>
              Favorites
            </Link>
            <Link to="/about" onClick={handleMenuToggle}>
              About
            </Link>
          </div>
        )}

        <div className={style.searchBar}>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
}
