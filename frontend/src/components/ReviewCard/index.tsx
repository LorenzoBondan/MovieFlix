import CardStar from "assets/images/review-star.png";
import { Review } from "types/review";
import "./styles.css";

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  return (

      <div className="review-movie-list-container">

        <div className="review-card">

          <div className="review-details">
              
              <div className="reviewer-name">
                <img src={CardStar} width="13" height="15.5" alt="cardstar" />
                <h4>{review.user.name}</h4>
              </div>
              
              <div className="review-details-box">
                <h4>{review.text}</h4>
              </div>

          </div>
        </div>
      </div>

  );
};
export default ReviewCard;
