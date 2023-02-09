import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import "./styles.css";
import { requestBackend } from "util/requests";
import { Review } from "types/review";

type FormData = {
  text: string;
  movieId: number;
};

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void; // metodo para inserir sem atualizar a página
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/reviews",
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue("text", "");
        onInsertReview(response.data);
      })
      .catch((error) => {
        console.log("Erro ao salvar!", error);
      });
  };

  return (
    <div className="review-submit-card">

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          {...register("text", {
            required: "Campo obrigatório,",
          })}
          id="input-review"
          type="text"
          placeholder="Deixe sua avaliação aqui"
          name="text"
        />
        <div style={{display: "flex", justifyContent: "center"}}>

        <button>SALVAR AVALIAÇÃO</button>
        
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;