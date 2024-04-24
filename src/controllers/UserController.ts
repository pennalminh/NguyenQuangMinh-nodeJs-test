"use strict";

const { v4: uuidv4 } = require("uuid");

const { validate: uuidValidate } = require("uuid");

import { User } from "../models/User";

import users = require("./../DB/dbUser.json");

const getAll = () => {
  const lUserResponse = users.map((u) => {
    const { password, ...uResponse } = u;
    return uResponse;
  });
  return lUserResponse;
};

const getById = (req: any) => {
  if (uuidValidate(req.params.id)) {
    const user = users.find((user) => user.id == req.params.id);

    if (user) {
      return { code: 200, result: user };
    } else {
      return { code: 404, result: "user not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const create = (data: any) => {
  const userStrore: User = {
    id: uuidv4(),
    login: data.login,
    password: data.password,
    version: 1,
    createdAt: 1713862619,
    updatedAt: 1713862619,
  };

  users.push(userStrore);

  return { code: 201, result: userStrore };
};

const updatePassword = (data: any, id: string) => {
  if (uuidValidate(id)) {
    const user = users.find((user) => user.id == id);
    if (user) {
      if (user.password == data.oldPassword) {
        user.password = data.newPassword;
        return { code: 200, result: user };
      } else {
        return { code: 403, result: "oldpassword is wrong" };
      }
    } else {
      return { code: 404, result: "user not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const deleteUser1 = (id: string) => {
  if (uuidValidate(id)) {
    const user = users.find((user) => user.id == id);
    if (user) {
      users.splice(users.indexOf(user), 1);
      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "user not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

export = {
  getAll,
  getById,
  create,
  updatePassword,
  deleteUser1,
};
