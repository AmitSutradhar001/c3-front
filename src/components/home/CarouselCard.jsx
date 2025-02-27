// Card.jsx
import starImg from "/home/star.svg";
import "../../css/components/home/CarouselCard.css";

const CarouselCard = ({ name = "", author, description, rating }) => {
  const roundedRating = rating ? Math.floor(Number(rating)) : 0;

  return (
    <>
      <div className="ccard-container">
        <div className="ccard-img-outer">
          <div className="ccard-img-inner" />
        </div>
        <div className="crating-outer">
          {rating && (
            <div className="ccard-rating">
              {Array.from({ length: roundedRating }).map((_, index) => (
                <img
                  key={index}
                  src={starImg}
                  alt="star img"
                  className="card-img"
                />
              ))}
              <p>{rating}</p>
            </div>
          )}
          {name && <h2 className="ccard-name">{name}</h2>}
          <p className="ccard-description">
            {author ? `"${description}"` : description}
          </p>
          {author && <h2 className="ccard-author">{author}</h2>}
        </div>
      </div>
    </>
  );
};

export default CarouselCard;
