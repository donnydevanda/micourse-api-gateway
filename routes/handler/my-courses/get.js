const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const userId = req.user.data.id;
    const myCourses = await api.get("/api/my-courses/", {
      params: { user_id: userId },
    });
    return res.json(myCourses.data);
  } catch (error) {
    // Check service availability
    if (error.code === "ECONNREFUSE") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};