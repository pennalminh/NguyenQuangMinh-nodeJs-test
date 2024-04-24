"use strict";

var express = require("express");
var router = express.Router();

const {
  getAllAlbum,
  getByIdAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require("./../controllers/AlbumController");

router.get("/", async function (req: any, res: any) {
  const result = await getAllAlbum();
  res.json({
    code: 200,
    result: result,
  });
});

router.get("/:id", async function (req: any, res: any) {
  const result = await getByIdAlbum(req.params.id);
  res.json(result);
});

router.post("/create", async function (req: any, res: any, next: any) {
  const { name, year, artistId } = req.body;

  if (!name || !year) {
    res.json({
      code: 400,
      result: "body does not contain required fields",
    });
    return;
  }

  const album = { name, year, artistId };

  const result = await createAlbum(album);
  res.json(result);
});

router.put("/:id", async function (req: any, res: any) {
  const { name, year, artistId } = req.body;

  const album = { name, year, artistId };

  const result = updateAlbum(album, req.params.id);
  res.json(result);
});

router.delete("/:id", async function (req: any, res: any) {
  const result = deleteAlbum(req.params.id);
  res.json(result);
});

module.exports = router;
