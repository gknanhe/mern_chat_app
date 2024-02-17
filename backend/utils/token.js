import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", //expires in 15 days
  });

  return token;
  //jwt is cookie name can be any
  // res.cookie("jwt", token, {
  //   maxAge: 15 * 24 * 60 * 1000, //ms
  //   httpOnly: true, //prevents from XSS attacks cross-site scripting attacs
  //   sameSite: "none", //CSRF attacks cross-site request forrey attacks
  //   // secure: true, //process.env.NODE_ENV !== "development",
  // });
};

export default generateTokenAndSetCookies;
