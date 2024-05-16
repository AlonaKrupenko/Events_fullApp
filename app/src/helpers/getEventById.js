import axios from "axios";

export const getEventById = async (id, handler) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/events/${id}`);
    handler(response.data);
  } catch (error) {
    console.error("Error fetching participants:", error);
  }
};
