import express from "express"
import {upgradeTenant} from "../controllers/tenantController.js"
import authMiddleware from "../middleware/authmiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"


const router =express.Router();

router.post("/:slug/upgrade",authMiddleware,roleMiddleware("admin"),upgradeTenant);

export default router;