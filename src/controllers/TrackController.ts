"use strict";

const { v4: uuidv4 } = require("uuid");

const { validate: uuidValidate } = require("uuid");

import { Track } from "../models/Track";

import tracks = require("./../DB/dbTrack.json");

import favorites = require("./../DB/dbFavorites.json");

const getAllTrack = () => {
  return tracks;
};

const getByIdTrack = (id: string) => {
  if (uuidValidate(id)) {
    const track = tracks.find((t) => t.id == id);

    if (track) {
      return { code: 200, result: track };
    } else {
      return { code: 404, result: "Track not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const createTrack = (data: any) => {
  const track: Track = {
    id: uuidv4(),
    name: data.name,
    artistId: data.artistId,
    albumId: data.albumId,
    duration: data.duration,
  };

  tracks.push(track);

  return { code: 201, result: track };
};

const updateTrack = (data: any, id: string) => {
  if (uuidValidate(id)) {
    const track = tracks.find((Track) => Track.id == id);
    if (track) {
      track.name = data.name;
      track.artistId = data.artistId;
      track.albumId = data.albumId;
      track.duration = data.duration;
      return { code: 200, result: track };
    } else {
      return { code: 404, result: "Track not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const deleteTrack = (id: string) => {
  if (uuidValidate(id)) {
    const track = tracks.find((Track) => Track.id == id);
    if (track) {
      tracks.splice(tracks.indexOf(track), 1);

      // Check delete favorite
      favorites.artist.forEach((f) => {
        if (f == id) {
          f == null;
        }
      });

      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "Track not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

export = {
  getAllTrack,
  getByIdTrack,
  createTrack,
  updateTrack,
  deleteTrack,
};
