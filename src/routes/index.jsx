import { redirect, useLoaderData } from "react-router";
import Carousel from "../components/carousel";
import styles from "../styles/index.module.css"

export async function loader () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_READ_KEY}`
        }
    };
      
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    if (!response.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const popular = await response.json();
    console.log(popular);
    return { popular };
}

export default function Index() {
    const { popular } = useLoaderData();
    const images = popular.results.map((e) => 'https://image.tmdb.org/t/p/original/' + e.backdrop_path);
    const titles = popular.results.map((e) => e.original_title);
    const ids = popular.results.map((e) => e.id)

    return (
        <>
            <div className={styles.container}>
                <Carousel images={images} titles={titles} ids={ids} autoscroll={false}></Carousel>
            </div>
        </>
    )
}