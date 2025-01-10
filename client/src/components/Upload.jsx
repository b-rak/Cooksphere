import { useState } from "react";
import { Ingredient } from "./Ingredient";
import { Input } from "./common/Input";
import { Instruction } from "./Instruction";
import { uploadRecipe } from "../ApiClient";

export function Upload () {
const [numOfIngredients, setNumOfIngredients] = useState(1);
const [numOfInstructions, setNumOfInstructions] = useState(1);
const [formKey, setFormKey] = useState(0);

// form data
const initialState = {
  name: '',
  ingredients: {
    'ingredient-1': '',
    'measure-1': ''
  },
  instructions: {'instruction-1': ''},
  cookingTime: {hours: '', minutes: ''},
  category: '',
  tags: {'tag-1': '', 'tag-2': '', 'tag-3': ''},
  image: ''
}

const [formState, setFormState] = useState(initialState);

function addIngredient () {
  setNumOfIngredients((prev) => prev+1);
  setFormState(prevState => {
    const newIngredientNumber = numOfIngredients + 1;
    return {
      ...prevState,
      ingredients: {...prevState.ingredients,
        ['ingredient-'+newIngredientNumber]: '',
        ['measure-'+newIngredientNumber]: ''
      }
    }
  });
}

function addInstruction () {
  setNumOfInstructions((prev) => prev+1);
  setFormState(prevState => {
    const newInstructionNumber = numOfInstructions + 1;
    return {
      ...prevState,
      instructions: {...prevState.instructions,
        ['instruction-'+newInstructionNumber]: '',
      }
    }
  });
}

function handleChange (event) {
  const {name, value} = event.target;
  setFormState(prevState => {

    if (name.includes('ingredient') || name.includes('measure')) {
      return {
        ...prevState,
        ingredients: {...prevState.ingredients,
          [name]: value
        }
      }
    } else if (name.includes('instruction')) {
      return {
        ...prevState,
        instructions: {...prevState.instructions,
          [name]: value
        }
      }
    } else if (name === 'hours' || name === 'minutes') {
      return {
        ...prevState,
        cookingTime: {
          ...prevState.cookingTime,
          [name]: value
        }
      }
    } else if (name.includes('tag')) {
      return {
        ...prevState,
        tags: {
          ...prevState.tags,
          [name]: value
        }
      }
    }

    return {
      ...prevState,
      [name]: value
    };
  });
}

async function handleUpload (event) {
  event.preventDefault();
  console.log("UPLOAD!");
  const formatted = formatFormData(formState);
  console.log("FORMATTED", formatted);
  const response = await uploadRecipe(formatted);
  console.log("RESPONSE DATA", response);
  setFormState(initialState);
  setNumOfIngredients(1)
  setNumOfInstructions(1)
  setFormKey(prevKey => prevKey + 1);
}

function formatFormData (data) {
  const formattedInstructions = [];
  const instructions = data.instructions;
  for (let i = 1; instructions[`instruction-${i}`] !== undefined; i++) {
    const instructionKey = `instruction-${i}`;
    const instructionValue = instructions[instructionKey].trim();
    if (instructionValue) formattedInstructions.push(instructionValue);
  }

  const formattedIngredients = [];
  const ingredients = data.ingredients;
  for (let i = 1; ingredients[`ingredient-${i}`] !== undefined; i++) {
    const ingredientKey = `ingredient-${i}`;
    const measureKey = `measure-${i}`;

    const ingredientValue = ingredients[ingredientKey].trim();
    const measureValue = ingredients[measureKey].trim();

    if (ingredientValue && measureValue) formattedIngredients.push({
      ingredient: ingredientValue,
      measure: measureValue
    });
  }

  const formattedTags = [data.tags['tag-1'], data.tags['tag-2'], data.tags['tag-3']].filter(elem => elem.trim() !== '');
  const hours = data.cookingTime.hours !== '' ? parseInt(data.cookingTime.hours) : 0;
  const minutes = data.cookingTime.minutes !== '' ? parseInt(data.cookingTime.minutes) : 0;
  const formattedCookingTime = hours * 60 + minutes;
  return {
    ...data,
    instructions: formattedInstructions,
    ingredients: formattedIngredients,
    tags: formattedTags,
    cookingTimeInMinutes: formattedCookingTime,
    image: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg'
  }
}
  return (
    <>
      <div className="px-8 py-4 ml-[20%] border border-orange-200 w-[40rem] flex flex-col gap-4">
        <form key={formKey} onSubmit={handleUpload}>
          <h2>Upload Recipe</h2>
          {/* name */}
          <Input id="recipe-name" name="name" value={formState.name} text="Name:" handleChange={handleChange}/>
          {/* ingredients */}
          <div className="flex flex-col gap-4">
            {Array.from({length: numOfIngredients}).map((elem, index) => (
              <Ingredient key={index} number={index + 1} values={formState.ingredients} handleChange={handleChange}/>
            ))}
            <button
              className="px-4 py-2 w-fit border border-solid border-orange-200 bg-orange-200 text-teal-900 rounded-lg cursor-pointer shadow-md"
              onClick={addIngredient}
              type="button"
            >Add ingredient</button>
          </div>
          {/* instructions */}
          <div className="flex flex-col gap-4">
            {Array.from({length: numOfInstructions}).map((elem, index) => (
              <>
                <Instruction number={index + 1} value={formState.ingredients['ingredient-'+(index+1)]} handleChange={handleChange}/>
              </>
            ))}
            <button
              className="px-4 py-2 w-fit border border-solid border-orange-200 bg-orange-200 text-teal-900 rounded-lg cursor-pointer shadow-md"
              onClick={addInstruction}
              type="button"
            >Add instruction</button>
          </div>
          {/* cooking time */}
          <div className="flex items-center gap-4">
            <span>Cooking time</span>
            <Input id="time-hours" name="hours" value={formState.cookingTime.hours} text="Hours:" handleChange={handleChange}/>
            <Input id="time-minutes" name="minutes" value={formState.cookingTime.minutes} text="Minutes:" handleChange={handleChange}/>
          </div>
          {/* category */}
          <div>
            <label for="category">Category</label>
            <select name="category" id="category" className='px-4 py-2 rounded-lg ml-4' onChange={handleChange}>
              <option disabled selected value hidden>-- Select a category --</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Pasta">Pasta</option>
              <option value="Dessert">Dessert</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
          {/* tags */}
          <div className="flex items-center gap-4">
            <span>Tags</span>
            <Input id="tag-1" name="tag-1" value={formState.tags.tag1} text="Tag 1:" handleChange={handleChange}/>
            <Input id="tag-2" name="tag-2" value={formState.tags.tag2} text="Tag 2:" handleChange={handleChange}/>
            <Input id="tag-3" name="tag-3" value={formState.tags.tag3} text="Tag 3:" handleChange={handleChange}/>
          </div>
          {/* image */}
          <div>
            <span>Image</span>
            <input type="file" id="recipe-image" name="recipe-image" accept="image/png, image/jpeg" className="ml-4"/>
          </div>

          <button
              className="px-4 py-2 w-fit border border-solid border-orange-200 bg-orange-200 text-teal-900 rounded-lg cursor-pointer shadow-md"
              type="submit"

            >Upload</button>
        </form>
      </div>
    </>
  );
};