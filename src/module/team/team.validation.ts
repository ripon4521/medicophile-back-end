

import { z } from "zod";
import { Types } from "mongoose";
const objectId = z.custom<Types.ObjectId>((val) => {
    return val instanceof Types.ObjectId;
  }, {
    message: "Invalid ObjectId format",
  });
 const createTeamSchema = z.object({
  name: z.string().min(1, "Name is required"), 
  description: z.string().min(1, "Description is required").optional(), 
  profileImg: z.string().url("Invalid URL format for profile image").optional(), 
  createdBy: z.instanceof(Types.ObjectId).refine((val) => val instanceof Types.ObjectId, "Invalid ObjectId"), 
  status: z.enum(["active", "inactive", "archived"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be one of: active, inactive, archived",
  }),
  members: z.array(objectId, {
    required_error: "Members list is required",
    invalid_type_error: "Members must be a list of ObjectIds",
  }),
});

const updateTeamSchema = z.object({
    name: z.string().min(1, "Name is required").optional(), 
    description: z.string().min(1, "Description is required").optional(), 
    profileImg: z.string().url("Invalid URL format for profile image").optional(), 
    createdBy: z.instanceof(Types.ObjectId).refine((val) => val instanceof Types.ObjectId, "Invalid ObjectId").optional(), 
  });

export const teamValidation = {
    createTeamSchema,
    updateTeamSchema
}
