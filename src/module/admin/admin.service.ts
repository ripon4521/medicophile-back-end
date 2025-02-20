import User from "../user/user.model";

const blockUser = async (userId: string) => {
    const result = await User.findByIdAndUpdate(
        userId,
        { isBlocked: true },
        { new: true } 
    )
    return result;
};

const deleteBlog = async (blogId: string) => {
};

export const adminService = {
    blockUser,
    deleteBlog,
};
