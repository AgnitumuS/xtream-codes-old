import { Router } from "express"
import cors from "./cors"

const router = Router()

router.use("/cors", cors)

export default router
