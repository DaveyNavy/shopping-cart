import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import styles from "../styles/dropdown.module.css"


export default function Dropdown ({ data, open }) {
    const [info, setInfo] = useState([])

    useEffect (() => {
            async function loadData() {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_READ_KEY}`
                    }
                };
        
                const infoResponse = await Promise.all(data.map((e) => fetch(`https://api.themoviedb.org/3/movie/${e.id}?language=en-US`, options)));
                const json = await Promise.all(infoResponse.map((e) => e.json()));
                setInfo(json);
            }
            
            loadData();
    
        }, [data])

    return (
        <div className={`${styles.dropdown} ${open? styles.open : styles.close}`}>

            {info.map((e) => {
                return (
                    <>
                    <div className={styles.item} key={e.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${e.poster_path}`} alt="" />
                        <h2>{e.original_title}</h2>
                    </div>
                    <hr />
                    </>
                )   
            })}
        </div>
    )
}

Dropdown.propTypes = {
    data: PropTypes.array,
    open: PropTypes.bool,
}