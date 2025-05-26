import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createexpenseSchema, updateexpenseSchema } from "./account.validation";
import { accountsController } from "./accounts.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const accountsRouter =Router();
accountsRouter.post('/create-expense', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager", "shopManager") ,validateRequest(createexpenseSchema), accountsController.createExpense);
accountsRouter.get('/all-expense', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager", "shopManager") , accountsController.getAllExpense);
accountsRouter.get('/all-income-order', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager", "shopManager") , accountsController.getAllIncomeOrder);
accountsRouter.get('/all-income-sales', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager", "shopManager") , accountsController.getAllIncomeSales);
accountsRouter.get('/single-expense/:slug', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager", "shopManager") , accountsController.getSingleExpense);
accountsRouter.patch('/update-expense/:slug', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager", "shopManager") , validateRequest(updateexpenseSchema), accountsController.updateExpense);
accountsRouter.delete('/delete-expense/:slug', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager") , accountsController.deleteExpense);
accountsRouter.delete('/delete-income-order/:id', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager") , accountsController.deleteIncomeOrder);
accountsRouter.delete('/delete-income-sales/:id', authUser(), onlyAdminAndFacultyAndStudent("admin", "shopManager") , accountsController.deleteIncomeSales);
export default accountsRouter;