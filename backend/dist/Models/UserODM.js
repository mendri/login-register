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

// src/Models/UserODM.ts
var UserODM_exports = {};
__export(UserODM_exports, {
  default: () => UserODM_default
});
module.exports = __toCommonJS(UserODM_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
