import express from "express"
import {upgradeTenant} from "../../server/controllers/tenantController.js"
import authMiddleware from "../../server/middleware/authmiddleware.js"
import roleMiddleware from "../../server/middleware/roleMiddleware.js"


const router =express.Router();

router.post("/:slug/upgrade",authMiddleware,roleMiddleware("admin"),upgradeTenant);

export default router;