import config from "../config";
import { USER_ROLE } from "../module/user/user.constants";
import { IUser } from "../module/user/user.interface";
import { UserModel } from "../module/user/user.model";

// super admin data
const superAdminData: Partial<IUser> = {
  name: "Rk Ripon Khan",
  email: "riponakondo4521@gmail.com",
  phone: "01788829796",
  password: config.superAdminPassword as string,
  role: USER_ROLE.superAdmin,
  status: "Active",
};

// super admin query
const superAdminQuery = { role: USER_ROLE.superAdmin };

const seedSuperAdmin = async () => {
  // // check count of super admins, if it grater than limit of super admin delete all and initialize it
};

export default seedSuperAdmin;
