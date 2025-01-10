export function Radiobutton ({id, name, value, text, handleChange}) {
  return (
    <>
      <div>
          <input type="radio" id={id} name={name} value={value} onChange={(event) => handleChange(event)}/>
          <label for={id} className='ml-2'>{text}</label>
      </div>
    </>
  );
};