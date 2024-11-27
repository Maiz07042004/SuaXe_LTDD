import Quan from "../models/quan.model"
import { Request, Response } from "express"

// [GET]/api/v1/quan
export const index = async (req: Request, res: Response) => {
  const quan = await Quan.find()

  res.json(quan)
}
