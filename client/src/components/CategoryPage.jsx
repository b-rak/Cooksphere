import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getRecipes } from '../ApiClient';
import { RecipeResults } from './RecipeResults';
import { Checkbox } from './common/Checkbox';
import { Radiobutton } from './common/Radiobutton';

export function CategoryPage () {
  const { category } = useParams();
  const url = `/categories/${category.toLowerCase()}.jpg`;

  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({tags: [], time: [], ratings: 'all'});
  const [sorting, setSorting] = useState('');

  useEffect(() => {
    getRecipes(category)
    .then(data => {
      setRecipes(data);
      setFiltered(data);
    })
    .catch(e => console.log(e));
  }, []);

  const tags = new Set();
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      tags.add(tag);
    });
  });
  const tagElements = [];
  tags.forEach(tag => {
    tagElements.push(<Checkbox id={'tag-' + tag} value={tag} text={tag} handleChange={handleChange}/>);
  })

  function handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name.includes('tag')) {
      if (!event.target.checked) {
        setFilter(prevFilter => ({...prevFilter, tags: prevFilter['tags'].filter(tag => tag !== value)}));
      } else {
        setFilter(prevFilter => ({...prevFilter, tags: [...prevFilter['tags'], value]}));
      }
    } else if (name.includes('time')) {
      if (!event.target.checked) {
        setFilter(prevFilter => ({...prevFilter, time: prevFilter['time'].filter(time => time !== value)}));
      } else {
        setFilter(prevFilter => ({...prevFilter, time: [...prevFilter['time'], value]}));
      }
    } else if (name.includes('ratings')) {
      setFilter(prevFilter => ({...prevFilter, ratings: value}));
    }
  }

  function resetFilter () {
    setFilter({tags: [], time: [], ratings: 'all'});
    const inputs = document.querySelectorAll('input[type="checkbox"]');
    inputs.forEach(input => input.checked = false);
  }

  useEffect(() => {
    let filteredRecipes;
    // ratings
    const ratings = filter.ratings;
    if (ratings === 'all') {
      filteredRecipes = recipes;
    } else {
      filteredRecipes = recipes.filter(recipe => recipe.rating >= parseInt(ratings));
    }

    // tags
    const tags = filter.tags;
    if (tags.length > 0) {
      filteredRecipes = filteredRecipes.filter(filteredRecipe => {
        for (const tag of filteredRecipe.tags) {
          if (tags.includes(tag)) {
            return true;
          }
        }
        return false;
      });
    }

    // duration
    const duration = filter.time;
    if (duration.length > 0) {
      let quickRecipes = [];
      let moderateRecipes = [];
      let intensiveRecipes = [];
      if (duration.includes('quick')) {
        quickRecipes = filteredRecipes.filter(filteredRecipe => filteredRecipe.cookingTimeInMinutes < 30);
      }
      if (duration.includes('moderate')) {
        moderateRecipes = filteredRecipes.filter(filteredRecipe => filteredRecipe.cookingTimeInMinutes >= 30 && filteredRecipe.cookingTimeInMinutes <= 60);
      }
      if (duration.includes('intensive')) {
        intensiveRecipes = filteredRecipes.filter(filteredRecipe => filteredRecipe.cookingTimeInMinutes > 60);
      }
      filteredRecipes = [...quickRecipes, ...moderateRecipes, ...intensiveRecipes];
    }

    setFiltered(filteredRecipes)
    sort();
  }, [filter]);

  function handleSelect (event) {
    setSorting(event.target.value);
  }

  useEffect(() => sort(), [sorting]);

  function sort () {
    if (sorting === 'A-Z') {
      setFiltered(prevFiltered => [...prevFiltered].sort((a, b) => a.name>b.name ? 1 : -1));
    } else if (sorting === 'Z-A') {
      setFiltered(prevFiltered => [...prevFiltered].sort((a, b) => a.name<b.name ? 1 : -1));
    } else if (sorting.includes('Best')) {

    } else if (sorting.includes('Worst')) {

    }
  }

  return (
    <>
    <div className='flex'>
      <div className='w-1/4 px-12 pt-12'>
        <h3 className='text-xl font-semibold'>Filters</h3>
        <button className='px-4 py-2 bg-slate-300 rounded-lg' onClick={resetFilter}>Reset filter</button>
        <div>
          <h4 className='text-lg font-medium'>Tags</h4>
          <ul className='flex flex-col'>
            {tagElements}
          </ul>
        </div>

        <div>
          <h4 className='text-lg font-medium'>Duration</h4>
          <ul className='flex flex-col'>
            <Checkbox id='time-quick' value='quick' text='Quick (Under 30 Minutes)' handleChange={handleChange}/>
            <Checkbox id='time-moderate' value='moderate' text='Moderate (30-60 Minutes)' handleChange={handleChange}/>
            <Checkbox id='time-intensive' value='intensive' text='Time-Intensive (Over 60 Minutes)' handleChange={handleChange}/>
          </ul>
        </div>

        <div>
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

      <div className='w-3/4'>
        <div className='h-80 w-full relative'>
          <div className='h-80 bg-cover bg-[50%_45%] bg-no-repeat opacity-75' style={{ backgroundImage: `url(${url})` }}></div>
          <h3 className='absolute top-8 left-4 text-5xl font-bold'>{category + ' Recipes'}</h3>
        </div>
        <div className='px-2 py-4 bg-orange-200'>
          <div className='mb-4'>
            <label htmlFor="sort" className='text-lg'>Sort recipes by:</label>
            <select name="sort" id="sort" className='px-4 py-2 rounded-lg ml-4' onChange={(event) => handleSelect(event)}>
              <option disabled selected value hidden>-- Select an option --</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="Best recipes first">Best recipes first</option>
              <option value="Worst recipes first">Worst recipes first</option>
            </select>
          </div>
          <RecipeResults recipes={filtered}/>
        </div>
      </div>
    </div>
    </>
  );
};