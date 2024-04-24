import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import { Track } from "../models/Track";

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
