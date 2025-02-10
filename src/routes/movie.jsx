import { useLoaderData } from "react-router";
import Card from "../components/card"
import styles from "../styles/movie.module.css"

export async function loader ({ params }) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_READ_KEY}`
        }
    };
      
    const infoResponse = fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`, options);
    const creditResponse = fetch(`https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=en-US&page=1`, options);
    const similarResponse = fetch(`https://api.themoviedb.org/3/movie/${params.movieId}/recommendations?language=en-US&page=1`, options);

    const response = await Promise.all([infoResponse, creditResponse, similarResponse]);
    const json = await Promise.all([response[0].json(), response[1].json(), response[2].json()]);
    return { info: json[0], credits: json[1], similar: json[2] }
}

export default function MoviePage() {
    const { info, credits, similar } = useLoaderData();
    const director = credits.cast.filter((e) => (e["known_for_department"] = "Directing"))[0]["name"];
    const actors = credits.cast.filter((e) => (e["known_for_department"] = "Acting")).slice(0,3).map((e) => e["name"]);
    const writers = credits.cast.filter((e) => (e["known_for_department"] = "Directing")).slice(0,2).map((e) => e["name"]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{info.original_title}</h1>
                    <img src={'https://image.tmdb.org/t/p/original/' + info.backdrop_path} alt="" />


                    <div className={styles.description}>
                        <div className={styles.text}>
                            <p>{info.overview}</p>
                            <hr />
                            <p>Director: {director}</p>
                            <hr />
                            <p>Writers: {writers.map((e, i) => e + (i == writers.length - 1 ? "" : ", "))}</p>
                            <hr />
                            <p>Stars: {actors.map((e, i) => e + (i == actors.length - 1 ? "" : ", "))}</p>
                        </div>
                        <button className={styles.button}><h1>Buy for $3.99</h1></button>
                    </div>

                    <div className={styles.similarShows}>
                        <h1 className={styles.title}>You might like: </h1>
                        <div className={styles.shows}>
                            {similar.results.slice(0,3).map((e) => <Card image={'https://image.tmdb.org/t/p/original/' + e.backdrop_path} 
                            title={e.original_title} id={e.id} key={e.id} width={300} height={250}></Card>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}