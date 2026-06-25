import express from "express";
import users from "./user.routes.js";
import authRoutes from "./auth.routers.js";
import banners from "./banner.routes.js";
import guest from "./guest.routers.js";
import episode from "./episode.routes.js";
import role from "./role.routes.js"
import events from "./event.routers.js"
import quickLink from "./quickList.routers.js"
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", users);
router.use("/banner", banners);
router.use("/guest", guest);
router.use("/episode", episode);
router.use("/role", role);
router.use("/events", events);
router.use("/quick-link", quickLink);
export default router;
