"use strict";

const { v4: uuidv4 } = require("uuid");

const { validate: uuidValidate } = require("uuid");

import { Artist } from "../models/Artist";

import artists = require("./../DB/dbArtist.json");

import favorites = require("./../DB/dbFavorites.json");
import albums = require("./../DB/dbAlbum.json");
import tracks = require("./../DB/dbTrack.json");

const getAllArtist = () => {
  return artists;
};

const getByIdArtist = (id: string) => {
  if (uuidValidate(id)) {
    const artist = artists.find((a) => a.id == id);

    if (artist) {
      return { code: 200, result: artist };
    } else {
      return { code: 404, result: "artist not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const createArtist = (data: any) => {
  const artist: Artist = {
    id: uuidv4(),
    name: data.name,
    grammy: data.grammy,
  };

  artists.push(artist);

  return { code: 201, result: artist };
};

const updateArtist = (data: any, id: string) => {
  if (uuidValidate(id)) {
    const artist = artists.find((a) => a.id == id);
    if (artist) {
      artist.name = data.name;
      artist.grammy = data.grammy;
      return { code: 200, result: artist };
    } else {
      return { code: 404, result: "artist not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const deleteArtist = (id: string) => {
  if (uuidValidate(id)) {
    const artist = artists.find((artist) => artist.id == id);
    if (artist) {
      artists.splice(artists.indexOf(artist), 1);

      // Check delete Album
      albums.forEach((a) => {
        if (a.artistId == id) {
          a.artistId == null;
        }
      });

      // Check delete track
      tracks.forEach((t) => {
        if (t.artistId == id) {
          t.artistId == null;
        }
      });

      // Check delete favorite
      favorites.artist.forEach((f) => {
        if (f == id) {
          f == null;
        }
      });

      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "artist not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

export = {
  getAllArtist,
  getByIdArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
