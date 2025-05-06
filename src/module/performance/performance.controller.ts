import { Request, Response } from "express";
import { getStudentPerformance } from "./performance.service";


export const fetchPerformance = async (req:Request, res:Response) => {
  try {
    const studentId = req.params.id;
    const data = await getStudentPerformance(studentId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching performance", error });
  }
};
