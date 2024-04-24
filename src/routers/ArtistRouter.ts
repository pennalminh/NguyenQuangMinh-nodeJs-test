"use strict";

var express = require("express");
var router = express.Router();

const {
  getAllArtist,
  getByIdArtist,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("./../controllers/ArtistController");

router.get("/", async function (req: any, res: any) {
  const result = await getAllArtist();
  res.json({
    code: 200,
    result: result,
  });
});

router.get("/:id", async function (req: any, res: any) {
  const result = await getByIdArtist(req.params.id);
  res.json(result);
});

router.post("/create", async function (req: any, res: any, next: any) {
  const { name, grammy } = req.body;

  if (!name || !grammy) {
    res.json({
      code: 400,
      result: "body does not contain required fields",
    });
    return;
  }

  const artist = { name, grammy };

  const result = await createArtist(artist);
  res.json(result);
});

router.put("/:id", async function (req: any, res: any) {
  const { name, grammy } = req.body;

  const artist = {
    name,
    grammy,
  };

  const result = updateArtist(artist, req.params.id);
  res.json(result);
});

router.delete("/:id", async function (req: any, res: any) {
  const result = deleteArtist(req.params.id);
  res.json(result);
});

module.exports = router;
