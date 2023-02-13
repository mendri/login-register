"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/App.ts
var App_exports = {};
__export(App_exports, {
  default: () => App_default
});
module.exports = __toCommonJS(App_exports);
var dotenv2 = __toESM(require("dotenv"));
var import_express3 = __toESM(require("express"));

// src/Models/connection.ts
var import_mongoose = __toESM(require("mongoose"));
function connectToDatabase(URI) {
  return __async(this, null, function* () {
    import_mongoose.default.set("strictQuery", true);
    yield import_mongoose.default.connect(URI);
  });
}
var connection_default = connectToDatabase;

// src/App.ts
var import_cors = __toESM(require("cors"));

// src/Routes/LoginRouter.ts
var import_express = require("express");

// src/Helpers/StatusCodes.ts
var StatusCodes = {
  "OK_STATUS": 200,
  "BAD_REQUEST_STATUS": 400,
  "UNAUTHORIZED_STATUS": 401,
  "NOT_FOUND": 404,
  "CONFLICT": 409,
  "INTERNAL_SERVER_ERROR_STATUS": 500
};
var StatusCodes_default = StatusCodes;

// src/Services/LoginService.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/Helpers/JWT.ts
var dotenv = __toESM(require("dotenv"));
var jwt = __toESM(require("jsonwebtoken"));
dotenv.config();
var TOKEN_SECRET = process.env.JWT_SECRET;
var generateToken = (payload) => {
  if (typeof TOKEN_SECRET != "string") {
    const error = new Error("Problemas internos");
    error.status = StatusCodes_default.INTERNAL_SERVER_ERROR_STATUS;
    throw error;
  }
  const token = jwt.sign(payload, TOKEN_SECRET);
  return token;
};
var JWT_default = generateToken;

// src/Models/UserODM.ts
var import_mongoose2 = require("mongoose");
var UserODM = class {
  constructor() {
    this.schema = new import_mongoose2.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true }
    });
    this.model = import_mongoose2.models.User || (0, import_mongoose2.model)("User", this.schema);
  }
  createUser(email, hashPass) {
    return __async(this, null, function* () {
      yield this.model.create({ email, password: hashPass });
    });
  }
  readAllUsers() {
    return __async(this, null, function* () {
      return this.model.find();
    });
  }
  readUserByEmail(email) {
    return __async(this, null, function* () {
      return this.model.findOne({ email }, { "__v": false });
    });
  }
};
var UserODM_default = UserODM;

// src/Services/LoginService.ts
var LoginService = class {
  constructor() {
    this.model = new UserODM_default();
  }
  handleLoginService(reqUser) {
    return __async(this, null, function* () {
      const { email, password } = reqUser;
      const user = yield this.verifyIfUserExistsByEmail(email);
      yield this.verifyEncryptedPass(password, user.password);
      return JWT_default(email);
    });
  }
  verifyIfUserExistsByEmail(email) {
    return __async(this, null, function* () {
      const user = yield this.model.readUserByEmail(email);
      if (!user) {
        const error = new Error("N\xE3o existe usu\xE1rio com este email");
        error.status = StatusCodes_default.NOT_FOUND;
        throw error;
      }
      return user;
    });
  }
  verifyEncryptedPass(pass, hashPass) {
    return __async(this, null, function* () {
      const isValid = yield import_bcryptjs.default.compare(pass, hashPass);
      if (!isValid) {
        const error = new Error("Senha incorreta");
        error.status = StatusCodes_default.UNAUTHORIZED_STATUS;
        throw error;
      }
    });
  }
};
var LoginService_default = LoginService;

// src/Validations/UserValidation.ts
var import_zod = require("zod");
var UserValidation = class {
  static validate(user) {
    const userObject = import_zod.z.object({
      email: import_zod.z.string().email({ message: "Email mal formatado" }),
      password: import_zod.z.string().min(8, { message: "Senha muito curta, no m\xEDnimo 8" })
    });
    const data = userObject.safeParse(user);
    if (!data.success) {
      const error = new Error(data.error.issues[0].message);
      error.status = StatusCodes_default.BAD_REQUEST_STATUS;
      throw error;
    }
  }
};
var UserValidation_default = UserValidation;

// src/Controllers/LoginController.ts
var LoginController = class {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new LoginService_default();
  }
  login() {
    return __async(this, null, function* () {
      try {
        const { user } = this.req.body;
        UserValidation_default.validate(user);
        const token = yield this.service.handleLoginService(user);
        return this.res.status(StatusCodes_default.OK_STATUS).json({ token });
      } catch (e) {
        this.next(e);
      }
    });
  }
};
var LoginController_default = LoginController;

// src/Routes/LoginRouter.ts
var LoginRouter = class {
  constructor() {
    this.router = (0, import_express.Router)();
    this.setupRouter();
  }
  setupRouter() {
    return __async(this, null, function* () {
      this.router.post("/", (req, res, next) => new LoginController_default(req, res, next).login());
    });
  }
};
var LoginRouter_default = LoginRouter;

// src/Middlewares/ErrorHandler.ts
var ErrorHandler = class {
  static handle(error, _req, res, next) {
    res.status(error.status || StatusCodes_default.INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
    next();
  }
};
var ErrorHandler_default = ErrorHandler;

// src/Routes/RegisterRouter.ts
var import_express2 = require("express");

// src/Services/RegisterService.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var RegisterService = class {
  constructor() {
    this.model = new UserODM_default();
  }
  handleRegister(user) {
    return __async(this, null, function* () {
      const { email, password } = user;
      yield this.verifyIfUserExistsByEmail(email);
      const hashPass = yield this.encryptThePassword(password);
      yield this.saveInDatabase(email, hashPass);
      return JWT_default(email);
    });
  }
  verifyIfUserExistsByEmail(email) {
    return __async(this, null, function* () {
      const user = yield this.model.readUserByEmail(email);
      if (user) {
        const error = new Error("J\xE1 existe um usu\xE1rio com este email");
        error.status = StatusCodes_default.CONFLICT;
        throw error;
      }
      return user;
    });
  }
  encryptThePassword(password) {
    return __async(this, null, function* () {
      const salt = yield import_bcryptjs2.default.genSalt(10);
      const hashPass = yield import_bcryptjs2.default.hash(password, salt);
      return hashPass;
    });
  }
  saveInDatabase(email, hashPass) {
    return __async(this, null, function* () {
      yield this.model.createUser(email, hashPass);
    });
  }
};
var RegisterService_default = RegisterService;

// src/Controllers/RegisterController.ts
var RegisterController = class {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new RegisterService_default();
  }
  register() {
    return __async(this, null, function* () {
      try {
        const { user } = this.req.body;
        UserValidation_default.validate(user);
        const token = yield this.service.handleRegister(user);
        return this.res.status(StatusCodes_default.OK_STATUS).json({ token });
      } catch (e) {
        this.next(e);
      }
    });
  }
};
var RegisterController_default = RegisterController;

// src/Routes/RegisterRouter.ts
var RegisterRouter = class {
  constructor() {
    this.router = (0, import_express2.Router)();
    this.setupRouter();
  }
  setupRouter() {
    this.router.post("/", (req, res, next) => new RegisterController_default(req, res, next).register());
  }
};
var RegisterRouter_default = RegisterRouter;

// src/App.ts
dotenv2.config();
var App = class {
  constructor() {
    this.app = (0, import_express3.default)();
    this.config();
  }
  config() {
    this.app.use((0, import_cors.default)());
    this.app.use(import_express3.default.json());
    this.app.use("/login", new LoginRouter_default().router);
    this.app.use("/register", new RegisterRouter_default().router);
    this.app.use(ErrorHandler_default.handle);
  }
  start() {
    connection_default(process.env.MONGO_DB_URI || "").then(
      () => {
        this.app.listen(process.env.PORT, () => {
          console.log(`Running at Port ${process.env.PORT}`);
        });
      }
    ).catch((error) => {
      console.log("Connection with database generated an error:\r\n");
      console.error(error);
      console.log("\r\nServer initialization cancelled");
      process.exit(0);
    });
  }
};
var App_default = App;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
