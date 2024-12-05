import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditItem from "./EditItem";

describe("EditItem Component", () => {
  it("renders the input fields with default values", () => {
    const item = { id: 1, title: "Sample Item", description: "Sample Description", price: 10 };
    render(<EditItem item={item} getData={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByTestId("edit-title-input")).toHaveValue("Sample Item");
    expect(screen.getByTestId("edit-description-input")).toHaveValue("Sample Description");
    expect(screen.getByTestId("edit-price-input")).toHaveValue(10);
  });

  it("calls getData with updated values", () => {
    const item = { id: 1, title: "Sample Item", description: "Sample Description", price: 10 };
    const mockgetData = jest.fn();
    const mockOnCancel = jest.fn();
    render(<EditItem item={item} getData={mockgetData} onCancel={mockOnCancel}/>);

    fireEvent.change(screen.getByTestId("edit-title-input"), { target: { value: "Updated Title" } });
    fireEvent.change(screen.getByTestId("edit-description-input"), { target: { value: "Updated Description" } });
    fireEvent.change(screen.getByTestId("edit-description-input"), { target: { value: 20 } });
    fireEvent.click(screen.getByTestId("update-button"));

    expect(mockgetData).toHaveBeenCalledWith({
      id: 1,
      title: "Updated Title",
      description: "Updated Description",
      price: 20
    });
  });

  it("cancel the input field values", () => {
    const item = { id: 1, title: "Sample Item", description: "Sample Description", price: 10 };
    const mockgetData = jest.fn();
    const mockOnCancel = jest.fn();
    render(<EditItem item={item} getData={mockgetData} onCancel={mockOnCancel}/>);

    fireEvent.change(screen.getByTestId("edit-title-input"), { target: { value: "Updated Title" } });
    fireEvent.change(screen.getByTestId("edit-description-input"), { target: { value: "Updated Description" } });
    fireEvent.change(screen.getByTestId("edit-description-input"), { target: { value: 20 } });
    fireEvent.click(screen.getByTestId("update-button"));

    expect(mockOnCancel).toHaveBeenCalledWith({
      id: '',
      title: "",
      description: "",
      price: 0
    });
  });
});
