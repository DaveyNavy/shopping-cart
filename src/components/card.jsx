import PropTypes from "prop-types"
import styles from "../styles/card.module.css"
import { Link } from "react-router"

export default function Card({ image, title, id, width=750, height=500, alignButton = false}) {
    return (
        <>
            <div className={styles.card} style={{width: width + "px"}}>
                <div className={styles.poster} style={{width: width + "px", height: height-50 +"px"}}>
                    <img src={image} alt="" />
                    <div className={styles.shadow}></div>
                </div>

               
                <h1 className={styles.title}>{title}</h1>
                <span className={`${alignButton? styles.align : undefined}`}>
                    <Link to={`/movies/${id}`}><h2>Watch</h2></Link>
                </span>
     
            </div>
        </>
    )
}

Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    alignButton: PropTypes.bool
}