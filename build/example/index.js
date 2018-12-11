"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var fs = __importStar(require("fs"));
var html_literal_1 = __importDefault(require("html-literal"));
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var path = __importStar(require("path"));
var v4_1 = __importDefault(require("uuid/v4"));
var package_json_1 = require("../package.json");
// notify of missing .env file
if (!fs.existsSync(path.join(__dirname, ".env"))) {
    console.log("Please copy the example configuration file _.env to .env and edit contents as needed");
    process.exit(1);
}
// load configuration from .env file
dotenv_1.default.config();
// application configuration
var config = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    ssl: {
        enabled: process.env.SSL_ENABLED === "true",
        cert: process.env.SSL_CERT || "",
        key: process.env.SSL_KEY || "",
    },
    api: {
        baseURL: process.env.API_BASE_URL || "https://test.verifyonce.com/api/verify",
        auth: {
            // verify-once integrator id and secret
            username: process.env.API_AUTH_USERNAME || "",
            password: process.env.API_AUTH_PASSWORD || "",
        },
    },
};
// populate the database
var database = {
    users: [],
    verifications: [],
};
// run in an async IIFE to be able to use async-await
(function () { return __awaiter(_this, void 0, void 0, function () {
    var app, server;
    var _this = this;
    return __generator(this, function (_a) {
        app = express_1.default();
        // setup body parser middleware to support form, json and plain text payloads
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.text());
        // setup session support
        app.use(cookie_parser_1.default());
        app.use(express_session_1.default({
            secret: "foobar",
            resave: true,
            saveUninitialized: true,
        }));
        // initialize session middleware
        app.use(function (request, _response, next) {
            // should not happen
            if (!request.session) {
                throw new Error("Session support is not properly configured");
            }
            // user defaults to null if does not exist
            if (!request.session.user) {
                request.session.user = null;
            }
            next();
        });
        // handle index page request
        app.get("/", function (request, response, _next) {
            response.send(html_literal_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <p>\n        <h1>VerifyOnce integration example</h1>\n      </p>\n\n      <form method=\"post\" action=\"/initiate\">\n        <p>\n          <h2>User info</h2>\n        </p>\n        <p>\n          This is the information that the integrating system already knows and uses to compare against the information received from VerifyOnce.\n        </p>\n        <p><input id=\"firstName\" name=\"firstName\" value=\"John\" /> <label for=\"firstName\">First name</label></p>\n        <p><input id=\"lastName\" name=\"lastName\" value=\"Rambo\" /> <label for=\"lastName\">Last name</label></p>\n        <p><input id=\"country\" name=\"country\" value=\"EST\" /> <label for=\"country\">Country</label></p>\n        <p>\n          <button type=\"submit\">Start verification</button>\n        </p>\n      </form>\n\n      <p>\n        <h2>State</h2>\n      </p>\n      <p>\n        This is the information that the integrator knows internally and that it has received from VerifyOnce. Integrator should use this information to decide whether the user can be considered verified or not.\n      </p>\n      <p>", "</p>\n\n      <p>\n        <em>Version: ", "</em>\n      </p>\n    "], ["\n      <p>\n        <h1>VerifyOnce integration example</h1>\n      </p>\n\n      <form method=\"post\" action=\"/initiate\">\n        <p>\n          <h2>User info</h2>\n        </p>\n        <p>\n          This is the information that the integrating system already knows and uses to compare against the information received from VerifyOnce.\n        </p>\n        <p><input id=\"firstName\" name=\"firstName\" value=\"John\" /> <label for=\"firstName\">First name</label></p>\n        <p><input id=\"lastName\" name=\"lastName\" value=\"Rambo\" /> <label for=\"lastName\">Last name</label></p>\n        <p><input id=\"country\" name=\"country\" value=\"EST\" /> <label for=\"country\">Country</label></p>\n        <p>\n          <button type=\"submit\">Start verification</button>\n        </p>\n      </form>\n\n      <p>\n        <h2>State</h2>\n      </p>\n      <p>\n        This is the information that the integrator knows internally and that it has received from VerifyOnce. Integrator should use this information to decide whether the user can be considered verified or not.\n      </p>\n      <p>", "</p>\n\n      <p>\n        <em>Version: ", "</em>\n      </p>\n    "])), debug({ user: request.session.user, database: database }), package_json_1.version));
        });
        // handle initiation request
        app.post("/initiate", function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, firstName, lastName, country, user, api, initiateResponse, verification, err_1, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, firstName = _a.firstName, lastName = _a.lastName, country = _a.country;
                        user = {
                            id: v4_1.default(),
                            firstName: firstName,
                            lastName: lastName,
                            country: country,
                        };
                        database.users.push(user);
                        // store the logged in user in the session
                        request.session.user = user;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        api = axios_1.default.create(config.api);
                        return [4 /*yield*/, api.post("/initiate")];
                    case 2:
                        initiateResponse = _b.sent();
                        verification = {
                            transactionId: initiateResponse.data.transactionId,
                            userId: user.id,
                            url: initiateResponse.data.url,
                            isCorrectUser: false,
                            info: null,
                        };
                        database.verifications.push(verification);
                        // redirect to the verification page
                        response.redirect(initiateResponse.data.url);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        error = err_1;
                        // handle authentication error
                        if (error.response && error.response.status === 401) {
                            response.send("Authentication failed, check integrator username and password");
                            return [2 /*return*/];
                        }
                        // let express handle other errors
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // handle the integration callback
        app.post("/callback", function (request, response, _next) { return __awaiter(_this, void 0, void 0, function () {
            var info_1, verification_1, user, successOdds, maxSimulatedLatency, simulatedLatency;
            return __generator(this, function (_a) {
                try {
                    info_1 = jsonwebtoken_1.default.verify(request.body, config.api.auth.password);
                    verification_1 = database.verifications.find(function (item) { return item.transactionId === info_1.transaction.id; });
                    // handle failure to find such transaction
                    if (!verification_1) {
                        // you could respond with HTTP 2xx not to get the same info retried
                        response.status(404).send("Verification with transaction id \"" + info_1.transaction.id + "\" could not be found");
                        return [2 /*return*/];
                    }
                    user = database.users.find(function (item) { return item.id === verification_1.userId; });
                    // the user should exist at this point
                    if (!user) {
                        throw new Error("Verification user with id \"" + verification_1.userId + "\" not found, this should not happen");
                    }
                    // store the verification info
                    verification_1.info = info_1;
                    // check that the verified user matches logged-in user
                    verification_1.isCorrectUser = isCorrectUser(verification_1.info, user);
                    // log callback info
                    console.log("received valid callback", {
                        body: request.body,
                        info: info_1,
                        verification: verification_1,
                        user: user,
                    });
                    successOdds = 1 / 2;
                    maxSimulatedLatency = 2000;
                    // roll the dice and send failure response half of the times to test the retry logic
                    if (Math.random() < successOdds) {
                        simulatedLatency = Math.random() * maxSimulatedLatency;
                        setTimeout(function () {
                            // respond with HTTP 2xx response code to be considered valid handled callback
                            response.send("OK");
                        }, simulatedLatency);
                    }
                    else {
                        // respond with non 2xx to be considered failed delivery attempt, the status delivery will be retried
                        response.status(500).send("Simulated internal error");
                    }
                }
                catch (error) {
                    console.log("received invalid callback", {
                        body: request.body,
                        error: error,
                    });
                    response.status(400).send("Invalid JWT token provided (" + error.message + ")");
                }
                return [2 /*return*/];
            });
        }); });
        server = config.ssl.enabled
            ? https.createServer({
                cert: fs.readFileSync(config.ssl.cert),
                key: fs.readFileSync(config.ssl.key),
            }, app)
            : http.createServer(app);
        // start the server
        server.listen(config.port, function (error) {
            if (error) {
                console.error(error);
                return;
            }
            console.log("Example integration server started on port " + config.port);
            // also start a server on http to redirect to https if SSL is enabled
            if (config.ssl.enabled) {
                express_1.default()
                    .use(function (request, response, _next) {
                    response.redirect("https://" + config.host + request.originalUrl);
                })
                    .listen(80);
            }
        });
        return [2 /*return*/];
    });
}); })().catch(function (error) { return console.error(error); });
function isCorrectUser(verification, user) {
    // consider not valid if identity verification has not been performed
    if (verification.identityVerification === null) {
        return false;
    }
    // require first name to match (case-insensitive)
    if (verification.identityVerification.idFirstName === null ||
        verification.identityVerification.idFirstName === "N/A" ||
        user.firstName.toLowerCase() !== verification.identityVerification.idFirstName.toLowerCase()) {
        return false;
    }
    // require last name to match (case-insensitive)
    if (verification.identityVerification.idLastName === null ||
        verification.identityVerification.idLastName === "N/A" ||
        user.lastName.toLowerCase() !== verification.identityVerification.idLastName.toLowerCase()) {
        return false;
    }
    // name matches, all good (integrator could choose to verify additional known info such as date of birth etc)
    return true;
}
// debugging helper, renders data as formatted json
function debug(data) {
    return html_literal_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    <pre>", "</pre>\n  "], ["\n    <pre>", "</pre>\n  "])), JSON.stringify(data, null, "  "));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map