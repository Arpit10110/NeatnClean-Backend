import mongoose from 'mongoose';

const workerAttendenceSchema = new mongoose.Schema({
    worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'createdateattendence',
        required: true
    },
    attendence: {
        type: String,
        required: true,
    },
    daily_payment: {
        type: Number,
        required: true,
    },
    lunch_payment: {
        type: Number,
        required: true,
    },
    total_payment: {
        type: Number,
        required: true,
    }
})

const Date_Attendence = new mongoose.Schema({
    date:{
        type:String,
        required:true,
        default:Date.now()
    }
})

export const Date_Attendence_Model = mongoose.models.createdateattendence || mongoose.model('createdateattendence', Date_Attendence);

export const WorkerAttendence_Model = mongoose.models.workerattendence || mongoose.model('workerattendence', workerAttendenceSchema);