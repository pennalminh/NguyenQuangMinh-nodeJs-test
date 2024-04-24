"use strict";

var express = require("express");
var router = express.Router();

const {
  getAllTrack,
  getByIdTrack,
  createTrack,
  updateTrack,
  deleteTrack,
} = require("./../controllers/TrackController");

router.get("/", async function (req: any, res: any) {
  const result = await getAllTrack();
  res.json({
    code: 200,
    result: result,
  });
});

router.get("/:id", async function (req: any, res: any) {
  const result = await getByIdTrack(req.params.id);
  res.json(result);
});

router.post("/create", async function (req: any, res: any) {
  const { name, artistId, albumId, duration } = req.body;

  if (!name || !duration) {
    res.json({
      code: 400,
      result: "body does not contain required fields",
    });
    return;
  }

  const track = { name, artistId, albumId, duration };

  const result = await createTrack(track);
  res.json(result);
});

router.put("/:id", async function (req: any, res: any) {
  const { name, artistId, albumId, duration } = req.body;

  const track = { name, artistId, albumId, duration };

  const result = updateTrack(track, req.params.id);
  res.json(result);
});

router.delete("/:id", async function (req: any, res: any) {
  const result = deleteTrack(req.params.id);
  res.json(result);
});

module.exports = router;
