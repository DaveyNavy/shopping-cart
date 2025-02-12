import { Outlet, Link, Form, useSubmit, useLoaderData } from "react-router"
import styles from "../styles/root.module.css"
import shoppingCart from "../assets/shopping-cart.svg"
import { useState, useRef } from "react"
import Dropdown from "../components/dropdownMenu";
import search from "../assets/search.svg"

export async function loader({ request }) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_READ_KEY}`
        }
    };

    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    let response;
    if (q) {
        response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${q}&include_adult=false&language=en-US&page=1`, options);
    } else {
        response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    }
    const queries = await response.json();

    return { queries };
}

export default function Root() {
    const [cart, setCart] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const submit = useSubmit();
    const { queries } = useLoaderData();
    const modalRef = useRef(null);

    function addToCart(itemId) {
        setCart([...cart, itemId]);
    }

    function removeItem(index) {
        setCart(cart.filter((e, i) => i != index));
    }

    return (
        <>
            <div className={styles.navBarWrapper}>
                <div className={styles.navBar}>
                    <span className={styles.yellow}>
                        <Link to={"/"}><h1>FlixWatch</h1></Link>
                    </span>
            

                    <dialog ref={modalRef} className={styles.modal}>
                        <Form id="search-form" role="search">
                            <input
                                id="q"
                                aria-label="Search contacts"
                                placeholder="Search"
                                type="search"
                                name="q"
                                onChange={(e) => submit(e.currentTarget.form)}
                                autoFocus
                            />
                        </Form>

                        {queries.results.slice(0,3).map((e, i) => {
                            return (
                                <div className={styles.items} key={e.id}>
                                    <Link to={`/movies/${e.id}`}>
                                        <div className={styles.item} key={e.id}>
                                            <img src={`https://image.tmdb.org/t/p/original/${e.poster_path}`} alt="" />
                                            <div>
                                                <h2>{e.original_title}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                    {(i != 2) && <hr />}
                                </div>
                            )
                        })}
                    </dialog>

                    <div className={styles.icons}>
                        <img className={styles.smallIcon} src={search} onClick={() => modalRef.current.open ? modalRef.current.close() : modalRef.current.show()}></img>

                        <Link className={styles.cart} to={"/cart"} onMouseOver={() => setOpenDropdown(true)} onMouseOut={() => setOpenDropdown(false)}>
                            <img className={styles.icon} src={shoppingCart} alt="" />
                            <h3 className={styles.itemCount}>{cart.length}</h3>
                            <Dropdown data={cart} open={openDropdown}></Dropdown>
                        
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet context={{ cart, addToCart, removeItem }}></Outlet>
        </>
    )
}