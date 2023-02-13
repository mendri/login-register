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

// src/Controllers/LoginController.ts
var LoginController_exports = {};
__export(LoginController_exports, {
  default: () => LoginController_default
});
module.exports = __toCommonJS(LoginController_exports);

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
var import_mongoose = require("mongoose");
var UserODM = class {
  constructor() {
    this.schema = new import_mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true }
    });
    this.model = import_mongoose.models.User || (0, import_mongoose.model)("User", this.schema);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
