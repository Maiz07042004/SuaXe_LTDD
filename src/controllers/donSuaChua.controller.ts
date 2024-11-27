import { Request, Response } from "express"
import DonSuaChua from "../models/donSuaChua.model"

// [GET]/api/v1/donSuaChua/:userId
export const index = async (req: Request, res: Response) => {
  const userId=req.params.userId
  const donSuaChua = await DonSuaChua.find({IdKhachHang:userId})

  res.json(donSuaChua)
}