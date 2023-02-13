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

// src/Routes/RegisterRouter.ts
var RegisterRouter_exports = {};
__export(RegisterRouter_exports, {
  default: () => RegisterRouter_default
});
module.exports = __toCommonJS(RegisterRouter_exports);
var import_express = require("express");

// src/Services/RegisterService.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

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

// src/Services/RegisterService.ts
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
      const salt = yield import_bcryptjs.default.genSalt(10);
      const hashPass = yield import_bcryptjs.default.hash(password, salt);
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
    this.router = (0, import_express.Router)();
    this.setupRouter();
  }
  setupRouter() {
    this.router.post("/", (req, res, next) => new RegisterController_default(req, res, next).register());
  }
};
var RegisterRouter_default = RegisterRouter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
