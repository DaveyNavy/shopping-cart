import { useOutletContext } from "react-router"
import styles from "../styles/cart.module.css"
import { useEffect, useMemo, useState } from "react";
import trash from "../assets/trash.svg"

export default function Cart() {
    const { cart, removeItem } = useOutletContext(); 
    const [info, setInfo] = useState([]);
    const [cost, setCost] = useState([]);
    
    useEffect (() => {
        async function loadData() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_READ_KEY}`
                }
            };
    
            const infoResponse = await Promise.all(cart.map((e) => fetch(`https://api.themoviedb.org/3/movie/${e.id}?language=en-US`, options)));
            const json = await Promise.all(infoResponse.map((e) => e.json()));
            setInfo(json);
            setCost(cart.map((e) => e.cost));
        }
        
        loadData();

    }, [cart]);

    const totalCost = useMemo(() => {
        return cost.reduce((accum, e) => accum + e, 0);
    }, [cost])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.items}>
                        <h1 className={styles.title}>My Cart</h1>
                        {info.map((e, i) => {
                            return (
                                <div className={styles.item} key={e.id + i}> 
                                    <img src={`https://image.tmdb.org/t/p/original/${e.poster_path}`} alt="" className={styles.poster} />
                                    <div className={styles.info}>
                                        <h1>{e.original_title}</h1>
                                        <h2>X 1</h2>
                                        <h2>${cost[i]}</h2>
                                    </div>
                                    <img src={trash} alt="" className={styles.icon} onClick={() => removeItem(i)}/>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.sidebar}>
                        <h1>Cost Summary</h1>
                        <h2>Subtotal: ${totalCost}</h2>
                        <h2>Tax: ${Math.floor(totalCost / 10 * 100) / 100}</h2>
                        <hr />
                        <h1>Total: ${Math.floor(totalCost * 1.1 * 100) / 100}</h1>
                        <button className={styles.button}><h2>Proceed to Checkout</h2></button>
                    </div>
                </div>
            </div>
        </>
    )
}