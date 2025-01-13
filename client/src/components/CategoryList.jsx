import { Link } from "react-router"

export function CategoryList ({title, listItems}) {
  return (
    <>
      <h2 className='text-2xl font-bold mb-2'>{title}</h2>
        <div className='flex gap-4 overflow-x-scroll scrollbar-none'>
          {listItems.map(listItem => (
            <>
              <Link to={'/recipes/category/' + listItem.name} key={listItem._id}>
                <div key={listItem._id} className='min-w-56 cursor-pointer'>
                  <img src={listItem.image} alt={listItem.name} className='w-56 h-56 rounded-lg'/>
                  <span className='text-lg'>{listItem.name}</span>
                </div>
              </Link>
            </>)
          )}
        </div>
    </>
  );
};