"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Validations/UserValidation.ts
var UserValidation_exports = {};
__export(UserValidation_exports, {
  default: () => UserValidation_default
});
module.exports = __toCommonJS(UserValidation_exports);
var import_zod = require("zod");

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

// src/Validations/UserValidation.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
