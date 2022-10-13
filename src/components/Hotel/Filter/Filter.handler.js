import axios from "axios";

import { API_URL } from "../../../constants/API";

const getFilteredHotels = async (params, setHotels) => {
  try {
    let { data } = await axios.get(`${API_URL}/hotels/`, {
      params,
    });
    setHotels(data);
  } catch (error) {
    setHotels(null);
  }
};

export { getFilteredHotels };
