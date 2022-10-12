import axios from "axios";

import { getFilteredHotels } from "./Filter.handler";
import { API_URL } from "../../../constants/API";

jest.mock("axios");
jest.mock("./Filter.handler", () => ({
  getFilteredHotels: jest.fn(),
}));

describe("CarFilterHandler", () => {
  describe("getFilteredHotels", () => {
    const mockSetHotels = jest.fn();
    it("should get filtered car by params when invoked", async () => {
      const data = [
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/photo-s/25/04/93/1e/blossom-hotel-houston.jpg",
          name: "Kempinski",
          location: "Jakarta",
          price: 789000,
          stars: 1,
        },
      ];
      const params = {
        location: "Jakarta",
        stars: 1,
      };
      axios.get.mockResolvedValue({ data });

      await getFilteredHotels(params, mockSetHotels);

      expect(axios.get).toBeCalledWith(`${API_URL}/hotels`, { params });
      expect(mockSetHotels).toBeCalledWith(data);
    });
    it("should search car by its closest model when invoked", async () => {
      const data = [
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/photo-s/25/04/93/1e/blossom-hotel-houston.jpg",
          name: "Kempinski",
          location: "Jakarta",
          price: 789000,
          stars: 1,
        },
      ];
      const params = {
        name_like: "kem",
      };

      axios.get.mockResolvedValue({ data });

      await getFilteredHotels(params, mockSetHotels);

      expect(axios.get).toBeCalledWith(`${API_URL}/hotels`, { params });
      expect(mockSetHotels).toBeCalledWith(data);
    });
  });
});
