const expressSession = require("express-session");

const sessionMiddleware = (app) => {
  const secret = generateRandomString(64);
  app.use(
    expressSession({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1 * 60 * 60 * 1000 },
    })
  );
};

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = sessionMiddleware;
