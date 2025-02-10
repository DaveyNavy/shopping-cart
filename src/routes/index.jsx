import { useLoaderData } from "react-router";
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
    const json = await response.json();
    console.log(json);
    return { json };
}

export default function Index() {
    const { json } = useLoaderData();
    const images = json.results.map((e) => 'https://image.tmdb.org/t/p/original/' + e.backdrop_path);
    const titles = json.results.map((e) => e.original_title);
    console.log(titles);

    return (
        <>
            <div className={styles.container}>
                <Carousel images={images} titles={titles}></Carousel>
            </div>
        </>
    )
}