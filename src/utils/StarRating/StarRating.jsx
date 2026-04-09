import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // full star
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      // empty star
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
