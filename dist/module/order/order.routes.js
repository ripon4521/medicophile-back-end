"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Create a new Order ----------done
router.post('/confirm-order', order_controller_1.OrderControllers.createOrder);
// checkout 
router.post('/checkout', order_controller_1.OrderControllers.CheckoutOrder);
// Get all order -------- done
router.get('/', order_controller_1.OrderControllers.getAllOrder);
router.get('/revenue', order_controller_1.OrderControllers.getTotalOrderRevenue);
// Get a single order by ID----done
router.get('/:orderId', order_controller_1.OrderControllers.getSingleOrder);
// Update a order by ID ----------- done
router.put('/:orderId', order_controller_1.OrderControllers.updateOrder);
// Delete a order by ID ---------- done
router.delete('/:orderId', order_controller_1.OrderControllers.deleteOrder);
exports.OrderRoutes = router;
