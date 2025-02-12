import { useLoaderData } from "react-router";
import HeroCarousel from "../components/heroCarousel";
import Carousel from "../components/carousel"
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
    const popular = await response.json();

    const genresResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const genres = (await genresResponse.json()).genres;
    console.log(genres)


    const list = genres.map((e) => fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${e.id}`, options));
    const responseByGenre = await Promise.all(list);
    const byGenre = await Promise.all(responseByGenre.map((e) => e.json()));

    return { popular, genres, byGenre };
}

export default function Index() {
    const { popular, genres, byGenre } = useLoaderData();

    function getImages(arr, path="poster_path") {
        return arr.results.map((e) => 'https://image.tmdb.org/t/p/original/' + e[path]);
    }

    function getTitles(arr) {
        return arr.results.map((e) => e.original_title);
    }

    function getIds(arr) {
        return arr.results.map((e) => e.id);
    }

    console.log(byGenre)

    return (
        <>
            <div className={styles.container}>
                <HeroCarousel images={getImages(popular, "backdrop_path")} titles={getTitles(popular)} ids={getIds(popular)} autoscroll={true}></HeroCarousel>
                <div className={styles.genres}>
                    {genres.map((e, i) => {
                        return (<div key={e.id}>
                            <h1 className={styles.title}>{e.name}</h1>
                            <Carousel images={getImages(byGenre[i])} titles={getTitles(byGenre[i])} ids={getIds(byGenre[i])}></Carousel>
                        </div>)
                    })}
                </div>
            </div>
        </>
    )
}