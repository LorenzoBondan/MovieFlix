import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
}

const Catalog = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();

    //manter o estado de todos os componentes que fazem a listagem
    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({activePage:0, filterData: { genre: null },});

    const handlePageChange = (pageNumber : number) => {
      setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData});
      //mantém o que está no filtro e muda só a página
    }

        // função do componente Filter
        const handleSubmitFilter = (data : MovieFilterData) => {
          setControlComponentsData({activePage: 0, filterData: data});
          // efetua o filtro e volta pra primeira página
        }

    const getMovies = useCallback(() => {
      const params : AxiosRequestConfig = {
        method:"GET",
        url: "/movies",
        withCredentials:true,
        params: {
          page: controlComponentsData.activePage,
          size: 4,

          genreId: controlComponentsData.filterData.genre?.id
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

        <div className='base-card movie-list-filter-container'>
          <MovieFilter onSubmitFilter={handleSubmitFilter}/>
        </div>

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

        <Pagination 
                pageCount={(page) ? page.totalPages : 0} 
                range={2}
                onChange={handlePageChange}
                forcePage={page?.number}
                />
      </div>
    </>
  );
};

export default Catalog;
