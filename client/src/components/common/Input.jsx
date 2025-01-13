export function Input ({id, name, value, text, error, handleChange}) {
  return (
    <>
      <div className="flex flex-col w-96">
        <label htmlFor={id}>{text}</label>
        <input type="text" id={id} name={name} value={value} className="border" onChange={handleChange}/>
        {error &&
          <span className="text-red-600">{name[0].toUpperCase() + name.substring(1) + ' is required.'}</span>
        }
      </div>
    </>
  )
};