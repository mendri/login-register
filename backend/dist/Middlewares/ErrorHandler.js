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

// src/Middlewares/ErrorHandler.ts
var ErrorHandler_exports = {};
__export(ErrorHandler_exports, {
  default: () => ErrorHandler_default
});
module.exports = __toCommonJS(ErrorHandler_exports);

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

// src/Middlewares/ErrorHandler.ts
var ErrorHandler = class {
  static handle(error, _req, res, next) {
    res.status(error.status || StatusCodes_default.INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
    next();
  }
};
var ErrorHandler_default = ErrorHandler;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
