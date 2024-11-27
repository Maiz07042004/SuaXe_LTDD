import CuaHang from "../models/cuaHang.interface"
import { Request, Response } from "express"

// [GET]/api/v1/cuaHang/:IdQuan
export const index = async (req: Request, res: Response) => {
  const cuaHang = await CuaHang.find({
    IdQuan:req.params.IdQuan
  })

  res.json({
    code:"200",
    cuaHang
  })
}

// [GET]/api/v1/cuaHang/detail/:id

export const detail=async (req:Request,res:Response)=>{
  const id: string = req.params.id
  const cuaHang=await CuaHang.findOne({
    _id:id
  })
  res.json({
    code:"200",
    cuaHang
  })
}