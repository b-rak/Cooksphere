import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Upload } from "../components/Upload.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { updateUploaded, uploadImage } from "../services/ApiClient.js";
import recipe from "./mocks/recipe.js";
import user from "./mocks/user.js";

jest.mock("../config/config.js", () => ({
  config: {
    CLOUDINARY_IMAGE_URL:
      "https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856",
    SERVER_URL: "http://localhost:3000",
  },
}));

jest.mock("../services/ApiClient.js", () => {
  const categories = require("./mocks/categories.js").default;
  const recipe = require("./mocks/recipe.js").default;
  return {
    getCategories: async () => categories,
    uploadImage: jest.fn(),
    uploadRecipe: async () => recipe,
    updateUploaded: jest.fn(),
  };
});

jest.mock("../services/UserService.js", () => {
  const user = require("./mocks/user.js").default;
  return {
    getUser: async () => user,
  };
});

describe("Upload Component", () => {
  function renderComponent() {
    render(
      <AuthContext.Provider
        value={{
          currentUser: user,
          setCurrentUser: jest.fn(),
        }}
      >
        <Upload />
      </AuthContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", () => {
    renderComponent();
    const headings = screen.getAllByRole("heading");
    expect(headings[0]).toBeInTheDocument();
    expect(headings[0].textContent).toEqual("Upload Recipe");
  });

  const errorMessages = [
    "Name is required.",
    "There are empty ingredients/measures.",
    "There are empty steps.",
    "Cooking time is required.",
    "Category is required.",
    "At least one tag is required",
    "Please select an image.",
  ];

  it("should display error messages", async () => {
    renderComponent();

    const btnUpload = screen.getByTestId("btn-upload");
    await userEvent.click(btnUpload);

    for (const errorMessage of errorMessages) {
      const msgError = screen.getByText(errorMessage);
      expect(msgError).toBeInTheDocument();
    }
  });

  it("should show an error on image upload fail", async () => {
    renderComponent();
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], recipe.name);
    await userEvent.type(inputs[1], recipe.ingredients[0].ingredient);
    await userEvent.type(inputs[2], recipe.ingredients[0].measure);
    await userEvent.type(inputs[3], recipe.instructions["instruction-1"]);
    await userEvent.type(
      inputs[4],
      Math.floor(recipe.cookingTimeInMinutes / 60) + ""
    );
    await userEvent.type(inputs[5], (recipe.cookingTimeInMinutes % 60) + "");
    await userEvent.type(inputs[6], recipe.tags[0]);
    await userEvent.type(inputs[7], recipe.tags[1]);
    await userEvent.type(inputs[8], recipe.tags[2]);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "Dessert");
    expect(select.value).toBe("Dessert");

    const fileInput = screen.getByTestId("image-upload");
    const mockFile = new File(["image-content"], "test-image.png", {
      type: "image/png",
    });
    await userEvent.upload(fileInput, mockFile);

    uploadImage.mockRejectedValueOnce(new Error("Upload failed"));
    const btnUpload = screen.getByTestId("btn-upload");
    await userEvent.click(btnUpload);

    expect(uploadImage).toHaveBeenCalledTimes(1);
    const expectedFormData = new FormData();
    expectedFormData.append("file", mockFile);

    const actualFormData = uploadImage.mock.calls[0][0];

    expect(actualFormData.has("file")).toBe(true);
    expect(actualFormData.get("file").name).toBe(mockFile.name);

    expect(
      screen.getByText(
        "There was an error uploading your image. Please try again!"
      )
    ).toBeInTheDocument();
  });

  it("should upload the recipe", async () => {
    renderComponent();
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], recipe.name);
    await userEvent.type(inputs[1], recipe.ingredients[0].ingredient);
    await userEvent.type(inputs[2], recipe.ingredients[0].measure);
    await userEvent.type(inputs[3], recipe.instructions["instruction-1"]);
    await userEvent.type(
      inputs[4],
      Math.floor(recipe.cookingTimeInMinutes / 60) + ""
    );
    await userEvent.type(inputs[5], (recipe.cookingTimeInMinutes % 60) + "");
    await userEvent.type(inputs[6], recipe.tags[0]);
    await userEvent.type(inputs[7], recipe.tags[1]);
    await userEvent.type(inputs[8], recipe.tags[2]);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "Dessert");
    expect(select.value).toBe("Dessert");

    const fileInput = screen.getByTestId("image-upload");
    const mockFile = new File(["image-content"], "test-image.png", {
      type: "image/png",
    });
    await userEvent.upload(fileInput, mockFile);

    uploadImage.mockResolvedValueOnce({ secure_url: recipe.image });
    updateUploaded.mockImplementation(async (currentUser, newRecipe) => {
      currentUser.uploadedRecipes.push(newRecipe);
    });

    const btnUpload = screen.getByTestId("btn-upload");
    await userEvent.click(btnUpload);

    expect(uploadImage).toHaveBeenCalledTimes(1);
    expect(updateUploaded).toHaveBeenCalledTimes(1);
    expect(user.uploadedRecipes).toContainEqual(
      expect.objectContaining({
        name: recipe.name,
        category: recipe.category,
        cookingTimeInMinutes: recipe.cookingTimeInMinutes,
        image: recipe.image,
      })
    );
  });
});
