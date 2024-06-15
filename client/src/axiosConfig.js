import axios from "axios";
const PORT = import.meta.env.PORT || 10000;
export default axios.create({
  baseURL: `http://localhost:${PORT}/api`,
});
