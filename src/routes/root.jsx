import { Outlet, Link } from "react-router"
import styles from "../styles/root.module.css"
import shoppingCart from "../assets/shopping-cart.svg"

export default function Root() {
    return (
        <>
            <div className={styles.navBarWrapper}>
                <div className={styles.navBar}>
                    <span className={styles.yellow}>
                        <Link to={"/"}><h1>FlixWatch</h1></Link>
                    </span>
                    <Link to={"/cart"}><img className={styles.icon} src={shoppingCart} alt="" /></Link>
                </div>
            </div>

            <Outlet></Outlet>
        </>
    )
}