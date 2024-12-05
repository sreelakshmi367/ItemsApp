import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddItem from "./AddItem";

describe("AddItem Component", () => {
  it("renders the input fields and button", () => {
    render(<AddItem getData={jest.fn()} />);
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
  });

  it("calls getData with correct data", () => {
    const mockgetData = jest.fn();
    render(<AddItem getData={mockgetData} />);

    const titleInput = screen.getByTestId("title-input");
    const descriptionInput = screen.getByTestId("description-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(titleInput, { target: { value: "New Item" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a description" } });
    fireEvent.click(addButton);

    expect(mockgetData).toHaveBeenCalledWith({
      title: "New Item",
      description: "This is a description",
    });
  });

  it("clears inputs after submission", () => {
    const mockgetData = jest.fn();
    render(<AddItem getData={mockgetData} />);

    const titleInput = screen.getByTestId("title-input");
    const descriptionInput = screen.getByTestId("description-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(titleInput, { target: { value: "New Item" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a description" } });
    fireEvent.click(addButton);

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
});
