import { model, Schema } from "mongoose";
import { IBookCategory } from "./bookCategory.interface";
import slugify from "slugify";



const BookCategorySchema = new Schema<IBookCategory>(
    {
       slug:{
        type:String,
        unique:true
       }, 
      name: {
        type: String,
        required: true,
        trim: true,
      },
      createdBy:{
        type:Schema.Types.ObjectId,
        required:true
      },
      description: {
        type: String,
        default: "",
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      deletedAt: {
        type: Date,
      },
    },
    {
        timestamps: {
          currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
        },
      }
  );


  BookCategorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });
  
  const BookCategoryModel = model<IBookCategory>("BookCategory", BookCategorySchema);
  
  export default BookCategoryModel;