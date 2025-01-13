export function Instructions ({instructions}) {
  return (
    <>
      <div className='p-4 bg-[#c2c2c2] rounded-xl'>
        <h2 className='text-xl font-semibold font-roboto flex items-center gap-2'>Instructions
          <img src="/spoon.svg" alt="spoon-icon" className='w-5 h-5'/>
        </h2>
        <ol className='p-4 flex flex-col gap-4'>
          {instructions.map((instruction, index) => (
            <>
              <li key={index} className='p-2 rounded-md bg-[#FFF8E7]'>
                <div className='h-fit w-[3.75rem] text-center rounded-md bg-[#FFC857] text-[#4A2C2A] font-poppins uppercase text-sm'>{'Step ' + (index+1)}</div>
                {instruction}
              </li>
            </>
          ))}
        </ol>
      </div>
    </>
  )
}