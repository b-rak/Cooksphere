import React, { useEffect, useState } from "react";
import { StarSvg } from "./StarSvg";

export function Rating({ rating, type, setRating }) {
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [selectedStar, setSelectedStar] = useState(rating);

  useEffect(() => setSelectedStar(rating), [rating]);
  function getPercentage(index) {
    if (index < Math.floor(rating)) {
      return 100;
    } else if (index > Math.floor(rating)) {
      return 0;
    } else {
      return (rating - Math.floor(rating)) * 100;
    }
  }

  function handleChange(newRating) {
    setSelectedStar(newRating);
    setRating(newRating);
  }

  return (
    <>
      {type === "rate" ? (
        <div className="flex">
          {/* i got this dynamic star rating from this blog post: https://dev.to/kartikbudhraja/creating-a-dynamic-star-rating-system-in-react-2c8 */}
          {Array(5)
            .fill(0)
            .map((elem, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    className="hidden"
                    value={currentRating}
                    onChange={() => handleChange(currentRating)}
                  />
                  <span
                    className="w-8 h-8 text-3xl hover:text-softyellow"
                    style={{
                      color:
                        currentRating <= (hoveredStar || selectedStar)
                          ? "#ffc107"
                          : "#e4e5e9",
                    }}
                    onMouseEnter={() => setHoveredStar(currentRating)}
                    onMouseLeave={() => setHoveredStar(null)}
                  >
                    ★
                  </span>
                </label>
              );
            })}
        </div>
      ) : (
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((elem, index) => {
              return (
                <StarSvg
                  key={index}
                  percentage={getPercentage(index)}
                  index={index}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
