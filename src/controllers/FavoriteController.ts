"use strict";

const { v4: uuidv4 } = require("uuid");

const { validate: uuidValidate } = require("uuid");

// import { Favorite } from "../models/Favorite";

import favorites = require("./../DB/dbFavorites.json");
import albums = require("./../DB/dbAlbum.json");
import tracks = require("./../DB/dbTrack.json");
import artists = require("./../DB/dbArtist.json");
import { FavoritesResponse } from "../dto/FavoriteDTO";

const getAllFavorite = () => {
  let listTrack: any[] = [];
  let listArtist: any[] = [];
  let listAlbum: any[] = [];

  favorites?.album.forEach((aId) => {
    const a = albums.find((ele) => aId == ele.id);
    if (a) {
      const { id, ...aResponse } = a;
      listAlbum.push(aResponse);
    }
  });

  favorites?.artist.forEach((arId) => {
    const ar = artists.find((ele) => arId == ele.id);
    if (ar) {
      const { id, ...arResponse } = ar;
      listArtist.push(arResponse);
    }
  });

  favorites?.track.forEach((tId) => {
    const t = tracks.find((ele) => tId == ele.id);
    if (t) {
      const { id, ...tResponse } = t;
      listAlbum.push(tResponse);
    }
  });

  const favoriteResponse: FavoritesResponse = {
    artists: listArtist,
    albums: listAlbum,
    tracks: listTrack,
  };

  console.log(favoriteResponse);

  return {
    code: 200,
    result: favoriteResponse,
  };
};

const createTrackFavorite = (trackId: string) => {
  if (uuidValidate(trackId)) {
    if (tracks.find((t) => t.id == trackId)) {
      favorites.track.push(trackId);
    } else {
      return { code: 404, result: "Track not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }

  return { code: 201, result: "add track successfuly" };
};

const deleteTrackFavorite = (trackId: any) => {
  if (uuidValidate(trackId)) {
    const track = tracks.find((t) => t.id == trackId);
    if (track) {
      favorites.track.splice(favorites.track.indexOf(trackId), 1);
      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "Track not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const createArtistFavorite = (artistId: string) => {
  if (uuidValidate(artistId)) {
    if (artists.find((t) => t.id == artistId)) {
      favorites.artist.push(artistId);
    } else {
      return { code: 404, result: "artist not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }

  return { code: 201, result: "add artist successfuly" };
};

const deleteArtistFavorite = (artistId: any) => {
  if (uuidValidate(artistId)) {
    const artist = artists.find((t) => t.id == artistId);
    if (artist) {
      favorites.artist.splice(favorites.artist.indexOf(artistId), 1);
      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "artist not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

const createAlbumFavorite = (albumId: string) => {
  if (uuidValidate(albumId)) {
    if (albums.find((a) => a.id == albumId)) {
      favorites.album.push(albumId);
    } else {
      return { code: 404, result: "album not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }

  return { code: 201, result: "add album successfuly" };
};

const deleteAlbumFavorite = (albumId: any) => {
  if (uuidValidate(albumId)) {
    const album = albums.find((a) => a.id == albumId);
    if (album) {
      favorites.album.splice(favorites.album.indexOf(albumId), 1);
      return { code: 204, result: "deleted" };
    } else {
      return { code: 404, result: "album not found" };
    }
  } else {
    return { code: 400, result: "id invalid" };
  }
};

export = {
  getAllFavorite,
  createAlbumFavorite,
  createArtistFavorite,
  createTrackFavorite,
  deleteTrackFavorite,
  deleteArtistFavorite,
  deleteAlbumFavorite,
};
