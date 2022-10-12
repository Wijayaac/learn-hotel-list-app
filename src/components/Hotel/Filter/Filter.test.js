import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Filter from "./Filter";
import { getFilteredHotels } from "./Filter.handler";

jest.mock("./Filter.handler.js", () => ({
  getFilteredHotels: jest.fn(),
}));

describe("Filter", () => {
  const props = {
    setHotels: jest.fn(),
  };
  describe("#render", () => {
    it("should render filter bar when invoked", () => {
      render(<Filter setHotels={props.setHotels} />);
      const nameFilter = screen.getByRole("textbox", { name: "name" });
      const locationFilter = screen.getByRole("combobox", { name: "location" });
      const starFilter = screen.getByRole("combobox", { name: "star" });

      expect(nameFilter).toBeInTheDocument();
      expect(locationFilter).toBeInTheDocument();
      expect(starFilter).toBeInTheDocument();
    });
  });
  describe("#filter", () => {
    it("should filter car data when any filter selected", async () => {
      render(<Filter setHotels={props.setHotels} />);
      const locationFilter = screen.getByRole("combobox", { name: "location" });
      const starFilter = screen.getByRole("combobox", { name: "star" });
      const submitButton = screen.getByRole("button", { name: "submitButton" });

      fireEvent.change(locationFilter, {
        target: {
          value: "Bandung",
        },
      });
      fireEvent.change(starFilter, {
        target: {
          value: 1,
        },
      });

      await act(() => {
        fireEvent.click(submitButton);
      });

      expect(getFilteredHotels).toBeCalledWith(
        {
          location: "Bandung",
          stars: "1",
        },
        props.setHotels
      );
    });
  });
});
