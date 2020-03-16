import {
  act,
  findAllByRole,
  findAllByTestId,
  findByRole,
  findByText,
  fireEvent,
  queryByRole,
  queryByText,
  render,
  waitFor,
} from "@testing-library/react";
import React from "react";
import App from "./App";

describe("UI integration", () => {
  let fetchMock;

  beforeEach(() => {
    jest.clearAllMocks();

    fetchMock = jest.fn((url, opts) => {
      // GET
      if (opts == null || opts.method == null || opts.method === "GET") {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce([
            { id: 1, description: "Milk", isComplete: false },
            { id: 2, description: "Bread", isComplete: false },
          ]),
        });
      }
      // POST
      if (opts.method === "POST") {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce({
            id: 3,
            ...JSON.parse(opts.body),
          }),
        });
      }
      // PATCH
      if (opts.method === "PATCH") {
        const parts = url.split("/");
        const id = Number(parts[parts.length - 1]);

        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce({
            id,
            ...JSON.parse(opts.body),
          }),
        });
      }
    });
    window.fetch = fetchMock;
  });

  test("renders initial items from server", async () => {
    await act(async () => {
      render(<App />);
    });

    const itemElements = await findAllByTestId(
      document.documentElement,
      "item",
    );

    expect(itemElements).toHaveLength(2);
    expect(queryByRole(itemElements[0], "checkbox").checked).toBe(false);
    expect(queryByText(itemElements[0], "Milk")).toBeVisible();
    expect(queryByRole(itemElements[1], "checkbox").checked).toBe(false);
    expect(queryByText(itemElements[1], "Bread")).toBeVisible();
  });

  test("sends request and renders new item user enters", async () => {
    await act(async () => {
      render(<App />);
    });

    const entryInput = await findByRole(document.documentElement, "textbox");
    const addButton = await findByRole(document.documentElement, "button");

    fireEvent.change(entryInput, { target: { value: "Toilet paper" } });
    fireEvent.click(addButton);

    const newItem = await findByText(document.documentElement, "Toilet paper");

    expect(newItem).toBeVisible();
  });

  test("sends request and renders updated item user ticks checkbox", async () => {
    await act(async () => {
      render(<App />);
    });

    const itemCheckboxes = await findAllByRole(
      document.documentElement,
      "checkbox",
    );

    itemCheckboxes[1].click();

    // Checkbox will be updated to new state after request finishes so if it's
    // done we know it's successful.
    await waitFor(async () => {
      const updatedCheckboxes = await findAllByRole(
        document.documentElement,
        "checkbox",
      );

      expect(updatedCheckboxes[1].checked).toBe(true);
    });

    await act(async () => {
      render(<App />);
    });
  });
});
