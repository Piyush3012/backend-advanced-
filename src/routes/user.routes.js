import { Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"//importing this for file handling for the input from the user 
const router=Router();

router.route("/register").post(
    upload.fields([                //this is the middleware
        {
            name:"avatar",      //how we want to store the file upload that is avatar from the user
            maxCount:1,

        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

export default router