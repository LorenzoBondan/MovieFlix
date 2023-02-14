import { Movie } from "types/movie";

type Props = {
    movie : Movie;
  }

const MovieCard = ({movie} : Props) => {
    return(
        <div className="base-card movie-card-container">
            <div className="movie-card-top-container">
                <img src={movie.imgUrl} alt={movie.title} />
            </div>

            <div className="movie-card-bottom-container">
                <h1>{movie.title}</h1>
                <h2>{movie.year}</h2>
                <p>{movie.synopsis}</p>
            </div>
        </div>
    );
}

export default MovieCard;