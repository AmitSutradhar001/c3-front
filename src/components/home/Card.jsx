// Card.jsx
import starImg from "/home/star.svg";
import "../../css/components/home/Card.css";

const Card = ({ name = "", author, description, rating }) => {
  const roundedRating = rating ? Math.floor(Number(rating)) : 0;

  return (
    <>
      <div className="card-container">
        <div className="card-img-outer">
          <div className="card-img-inner" />
        </div>
        <div className="rating-outer">
          {rating && (
            <div className="card-rating">
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
          {name && <h2 className="card-name">{name}</h2>}
          <p className="card-description">
            {author ? `"${description}"` : description}
          </p>
          {author && <h2 className="card-author">{author}</h2>}
        </div>
      </div>
    </>
  );
};

export default Card;
