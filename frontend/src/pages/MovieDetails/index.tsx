import { AxiosRequestConfig } from "axios";
import ReviewCard from "components/ReviewCard";
import ReviewForm from "components/ReviewForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "types/review";
import { hasAnyRoles } from "util/auth";
import { requestBackend } from "util/requests";

type UrlParams = {
    movieId: string;
  };

  //reviews
const MovieDetails = () => {

    const [page, setPage] = useState<Review[]>([]); //recebe a lista de reviews obtida na requisição.
    const { movieId } = useParams<UrlParams>();


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
        <div className="page-container">
          <h1>Tela de listagem de filmes id: {movieId}</h1>

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