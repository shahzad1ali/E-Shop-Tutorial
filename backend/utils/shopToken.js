// CREATE TOKEN AND SAVE IT IN COOKIES

const sendShopToken = (user, statusCode, resp) => {
  const token = user.getJwtToken(); // Assumes your User model has a method called getJwtToken()

  // OPTIONS FOR COOKIES
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  resp.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;
