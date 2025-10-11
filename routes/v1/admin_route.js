import express from 'express';
import {create_attendencedate, createattendence, deleteattendence, getall_attendencedate, getalluserslist,getallworkerlist, getattencence, updateattendence } from '../../controller/admincontroller.js';
import { checkuser } from '../../middleware/Checkuser.js';
const admin_route = express.Router();


admin_route.get("/getalluserslist",checkuser,getalluserslist);
admin_route.get("/getallworkerlist",checkuser,getallworkerlist);
admin_route.post("/attendencedate",checkuser,create_attendencedate);
admin_route.get("/attendencedate",checkuser,getall_attendencedate);
admin_route.post("/createattendence",checkuser,createattendence);
admin_route.get("/getattencence/:date_id",checkuser,getattencence);
admin_route.put("/updateattendence/:id",checkuser,updateattendence);
admin_route.delete("/deleteattendence/:id",checkuser,deleteattendence);

export default admin_route;