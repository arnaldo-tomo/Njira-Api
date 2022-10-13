import { Request, Response } from 'express';
import knex from '../database/connection';

class TravelController {
    
    async travel(req: Request, res: Response) {
        try {
            const {
                rate,
                boarding,
                landing,
                idcar,
                iduser,
                idpayment
            } = req.body; 
            const travel = await knex('travel').insert({ rate, boarding, landing, idcar, iduser, idpayment });
            const id = travel[0];

            return res.json({ id, rate, boarding, landing, idcar, iduser, idpayment });
        } catch(error) {
            return res.status(500).json(error);
        }
    } 
}

export default TravelController;