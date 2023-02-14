import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';

import './styles.css'

export type MovieFilterData = {
    genre : Genre | null;
}

type Props = {
    onSubmitFilter : (data: MovieFilterData) => void;
}

const MovieFilter = ( {onSubmitFilter} : Props) => {

    const { handleSubmit, control, setValue, getValues } = useForm<MovieFilterData>();

    const [selectGenres, setSelectGenres] = useState<Genre[]>();
    
    //trazer os gêneros pra povoar o combobox
    useEffect(() => {
        requestBackend({url: '/genres', withCredentials:true})
            .then(response => {
                setSelectGenres(response.data)
            })
    }, []);


    //enviar o form (fazer a busca filtrada)
    const onSubmit = (formData : MovieFilterData) => {
        onSubmitFilter(formData);
    };

    // enviar form cada vez que o gênero mudar (fazer a busca filtrada por curso)
    const handleChangeGenre = (value: Genre) => {
        setValue('genre', value);

        const obj : MovieFilterData = {
            genre: getValues('genre'), 
        };

        onSubmitFilter(obj);
    }

    return(
        <div className="base-card movie-filter-container">
            <form onSubmit={handleSubmit(onSubmit)} className='movie-filter-form'>

                <div className='movie-filter-bottom-container'>
                    
                    <div className='movie-filter-genre-container' style={{fontSize:"20px"}}>
                        <Controller 
                            name = 'genre'
                            control = {control}
                            render = {( {field} ) => (
                            <Select 
                                {...field}
                                options={selectGenres}
                                isClearable
                                classNamePrefix="genre-filter-select"
                                placeholder="Gênero"
                                getOptionLabel={(genre: Genre) => genre.name}
                                getOptionValue={(genre: Genre) => genre.id.toString()}

                                onChange={value => handleChangeGenre(value as Genre)}
                            />    
                            )}
                        />
                    </div>

                </div>
            </form>
        </div>
    );

    
}

export default MovieFilter;

