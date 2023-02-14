import axios, { AxiosRequestConfig } from "axios";
import ReviewCard from "components/ReviewCard";
import ReviewForm from "components/ReviewForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "types/movie";
import { Review } from "types/review";
import { hasAnyRoles } from "util/auth";
import { BASE_URL, requestBackend } from "util/requests";

import './styles.css';

type UrlParams = {
    movieId: string;
  };

  //reviews
const MovieDetails = () => {

    const [page, setPage] = useState<Review[]>([]); //recebe a lista de reviews obtida na requisição.
    const { movieId } = useParams<UrlParams>();

    const [movie, setMovie] = useState<Movie>();


        /* detalhes do filme */
        useEffect(() => {
          const params: AxiosRequestConfig = {
            url: `/movies/${movieId}`,
            withCredentials: true,
          };
    
          requestBackend(params).then((response) => {
              setMovie(response.data);
              console.log(response.data);
            });
    
      }, [movieId]);


    /* reviews do filme */
    useEffect(() => {
        const params: AxiosRequestConfig = {
          url: `/movies/${movieId}/reviews`,
          withCredentials: true,
          params: {
            page: 0,
            size: 12,
          },
        };

        requestBackend(params).then((response) => {
            setPage(response.data);
            console.log(response.data);
          });

    }, [movieId]);

      
    const handleInsertReview = (review: Review) => {
        const clone = [...page]; // copia o conteúdo que já tem
        clone.push(review); // insere o novo conteúdo naquele copiado
        setPage(clone); // define o conteúdo copiado
    };

        
    return (
        <div className="movie-details-page-container">
          <div className="base-card movie-details-card-container">
            <div className="movie-details-image-container">
              <img src={movie?.imgUrl} alt={movie?.title} />
            </div>

            <div className="movie-details-cotent-container">
                <h1>{movie?.title}</h1>
                <h2>{movie?.year}</h2>
                <p>{movie?.subTitle}</p>

                <h4>{movie?.synopsis}</h4>
            </div>
          </div>

          {hasAnyRoles(["ROLE_MEMBER"]) && ( // form de inserir avaliação SOMENTE PARA MEMBROS
            <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
          )}

          <div style={{backgroundColor: "#6C6C6C", paddingBottom: "28px", paddingTop: "5px", borderRadius: "4px"}}>
          {page?.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
          </div>
          
        </div>
      );
}

export default MovieDetails;