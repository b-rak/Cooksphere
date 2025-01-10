import { useParams } from 'react-router';

export function Recipe () {
  const { recipeId } = useParams();
  return (
    <>
        <h1>{'RECIPE ' + recipeId}</h1>
    </>
  );
};