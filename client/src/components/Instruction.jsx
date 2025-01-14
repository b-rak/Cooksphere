export function Instruction ({number, handleChange}) {

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={'instruction-' + number} className="text-white leading-4 text-sm">{'Step ' + number}</label>
        <textarea id={'instruction-' + number} name={'instruction-' + number} rows="3" className="outline-none rounded-md px-1" onChange={handleChange}>
        </textarea>
      </div>
    </>
  );
};