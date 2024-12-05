import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL!||"mongodb+srv://dangmai19112016:eoE2wU0wpl14FcSv@cluster0.rtmaf4t.mongodb.net/suaxe-app", {
            connectTimeoutMS: 20000, // Tăng thời gian chờ kết nối lên 20 giây
        })
        console.log("Connect Success");
    } catch (error) {
        console.log("Connect Error ")
    }
}