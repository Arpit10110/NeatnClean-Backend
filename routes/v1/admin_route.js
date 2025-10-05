import express from 'express';
import {getalluserslist,getallworkerlist } from '../../controller/admincontroller.js';
import { checkuser } from '../../middleware/Checkuser.js';
const admin_route = express.Router();


admin_route.get("/getalluserslist",checkuser,getalluserslist);
admin_route.get("/getallworkerlist",checkuser,getallworkerlist);


export default admin_route;