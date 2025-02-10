import PropTypes from "prop-types"
import styles from "../styles/card.module.css"

export default function Card({ image, title }) {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.poster}>
                    <img src={image} alt="" />
                    <div className={styles.shadow}></div>
                </div>

                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <button>Add to Cart</button>
                </div>
            </div>
        </>
    )
}

Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
}