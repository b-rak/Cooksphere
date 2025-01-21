import { Link } from "react-router"

export function CategoryList ({title, listItems}) {
  return (
    <>
    <div className="px-8 py-4 bg-brown rounded-lg">
      <h2 className='text-2xl font-bold mb-2 text-white'>{title}</h2>
        <div className='flex gap-4 overflow-x-scroll scrollbar-none'>
          {listItems.map(listItem => (

              <Link to={'/recipes/category/' + listItem.name} key={listItem._id}>
                <div  className='min-w-56 cursor-pointer bg-lightbeige rounded-lg shadow_2 p-1'>
                  <img src={listItem.image} alt={listItem.name} className='w-56 h-56 rounded-lg'/>
                  <span data-testid={`listItem-${listItem._id}`} className='text-lg px-2'>{listItem.name}</span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};