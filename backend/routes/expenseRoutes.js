import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    addExpense, 
    editExpense, 
    fetchCategories, 
    fetchExpenses, 
    removeExpense 
} from '../controllers/expenseController.js';


const router = express.Router();

router.use(protect);

router.get('/categories', fetchCategories);
router.post('/', addExpense);
router.get('/', fetchExpenses);
router.put('/:id', editExpense);
router.delete('/:id', removeExpense);

export default router;