import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createexpenseSchema, updateexpenseSchema } from "./account.validation";
import { accountsController } from "./accounts.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const accountsRouter =Router();
accountsRouter.get('/income-report', accountsController.getIncomeReport);
accountsRouter.get('/expence-report', accountsController.getExpenseReport);
accountsRouter.post('/create-expense', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager") ,validateRequest(createexpenseSchema), accountsController.createExpense);
accountsRouter.get('/all-expense', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager") , accountsController.getAllExpense);
accountsRouter.get('/all-income-order', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager") , accountsController.getAllIncomeOrder);
accountsRouter.get('/all-income-sales', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager") , accountsController.getAllIncomeSales);
accountsRouter.get('/single-expense/:slug', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager") , accountsController.getSingleExpense);
accountsRouter.patch('/update-expense/:slug', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager") , validateRequest(updateexpenseSchema), accountsController.updateExpense);
accountsRouter.delete('/delete-expense/:slug', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , accountsController.deleteExpense);
accountsRouter.delete('/delete-income-order/:id', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , accountsController.deleteIncomeOrder);
accountsRouter.delete('/delete-income-sales/:id', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , accountsController.deleteIncomeSales);
export default accountsRouter;