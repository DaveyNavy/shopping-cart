import PropTypes from "prop-types";
import Card from "./card";
import styles from "../styles/carousel.module.css"
import { useState } from "react";

export default function Carousel ({ images, titles, ids }) {
    const width = 200;
    const n = images.length;
    const [slide, setSlide] = useState(0);

    function next() {
        setSlide((slide - 1) % n);
    }

    function prev() {
        setSlide((slide + 1) > 0? -n + 1 : slide + 1);
    }


    return (
        <>
            <div className={styles.carousel}>
                <button onClick={prev} className={styles.button} disabled={slide == 0}> &lt; </button>
                <div className={styles.container}>
                    <div className={styles.slides} style={{left: slide * width + "px"}}>
                        {images.map((e, i) => {
                            return <Card image={e} title={titles[i]} id={ids[i]} key={ids[i]} width={200} height={300} showButton={false} fontSize={"S"}></Card>
                        })}
                    </div>
                </div>
                <button onClick={next} className={styles.button} disabled={slide == -n + 4}> &gt; </button>
            </div>
        </>
    )
}

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    titles: PropTypes.arrayOf(PropTypes.string),
    ids: PropTypes.arrayOf(PropTypes.number),
    autoscroll: PropTypes.bool,
}