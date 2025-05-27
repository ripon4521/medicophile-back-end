import { z } from "zod";




export const TokenSchema = z.object({
    body:z.object({

  token: z.string().min(1, "Token is required"),
})        
    })