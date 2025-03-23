import { IModules } from "./modules.interface";
import ModuleModel from "./modules.model";

const createModule = async ( payload:IModules) => {
    const result = await ModuleModel.create(payload);
    return result
}