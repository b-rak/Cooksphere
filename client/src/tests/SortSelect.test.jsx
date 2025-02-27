import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SortSelect } from "../components/SortSelect.jsx";

describe("Filter Component", () => {
  const setSortingMock = jest.fn();
  function renderComponent() {
    render(<SortSelect sorting="" setSorting={setSortingMock} />);
  }

  it("should render the component", () => {
    renderComponent();
    const label = screen.getByText("Sort recipes by:");
    expect(label).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options[0].textContent).toEqual("A-Z");
    expect(options[1].textContent).toEqual("Z-A");
    expect(options[2].textContent).toEqual("Best recipes first");
    expect(options[3].textContent).toEqual("Worst recipes first");
  });

  it("should select the sort options", async () => {
    renderComponent();
    const options = ["A-Z", "Z-A", "Best recipes first", "Worst recipes first"];
    const selectElement = screen.getByRole("combobox");
    for (const option of options) {
      await userEvent.selectOptions(selectElement, option);
      expect(setSortingMock).toHaveBeenCalledWith(option);
    }
  });
});
