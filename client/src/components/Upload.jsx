import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import {
  getCategories,
  updateUploaded,
  uploadImage,
  uploadRecipe,
} from "../services/ApiClient";
import { getUser } from "../services/UserService";
import { Input } from "./common/Input";
import { FileUpload } from "./FileUpload";
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";

// ! General comment: i know this file is a mess, but tracking the form state and validation stressed me a lot.
export function Upload() {
  const { currentUser, setCurrentUser } = useAuthContext();

  const [numOfIngredients, setNumOfIngredients] = useState(1);
  const [numOfInstructions, setNumOfInstructions] = useState(1);
  const [formKey, setFormKey] = useState(0);

  // form data
  const initialState = {
    name: "",
    ingredients: {
      "ingredient-1": "",
      "measure-1": "",
    },
    instructions: { "instruction-1": "" },
    cookingTime: { hours: "", minutes: "" },
    category: "",
    tags: { "tag-1": "", "tag-2": "", "tag-3": "" },
    image: null,
  };
  const [formState, setFormState] = useState(initialState);

  // error state
  const initialErrorState = {
    name: false,
    ingredients: false,
    instructions: false,
    cookingTime: false,
    category: false,
    tags: false,
    image: false,
  };
  const [errorState, setErrorState] = useState(initialErrorState);
  const [uploadError, setUploadError] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.log(e));
  }, []);

  function addIngredient() {
    setNumOfIngredients((prev) => prev + 1);
    setFormState((prevState) => {
      const newIngredientNumber = numOfIngredients + 1;
      return {
        ...prevState,
        ingredients: {
          ...prevState.ingredients,
          ["ingredient-" + newIngredientNumber]: "",
          ["measure-" + newIngredientNumber]: "",
        },
      };
    });
  }

  function addInstruction() {
    setNumOfInstructions((prev) => prev + 1);
    setFormState((prevState) => {
      const newInstructionNumber = numOfInstructions + 1;
      return {
        ...prevState,
        instructions: {
          ...prevState.instructions,
          ["instruction-" + newInstructionNumber]: "",
        },
      };
    });
  }

  function handleChange(event) {
    const { name, value, type, files } = event.target;
    setFormState((prevState) => {
      const updatedState = { ...prevState };

      if (name.includes("ingredient") || name.includes("measure")) {
        updatedState.ingredients = { ...prevState.ingredients, [name]: value };
      } else if (name.includes("instruction")) {
        updatedState.instructions = {
          ...prevState.instructions,
          [name]: value,
        };
      } else if (name === "hours" || name === "minutes") {
        updatedState.cookingTime = {
          ...prevState.cookingTime,
          [name]: value,
        };
      } else if (name.includes("tag")) {
        updatedState.tags = {
          ...prevState.tags,
          [name]: value,
        };
      } else if (name === "image" && type === "file") {
        updatedState[name] = files[0];
      } else {
        updatedState[name] = value;
      }

      return updatedState;
    });
  }

  // ! ChatGPT generated: I needed help to upload images to cloudinary
  async function handleImageUpload(imageFile) {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "cooksphere");

    try {
      const response = await uploadImage(formData);
      return response.secure_url;
    } catch (e) {
      console.log(`Upload failed: ${e}`);
      return null;
    }
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!validateFormData()) return;

    const imageUrl = await handleImageUpload(formState.image);
    if (!imageUrl) {
      setUploadError(true);
      return;
    }
    setUploadError(false);
    const updatedFormState = {
      ...formState,
      image: imageUrl,
    };
    const formatted = formatFormData(updatedFormState);
    const recipe = await uploadRecipe(formatted);
    await updateUploaded(currentUser, recipe);
    const user = await getUser();
    setCurrentUser(user);
    setFormState(initialState);
    setNumOfIngredients(1);
    setNumOfInstructions(1);
    setFormKey((prevKey) => prevKey + 1);
  }

  function formatFormData(data) {
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

      if (ingredientValue && measureValue)
        formattedIngredients.push({
          ingredient: ingredientValue,
          measure: measureValue,
        });
    }

    const formattedTags = [
      data.tags["tag-1"],
      data.tags["tag-2"],
      data.tags["tag-3"],
    ].filter((elem) => elem.trim() !== "");
    const hours =
      data.cookingTime.hours !== "" ? parseInt(data.cookingTime.hours) : 0;
    const minutes =
      data.cookingTime.minutes !== "" ? parseInt(data.cookingTime.minutes) : 0;
    const formattedCookingTime = hours * 60 + minutes;
    return {
      ...data,
      instructions: formattedInstructions,
      ingredients: formattedIngredients,
      tags: formattedTags,
      cookingTimeInMinutes: formattedCookingTime,
    };
  }

  function validateFormData() {
    const newErrorState = {};
    for (const key of Object.keys(formState)) {
      if (key === "ingredients") {
        const ingredients = formState[key];
        newErrorState[key] = !Object.keys(ingredients).every(
          (ingKey) => ingredients[ingKey].trim() !== ""
        );
      } else if (key === "instructions") {
        const instructions = formState[key];
        newErrorState[key] = !Object.keys(instructions).every(
          (insKey) => instructions[insKey].trim() !== ""
        );
      } else if (key === "cookingTime") {
        newErrorState[key] =
          !formState[key]["hours"] && !formState[key]["minutes"];
      } else if (key === "tags") {
        const tags = formState[key];
        newErrorState[key] = Object.keys(tags).every(
          (tagKey) => tags[tagKey].trim() === ""
        );
      } else {
        newErrorState[key] = !formState[key];
      }
    }
    setErrorState(newErrorState);
    return !Object.values(newErrorState).includes(true);
  }

  return (
    <form
      key={formKey}
      onSubmit={handleUpload}
      className="flex flex-col gap-4"
      data-testid="upload-form"
    >
      <h2 className="text-2xl font-bold font-fira">Upload Recipe</h2>
      {/* name */}
      <div className="bg-brown rounded-md p-2 w-fit">
        <Input
          id="recipe-name"
          name="name"
          value={formState.name}
          text="Name:"
          error={errorState.name}
          handleChange={handleChange}
        />
      </div>
      {/* ingredients */}
      <div className="flex flex-col gap-4 bg-brown rounded-md p-2">
        {Array.from({ length: numOfIngredients }).map((elem, index) => (
          <Ingredient
            key={index}
            number={index + 1}
            values={formState.ingredients}
            handleChange={handleChange}
          />
        ))}
        <div>
          <button
            className="bg-orange text-white hover:bg-deeporange rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit"
            onClick={addIngredient}
            type="button"
          >
            Add ingredient
          </button>
          {errorState.ingredients && (
            <span className="text-error ml-4">
              There are empty ingredients/measures.
            </span>
          )}
        </div>
      </div>
      {/* instructions */}
      <div className="flex flex-col gap-4 bg-brown rounded-md p-2">
        {Array.from({ length: numOfInstructions }).map((elem, index) => (
          <Instruction
            key={index}
            number={index + 1}
            value={formState.instructions["instruction-" + (index + 1)]}
            handleChange={handleChange}
          />
        ))}
        <div>
          <button
            className="bg-orange text-white hover:bg-deeporange rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit"
            onClick={addInstruction}
            type="button"
          >
            Add instruction
          </button>
          {errorState.instructions && (
            <span className="text-error ml-4">There are empty steps.</span>
          )}
        </div>
      </div>
      {/* cooking time */}
      <div className="flex items-center gap-4 bg-brown rounded-md p-2">
        <span className="text-white w-32">Cooking time</span>
        <Input
          id="time-hours"
          name="hours"
          value={formState.cookingTime.hours}
          text="Hours:"
          handleChange={handleChange}
        />
        <Input
          id="time-minutes"
          name="minutes"
          value={formState.cookingTime.minutes}
          text="Minutes:"
          handleChange={handleChange}
        />
        {errorState.cookingTime && (
          <span className="text-error">Cooking time is required.</span>
        )}
      </div>
      {/* category */}
      <div className="bg-brown rounded-md p-2">
        <label htmlFor="category" className="text-white">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="px-2 py-2 rounded-lg ml-4 cursor-pointer bg-softyellow"
          onChange={handleChange}
          value={formState.category}
        >
          <option disabled hidden value="">
            -- Select a category --
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errorState.category && (
          <span className="text-error ml-4">Category is required.</span>
        )}
      </div>
      {/* tags */}
      <div className="bg-brown rounded-md p-2">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-white">Tags</span>
          <Input
            id="tag-1"
            name="tag-1"
            value={formState.tags["tag-1"]}
            text="Tag 1:"
            handleChange={handleChange}
          />
          <Input
            id="tag-2"
            name="tag-2"
            value={formState.tags["tag-2"]}
            text="Tag 2:"
            handleChange={handleChange}
          />
          <Input
            id="tag-3"
            name="tag-3"
            value={formState.tags["tag-3"]}
            text="Tag 3:"
            handleChange={handleChange}
          />
        </div>
        {errorState.tags && (
          <span className="text-error">At least one tag is required</span>
        )}
      </div>
      {/* image */}
      <FileUpload
        value={formState.image}
        error={errorState.image}
        handleChange={handleChange}
      />

      <button
        className="bg-orange text-white hover:bg-deeporange gap-2 rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit"
        type="submit"
        data-testid="btn-upload"
      >
        Upload
      </button>
      {uploadError && (
        <span className="text-error">
          There was an error uploading your image. Please try again!
        </span>
      )}
    </form>
  );
}
