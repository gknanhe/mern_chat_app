import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", //expires in 15 days
  });

  //jwt is cookie name can be any
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000, //ms
    httpOnly: true, //prevents from XSS attacks cross-site scripting attacs
    sameSite: "strict", //CSRF attacks cross-site request forrey attacks
  });
};

export default generateTokenAndSetCookies;
