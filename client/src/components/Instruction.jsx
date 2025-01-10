export function Instruction ({number, value, handleChange}) {

  return (
    <>
      <div className="flex flex-col">
        <label for={'instruction-' + number}>{'Step ' + number}</label>
        <textarea id={'instruction-' + number} name={'instruction-' + number} rows="3" className="border" onChange={handleChange}>
        </textarea>
      </div>
    </>
  );
};