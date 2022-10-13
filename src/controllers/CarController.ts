import { Request, Response } from 'express';
import knex from '../database/connection';

class CarController {
    /**
         * @memberof CarController
         * @param {object} req Request made to the route.
         * @param {object} res Response defined by the controller.
         * @return {object} Object representing a response message.
         */
    async create(req: Request, res: Response){
        try{
            const {
                registration,
                capacity,
                brand,
                model,
                cod_booklet,
                balance,
                idrout,
                iddriver,
                owner
            } = req.body;

            const car = await knex('car').insert({ registration, capacity, brand, model, cod_booklet, balance, idrout, iddriver, owner });
            const id = car[0];

            return res.json({ id, registration, capacity, brand, model, cod_booklet, balance, idrout, iddriver, owner });
        }catch(error) {
            return res.json(error);
        }
    }

    async index(req: Request, res: Response){
        try {
            const car = await knex('car').select('*');

            return res.json(car);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async show(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const car = await knex("car").where("id", id).select("*");

            return res.json(car);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                registration,
                capacity,
                brand,
                model,
                cod_booklet,
                balance,
                idrout,
                iddriver,
                owner
            } = req.body;
            const update = await knex("car").where({ id }).update({ registration, capacity, brand, model, cod_booklet, balance, idrout, iddriver, owner });

            return res.json(update ? { registration, capacity, brand, model, cod_booklet, balance, idrout, iddriver, owner, isUpdated: true} : {idUpdated: false});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("car").where({id}).del();

            return res.json(remove ? {id, isRemoved: true} : {idUpdated: false})
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default CarController;