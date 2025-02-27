import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Filter } from "../components/Filter.jsx";
import recipes from "./mocks/recipes.js";

describe("Filter Component", () => {
  const setUpdateFilterMock = jest.fn();
  function renderComponent() {
    render(<Filter recipes={recipes} updateFilter={setUpdateFilterMock} />);
  }

  it("should render the component", () => {
    renderComponent();
    const headings = screen.getAllByRole("heading");
    expect(headings[0].textContent).toEqual("Filters");
    expect(headings[1].textContent).toEqual("Tags");
    expect(headings[2].textContent).toEqual("Duration");
    expect(headings[3].textContent).toEqual("Rating");
    const btnReset = screen.getByRole("button");
    expect(btnReset).toBeInTheDocument();
    expect(btnReset.textContent).toEqual("Reset filter");
  });

  it("should select filters", async () => {
    renderComponent();
    const tag1 = screen.getByText("tag1");
    const tag2 = screen.getByText("tag2");
    await userEvent.click(tag1);
    await userEvent.click(tag2);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag1"],
      time: [],
      ratings: "all",
    });
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag1", "tag2"],
      time: [],
      ratings: "all",
    });
    const moderateDuration = screen.getByText("Moderate (30-60 Minutes)");
    await userEvent.click(moderateDuration);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag1", "tag2"],
      time: ["moderate"],
      ratings: "all",
    });
    const threeStars = screen.getByLabelText("3 Stars or more");
    await userEvent.click(threeStars);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag1", "tag2"],
      time: ["moderate"],
      ratings: "3",
    });

    // deselect again
    await userEvent.click(tag2);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag1"],
      time: ["moderate"],
      ratings: "3",
    });
    await userEvent.click(moderateDuration);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag1"],
      time: [],
      ratings: "3",
    });
  });

  it("should reset the filters", async () => {
    renderComponent();
    const tag3 = screen.getByText("tag3");
    await userEvent.click(tag3);
    const quickDuration = screen.getByText("Quick (Under 30 Minutes)");
    await userEvent.click(quickDuration);
    const twoStars = screen.getByLabelText("2 Stars or more");
    await userEvent.click(twoStars);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: ["tag3"],
      time: ["quick"],
      ratings: "2",
    });
    const btnReset = screen.getByRole("button");
    await userEvent.click(btnReset);
    expect(setUpdateFilterMock).toHaveBeenCalledWith({
      tags: [],
      time: [],
      ratings: "all",
    });
  });
});
