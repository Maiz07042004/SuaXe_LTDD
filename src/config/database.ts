import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL!, {
            connectTimeoutMS: 20000, // Tăng thời gian chờ kết nối lên 20 giây
        })
        console.log("Connect Success");
    } catch (error) {
        console.log("Connect Error ")
    }
}