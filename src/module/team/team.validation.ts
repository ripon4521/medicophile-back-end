

import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
 const createTeamSchema = z.object({
    body:z.object({

  name: z.string().min(1, "Name is required"), 
  description: z.string().min(1, "Description is required").optional(), 
  profileImg: z.string().url("Invalid URL format for profile image").optional(), 
  createdBy:ObjectIdSchema, 
  status: z.enum(["Active", "Inactive", "Archived"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be one of: active, inactive, archived",
  }),
  members: z.array(ObjectIdSchema, {
    required_error: "Members list is required",
    invalid_type_error: "Members must be a list of ObjectIds",
  }).optional()
          
})
});

const updateTeamSchema = z.object({
    body:z.object({

    name: z.string().min(1, "Name is required").optional(), 
    description: z.string().min(1, "Description is required").optional(), 
    profileImg: z.string().url("Invalid URL format for profile image").optional(), 
    createdBy: ObjectIdSchema.optional(), 
    status: z.enum(["Active", "Inactive", "Archived"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be one of: active, inactive, archived",
      }).optional(),
      members: z.array(ObjectIdSchema, {
        required_error: "Members list is required",
        invalid_type_error: "Members must be a list of ObjectIds",
      }).optional()
              
    })
  });

export const teamValidation = {
    createTeamSchema,
    updateTeamSchema
}
