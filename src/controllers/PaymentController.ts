import { Request, Response } from 'express';
import knex from '../database/connection';

class PaymentController {
    async pay(req: Request, res: Response){
        try {
            const {
                car,
                user
            } = req.body;
            const pay = await knex('payment').insert({ car, user });
            const id = pay[0];

            return res.json({ id, car, user });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const payment = await knex('payment').select('*');

            return res.json(payment);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const payment = await knex('payment').where("id", id).select('*');

            return res.json(payment);
        }catch(error) {
            return res.status(500).json(error);
        }
    }

    
}

export default PaymentController;