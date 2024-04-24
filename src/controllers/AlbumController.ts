"use strict";

const { v4: uuidv4 } = require("uuid");

const { validate: uuidValidate } = require("uuid");

import { Album } from "../models/Album";

import albums = require("./../DB/dbAlbum.json");

import favorites = require("./../DB/dbFavorites.json");

const getAllAlbum = () => {
  return albums;
};

const getByIdAlbum = (id: string) => {
  if (uuidValidate(id)) {
    const album = albums.find((album) => album.id == id);

    if (album) {
      return { code: 200, result: album };
    } else {
      return { code: 404, result: "album not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const createAlbum = (data: any) => {
  const album: Album = {
    id: uuidv4(),
    name: data.name,
    year: data.year,
    artistId: data.artistId,
  };

  albums.push(album);

  return { code: 201, result: album };
};

const updateAlbum = (data: any, id: string) => {
  if (uuidValidate(id)) {
    const album = albums.find((album) => album.id == id);
    if (album) {
      album.name = data.name;
      album.year = data.year;
      album.artistId = data.artistId;
      return { code: 200, result: album };
    } else {
      return { code: 404, result: "album not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const deleteAlbum = (id: string) => {
  if (uuidValidate(id)) {
    const album = albums.find((album) => album.id == id);
    if (album) {
      albums.splice(albums.indexOf(album), 1);

      // Check delete favorite
      favorites.artist.forEach((f) => {
        if (f == id) {
          f == null;
        }
      });

      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "album not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

export = {
  getAllAlbum,
  getByIdAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
