import { useState } from "react";
import { getTags } from "../utils/getTags";
import { Checkbox } from "./common/Checkbox";
import { Radiobutton } from "./common/Radiobutton";

export function Filter ({recipes, updateFilter}) {
  const initialFilterState = {tags: [], time: [], ratings: 'all'}
  const [filter, setFilter] = useState(initialFilterState);

  const tags = getTags(recipes);
  const tagElements = [];
  tags.forEach((tag, index) => {
    tagElements.push(<Checkbox key={index} id={'tag-' + tag} value={tag} text={tag} handleChange={handleChange}/>);
  })

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    let newFilterState;
    if (name.includes('tag')) {
      if (!event.target.checked) {
        newFilterState = {...filter, tags: filter['tags'].filter(tag => tag !== value)};
      } else {
        newFilterState = {...filter, tags: [...filter['tags'], value]};
      }
    } else if (name.includes('time')) {
      if (!event.target.checked) {
        newFilterState = {...filter, time: filter['time'].filter(time => time !== value)};
      } else {
        newFilterState = {...filter, time: [...filter['time'], value]};
      }
    } else if (name.includes('ratings')) {
      newFilterState = {...filter, ratings: value};
    }
    setFilter(newFilterState);
    updateFilter(newFilterState);
  }

  function resetFilter () {
    setFilter(initialFilterState);
    updateFilter(initialFilterState);
    const inputs = document.querySelectorAll('input[type="checkbox"]');
    inputs.forEach(input => input.checked = false);
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => input.checked = false);
  }
  return (
    <>
      <div className='w-1/4 mt-12 mb-4 mr-4 p-4  bg-brown rounded-lg flex flex-col gap-4'>
        <h3 className='text-xl font-semibold text-white'>Filters</h3>
        <button className="bg-orange text-white hover:bg-deeporange rounded-md px-2 py-1 uppercase text-sm w-fit mx-auto" onClick={resetFilter}>Reset filter</button>
        <div className="bg-lightbeige p-2 rounded-md">
          <h4 className='text-lg font-medium'>Tags</h4>
          <ul className='flex flex-col'>
            {tagElements}
          </ul>
        </div>

        <div className="bg-lightbeige p-2 rounded-md">
          <h4 className='text-lg font-medium'>Duration</h4>
          <ul className='flex flex-col'>
            <Checkbox id='time-quick' value='quick' text='Quick (Under 30 Minutes)' handleChange={handleChange}/>
            <Checkbox id='time-moderate' value='moderate' text='Moderate (30-60 Minutes)' handleChange={handleChange}/>
            <Checkbox id='time-intensive' value='intensive' text='Time-Intensive (Over 60 Minutes)' handleChange={handleChange}/>
          </ul>
        </div>

        <div className="bg-lightbeige p-2 rounded-md">
          <h4 className='text-lg font-medium'>Rating</h4>
          <fieldset>
            <Radiobutton id='ratings-all' name='ratings' value='all' text='All recipes' handleChange={handleChange}/>
            <Radiobutton id='ratings-1' name='ratings' value='1' text='1 Star or more' handleChange={handleChange}/>
            <Radiobutton id='ratings-2' name='ratings' value='2' text='2 Stars or more' handleChange={handleChange}/>
            <Radiobutton id='ratings-3' name='ratings' value='3' text='3 Stars or more' handleChange={handleChange}/>
            <Radiobutton id='ratings-4' name='ratings' value='4' text='4 Stars or more' handleChange={handleChange}/>
          </fieldset>
        </div>
      </div>
    </>
  )
}