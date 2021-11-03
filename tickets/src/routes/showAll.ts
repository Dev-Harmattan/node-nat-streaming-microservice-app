import { Router } from "express";
const router = Router();
import {showAllTickets} from '../controllers/showAllController';

router.get('/api/tickets', showAllTickets);


export {router as showAllTicketRouter} 