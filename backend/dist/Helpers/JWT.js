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

// src/Helpers/JWT.ts
var JWT_exports = {};
__export(JWT_exports, {
  default: () => JWT_default
});
module.exports = __toCommonJS(JWT_exports);
var dotenv = __toESM(require("dotenv"));
var jwt = __toESM(require("jsonwebtoken"));

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
