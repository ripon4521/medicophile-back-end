import express, { Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./route/route";
import { auth } from "./middlewares/auth";
import { onlySuperAdmin } from "./DB/onlySuperAdmin";

const app = express();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://admin.iconadmissionaid.com",
      "https://iconadmissionaid.com",
    ],
  }),
);

// middleware
app.use(express.json());
// router.use(  auth.authUser('admin'), onlySuperAdmin);
app.use("/api/v1", router);

const getAcontroller = (req: Request, res: Response) => {
  res.send("🚀 Welcome SuperAdmin to the School Management System");
};

app.get("/", auth.authUser("superAdmin"), onlySuperAdmin, getAcontroller);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
