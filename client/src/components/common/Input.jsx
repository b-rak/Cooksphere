export function Input ({id, name, value, text, handleChange}) {
  return (
    <>
      <div className="flex flex-col w-96">
        <label htmlFor={id}>{text}</label>
        <input type="text" id={id} name={name} value={value} className="border" onChange={handleChange}/>
      </div>
    </>
  )
};