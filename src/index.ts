import express, { Request, Response } from "express";
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

var userRouter = require("./routers/UserRouter");

var artistRouter = require("./routers/ArtistRouter");

var albumRouter = require("./routers/AlbumRouter");

var trackRouter = require("./routers/TrackRouter");

var favoriteRouter = require("./routers/FavoriteRoter");

app.get("/", (req: any, res: any) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/user", userRouter);

app.use("/artist", artistRouter);

app.use("/album", albumRouter);

app.use("/track", trackRouter);

app.use("/favs", favoriteRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
