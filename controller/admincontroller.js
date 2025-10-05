import {UserModel} from "../model/user.model.js"
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