export function Checkbox ({id, value, text, handleChange}) {
  return (
    <>
      <div>
        <input type="checkbox" id={id} name={id} value={value} onChange={(event) => handleChange(event)} />
        <label htmlFor={id} className='ml-2'>{text}</label>
      </div>
    </>
  );
};
