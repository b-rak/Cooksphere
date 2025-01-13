import { StarSvg } from "./StarSvg"

export function Rating ({rating}) {
  function getPercentage (index) {
    if (index < Math.floor(rating)) {
      return 100;
    } else if (index > Math.floor(rating)) {
      return 0;
    } else {
      return(rating - Math.floor(rating))*100;
    }
  }
  return (
    <>
      <div className="flex">
        {Array(5).fill(0).map((elem, index) => {
          return <StarSvg key={index} percentage={getPercentage(index)} index={index}/>
        })}
      </div>
    </>
  )
};