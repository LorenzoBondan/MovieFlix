import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  //filterData: StudentFilterData;
}

const Catalog = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();

    //manter o estado de todos os componentes que fazem a listagem
    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({activePage:0,});

    const handlePageChange = (pageNumber : number) => {
      //setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData});
      //mantém o que está no filtro e muda só a página
    }

    const getMovies = useCallback(() => {
      const params : AxiosRequestConfig = {
        method:"GET",
        url: "/movies",
        withCredentials:true,
        params: {
          page: controlComponentsData.activePage,
          size: 50,

          //name: controlComponentsData.filterData.name,
          //courseId: controlComponentsData.filterData.course?.id
        },
      }
  
      requestBackend(params) // função criada no requests.ts
        .then(response => {
          setPage(response.data);
          window.scrollTo(0, 0);
        })
    }, [controlComponentsData])


    useEffect(() => {
      getMovies();
    }, [getMovies]);

  return (
    <>
      <div className="movie-list-container">

        <div className="list-container">
          <>

          <div className='row'>
            {page?.content.map(movie => (
              <div className="col-sm-6 col-xl-3 movie-column" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie}/>
                </Link>
              </div>
            ))}
          </div>

          
        </>
        </div>
      </div>
    </>
  );
};

export default Catalog;
