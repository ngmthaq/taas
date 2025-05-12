const { isbot } = require("isbot");
const { RHS } = require("../Services/RequestHandlerService");
const enUS = require("../Localization/enUS");
const viVN = require("../Localization/viVN");

const IsBotMiddleware = RHS((req, res, next) => {
  const isApi = req.originalUrl.startsWith("/api");
  if (isApi) return next();

  const isBot = isbot(req.get("user-agent"));
  if (isBot) return next();

  const locales = { enUS, viVN };
  const resources = {
    [enUS.key]: enUS.resources,
    [viVN.key]: viVN.resources,
  };

  return res.render("ReactApp", { locales, resources });
});

module.exports = IsBotMiddleware;
