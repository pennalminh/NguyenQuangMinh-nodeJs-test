"use strict";

import {} from "../controllers/UserController";

var express = require("express");
var router = express.Router();
const { UpdatePasswordDto, CreateUserDto } = require("./../dto/UserDTO");

const {
  getAll,
  getById,
  create,
  updatePassword,
  deleteUser1,
} = require("../controllers/UserController");

router.get("/", async function (req: any, res: any) {
  const result = await getAll();
  res.json({
    code: 200,
    result: result,
  });
});

router.get("/:id", async function (req: any, res: any) {
  const result = await getById(req);
  res.json(result);
});

router.post("/create", async function (req: any, res: any, next: any) {
  const { login, password } = req.body;

  if (!login || !password) {
    res.json({
      code: 400,
      result: "body does not contain required fields",
    });
    return;
  }

  const user: typeof CreateUserDto = { login, password };

  const result = await create(user);
  res.json(result);
});

router.put("/:id", async function (req: any, res: any) {
  const { oldPassword, newPassword } = req.body;

  const user: typeof UpdatePasswordDto = {
    oldPassword,
    newPassword,
  };

  const result = updatePassword(user, req.params.id);
  res.json(result);
});

router.delete("/:id", async function (req: any, res: any) {
  const result = deleteUser1(req.params.id);
  res.json(result);
});

module.exports = router;
