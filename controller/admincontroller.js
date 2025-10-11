import {UserModel} from "../model/user.model.js"
import { Date_Attendence_Model, WorkerAttendence_Model } from "../model/worker_attendence.model.js";
import ErrorHandler from "../utils/Error_handler.js"


export const getalluserslist = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }
        const users = await UserModel.find({role:"user"});
        return res.json({
            success:true,
            message:"Users fetched successfully",
            users:users
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}
export const getallworkerlist = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }
        const users = await UserModel.find({role:"worker"});
        return res.json({
            success:true,
            message:"Users fetched successfully",
            users:users
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}


export const create_attendencedate = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }
        const { date } = req.body;
        if(!date){
            return next(new ErrorHandler("Please provide date",400,false))
        }
        const attendence_date = await Date_Attendence_Model.findOne({date:date});
        if(attendence_date){
            return next(new ErrorHandler("Date already exists",400,false))
        }
        await Date_Attendence_Model.create({date:date});
        return res.json({
            success:true,
            message:"Date created successfully"
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}


export const getall_attendencedate = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }
        const attendence_date =await Date_Attendence_Model.find({});
        if(!attendence_date){
            return next(new ErrorHandler("No date found",400,false))
        }
        return res.json({
            success:true,
            message:"Date fetched successfully",
            attendence_date:attendence_date
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}


export const createattendence = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }

        const { worker_id, date_id, attendence, daily_payment, lunch_payment, total_payment } = req.body;
        if(!worker_id || !date_id || !attendence || !daily_payment || !lunch_payment || !total_payment){
            return next(new ErrorHandler("Please provide all details",400,false))
        }
        const attendence_data = await Date_Attendence_Model.findById(date_id);
        if(!attendence_data){
            return next(new ErrorHandler("Date not found",400,false))
        }
        const worker_data = await UserModel.findById(worker_id);
        if(!worker_data){
            return next(new ErrorHandler("Worker not found",400,false))
        }
        const pre_exiting_attendence = await WorkerAttendence_Model.findOne({worker_id:worker_id,date_id:date_id});
        if(pre_exiting_attendence){
            return next(new ErrorHandler("Attendence already exists",400,false))
        }
        await WorkerAttendence_Model.create({
            worker_id:worker_id,
            date_id:date_id,
            attendence:attendence,
            daily_payment:daily_payment,
            lunch_payment:lunch_payment,
            total_payment:total_payment
        });

        return res.json({
            success:true,
            message:"Attendence created successfully"
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}


export const getattencence = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }

        const { date_id } = req.params;
        if(!date_id){
            return next(new ErrorHandler("Please provide date id",400,false))
        }
        const attendence_date = await Date_Attendence_Model.findById(date_id);
        if(!attendence_date){
            return next(new ErrorHandler("Date not found",400,false))
        }
        const attendence_data = await WorkerAttendence_Model.find({date_id:date_id});
        if(!attendence_data){
            return next(new ErrorHandler("Attendence not found",400,false))
        }
        return res.json({
            success:true,
            message:"Attendence fetched successfully",
            attendence_data:attendence_data
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}


export const updateattendence = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }
        const { id } = req.params;
        if(!id){
            return next(new ErrorHandler("Please provide attendence id",400,false))
        }
        const attendence_data = await WorkerAttendence_Model.findById(id);
        if(!attendence_data){
            return next(new ErrorHandler("Attendence not found",400,false))
        }
        const { attendence, daily_payment, lunch_payment, total_payment } = req.body;
        if(
            attendence === undefined || attendence === null || 
            daily_payment === undefined || daily_payment === null || 
            lunch_payment === undefined || lunch_payment === null || 
            total_payment === undefined || total_payment === null
        ){
            return next(new ErrorHandler("Please provide all details",400,false))
        }
        
      
        await WorkerAttendence_Model.findByIdAndUpdate(id,{
            attendence:attendence,
            daily_payment:daily_payment,
            lunch_payment:lunch_payment,
            total_payment:total_payment
        });
        return res.json({
            success:true,
            message:"Attendence updated successfully"
        })

    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}

export const deleteattendence = async(req,res,next)=>{
    try {
        const { userid } = req.user;
        const user_data = await UserModel.findById(userid);
        if(user_data.role != "admin"){
            return next(new ErrorHandler("Please Login as Admin",401,false))
        }
        const { id } = req.params;
        if(!id){
            return next(new ErrorHandler("Please provide attendence id",400,false))
        }
       
        const attendence_data = await WorkerAttendence_Model.findById(id);
        if(!attendence_data){
            return next(new ErrorHandler("Attendence not found",400,false))
        }
        await WorkerAttendence_Model.findByIdAndDelete(id);
        return res.json({
            success:true,
            message:"Attendence deleted successfully"
        })
    } catch (error) {
      return next(new ErrorHandler(error.message,500,false))
    }
}