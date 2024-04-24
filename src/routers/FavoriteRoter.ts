"use strict";

var express = require("express");
var router = express.Router();

const {
  getAllFavorite,
  createTrackFavorite,
  deleteTrackFavorite,
  createAlbumFavorite,
  deleteAlbumFavorite,
  createArtistFavorite,
  deleteArtistFavorite,
} = require("./../controllers/FavoriteController");

router.get("/", async function (req: any, res: any) {
  const result = await getAllFavorite();
  res.json({
    code: 200,
    result: result,
  });
});

router.post("track/:id", async function (req: any, res: any) {
  const result = await createTrackFavorite(req.params.id);
  res.json(result);
});

router.delete("track/:id", async function (req: any, res: any) {
  const result = await deleteTrackFavorite(req.params.id);
  res.json(result);
});

router.post("album/:id", async function (req: any, res: any) {
  const result = await createAlbumFavorite(req.params.id);
  res.json(result);
});

router.delete("album/:id", async function (req: any, res: any) {
  const result = await deleteAlbumFavorite(req.params.id);
  res.json(result);
});

router.post("artist/:id", async function (req: any, res: any) {
  const result = await createArtistFavorite(req.params.id);
  res.json(result);
});

router.delete("artist/:id", async function (req: any, res: any) {
  const result = await deleteArtistFavorite(req.params.id);
  res.json(result);
});

module.exports = router;
