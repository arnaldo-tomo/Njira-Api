import { Request, Response } from 'express';
import knex from '../database/connection';

class RoutController {

    async create(req: Request, res: Response) {
        try {
            const {
                name,
                terminal,
                num_of_cars
            } = req.body;

            const rout = await knex('rout').insert({ name, terminal, num_of_cars });
            const id = rout[0];

            return res.json({id, name, terminal, num_of_cars});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const rout = await knex("rout").select("*");

            return res.json(rout);
        } catch(error) {
            return res.status(500).json();
        }
    }

    async show(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const rout = await knex("rout").where("id", id).select("*");

            return res.json(rout);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                name,
                terminal,
                num_of_cars
            } = req.body;
            const update = await knex("rout").where({ id }).update({name, terminal, num_of_cars});

            return res.json(update ? {id,name, terminal, num_of_cars, isUpdated: true} : {idUpdated: false});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("rout").where({id}).del();

            return res.json(remove ? {id, isRemoved: true} : {idUpdated: false})
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default RoutController;