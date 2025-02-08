import React, { FormEvent, useState, useContext } from "react";
import { Rating } from "../Rating";
import { AuthContex } from "../../context/AuthContext";
import { rateAndReview } from "../../ApiClient";
import { useParams } from "react-router";
import { Checkbox } from "../common/Checkbox";
import { NewReview, ReviewsProps } from "../../types";

export function Reviews({ reviews }: ReviewsProps) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const currentUser = useContext(AuthContex);

  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [onlyRating, setOnlyRating] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.checked;
    setOnlyRating(newVal);
  };

  function formatDate(timestamp: string) {
    const date = timestamp.split("T")[0];
    return date.split("-").reverse().join(".");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentUser) return;

    const newReview: NewReview = {
      // author: `${currentUser.firstname} ${currentUser.lastname}`,
      recipeId: recipeId as string,
      message: review,
      rating: rating,
      // timestamp: (new Date()).toISOString()
    };
    await rateAndReview(recipeId, newReview);
    setReview("");
    setRating(0);
    setOnlyRating(false);
  }

  function validate() {
    if (onlyRating && rating === 0) return true;
    else if (!onlyRating && (rating === 0 || review.trim() === "")) return true;
    return false;
  }

  return (
    <>
      <div className="p-4 rounded-xl md:col-span-2 bg-brown shadow_2">
        <h2 className="text-xl font-semibold font-roboto px-4 text-white">
          Reviews
        </h2>
        <form
          className="m-4 py-2 px-20 rounded-md bg-lightbeige flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <span>
            Here you can rate the recipe and give feedback to the creator and
            other users. You can also rate the recipe without writing a review.
          </span>
          <Rating rating={rating} type="rate" setRating={setRating} />
          <Checkbox
            id="rating-only"
            value={onlyRating}
            text="Select to give only rating without a review"
            handleChange={handleChange}
          />
          <textarea
            name="user-review"
            id="user-review"
            value={review}
            rows={4}
            onChange={(event) => setReview(event.target.value)}
            className={
              (onlyRating ? "hidden" : "block") +
              " outline-none rounded-md px-1"
            }
          ></textarea>
          <button
            type="submit"
            className="bg-orange text-white hover:bg-deeporange disabled:bg-deeporange rounded-md px-2 py-1 uppercase text-sm w-fit"
            disabled={validate()}
          >
            {!onlyRating ? "Post review" : "Rate without Review"}
          </button>
        </form>
        <div className="flex flex-col gap-4 p-4">
          {reviews.map((review, index) => {
            return (
              <>
                <div key={index} className="py-2 rounded-md bg-lightbeige">
                  <div className="flex justify-between px-4">
                    <span className="font-semibold">{review.author}</span>
                    <span>{formatDate(review.timestamp)}</span>
                  </div>
                  <span className="px-8">{review.message}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
