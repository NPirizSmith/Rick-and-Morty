import style from "./About.module.css"
import github from "../../assets/github.png"
import linkedin from "../../assets/linkedin.png"
import profile from "../../../../../profile.jpg"

export default function About() {
   return (
    <div className={style.aboutContainer}>
        <div className={style.cardContainer}>
	<div className={style.round}  alt="user"><img src={profile} /></div>
	<h3>Nahuel Píriz Smith</h3>
	<p>I am a full stack developer in process,<br/>studying at Henry Bootcamp</p>
	<div className={style.button}>
    <a className={style.a} href="#"><img src={github} alt="" /><span className={style.span} >Github</span></a>
    <a className={style.a} href="#"><img src={linkedin} alt="" /><span className={style.span} >Linkedin</span></a>
	</div>
	<div className={style.skills}>
		<h6>Skills</h6>
		<ul>
			<li>UI / UX</li>
			<li>Front End Development</li>
			<li>HTML</li>
			<li>CSS</li>
			<li>JavaScript</li>
			<li>React</li>
		</ul>
	</div>
</div>

    </div>
   );
}
