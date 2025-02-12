import { Outlet, Link } from "react-router"
import styles from "../styles/root.module.css"
import shoppingCart from "../assets/shopping-cart.svg"
import { useState } from "react"
import Dropdown from "../components/dropdownMenu";

export default function Root() {
    const [cart, setCart] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);

    function addToCart(itemId) {
        setCart([...cart, itemId]);
    }

    return (
        <>
            <div className={styles.navBarWrapper}>
                <div className={styles.navBar}>
                    <span className={styles.yellow}>
                        <Link to={"/"}><h1>FlixWatch</h1></Link>
                    </span>
            
                    <Link className={styles.cart} to={"/cart"} onMouseOver={() => setOpenDropdown(true)} onMouseOut={() => setOpenDropdown(false)}>
                        <img className={styles.icon} src={shoppingCart} alt="" />
                        <h3 className={styles.itemCount}>{cart.length}</h3>
                        <Dropdown data={cart} open={openDropdown}></Dropdown>
                    </Link>
                </div>
            </div>
            <Outlet context={{ cart, addToCart }}></Outlet>
        </>
    )
}