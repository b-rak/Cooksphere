export function Ingredients ({ingredients}) {
  return (
    <>
      <div className='p-4 bg-[#c2c2c2] rounded-xl'>
          <h2 className='text-xl font-semibold font-roboto flex items-center gap-2'>Ingredients
            <img src="/list.svg" alt="list-icon" className='w-6 h-6'/>
          </h2>
          <ul className='pl-4'>
            {ingredients.map((ingredient, index) => {
              return <li key={index} className={(index>0 ? 'border-t border-t-solid' : '') + ' flex gap-2'}>
                      <div className='w-[40%] text-right'>{ingredient.measure}</div>
                      <div className='w-[60%]'>{ingredient.ingredient}</div>
                    </li>
            })}
          </ul>
        </div>
    </>
  )
}