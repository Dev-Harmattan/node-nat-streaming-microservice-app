import {Router} from 'express';
const router = Router();
import {showTicket} from '../controllers/showTicketController';


router.get('/api/tickets/:id', showTicket)

export {router as showTicketRouter};