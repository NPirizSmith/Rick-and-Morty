import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from './Nav.module.css';
import rnmIcon from "../../assets/logogif.gif";


const iconStyle = {
   width: '150px', 
   height: 'auto',
   position: "absolute",
   top: "-6px"
 };

export default function Nav({ onSearch }) {
  return (
   <div className={style.navContainer}>
         <div className={style.nav}>
            <Link className={style.rnmIcon} to="/home">
              <img src={rnmIcon} style={iconStyle}/>
            </Link>
            <div className={style.navButtons}>
             <Link to="/favorites"> <button className={style.buttonAnimation}><span>Favorites</span></button> </Link>
             <Link to="/about"> <button className={style.buttonAnimation}><span>About</span></button> </Link> 
             {/* <Link to="/about"> <button>About</button> </Link> */}
             </div>

             <div className={style.searchBar}>
               <SearchBar onSearch={onSearch} />
             </div>


              

   
         </div>
      </div>
  );
}

