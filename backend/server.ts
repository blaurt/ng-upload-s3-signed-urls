import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createPutUrl, getDownloadUrl } from "./getSignedUrls";

import cors from 'cors'



const app = express();
const port = 3000;

app.use(cors())

app.get("/getUploadUrl", async (req, res) => {
  const { filenameToUpload } = req.query;
  const url = await createPutUrl(String(filenameToUpload));
  return res.send({ url });
});

app.get("/getDownloadUrl", async (req, res) => {
  const { filenameToUpload } = req.query;
  const url = await getDownloadUrl(String(filenameToUpload));
  return res.send({ url });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
