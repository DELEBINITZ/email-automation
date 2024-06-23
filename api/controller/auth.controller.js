const { errorResponse } = require("../middleware/errorHandler");

module.exports.getGmailAuthenticationURL = async (req, res) => {
  try {
    
  } catch (err) {
    return errorResponse(res, "Internal Server Error", 500, { error: err });
  }
};
