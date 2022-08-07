import { Router } from "express";

import validateToken from "../middlewares/validateToken.js";
import validateUrl from "../middlewares/validateUrl.js";
import { shortenUrl, getUrl, getShortUrl, deleteUrl } from "../controllers/urlsControllers.js";

const router = Router();


router.post("/urls/shorten", validateToken, validateUrl, shortenUrl);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", getShortUrl);
router.delete("/urls/:id", validateToken, deleteUrl);

export default router;