import { Request, Response } from 'express';
import knex from '../database/connection';

class DriverController {

    async create(req: Request, res: Response) {
        try {
            const {
                name,
                lastname,
                phone,
                password,
                num_drive_card
            } = req.body;

            const driver = await knex('driver').insert({ name, lastname, phone, password, num_drive_card });
            const id = driver[0];

            return res.json({id, name, lastname, phone, password, num_drive_card});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const driver = await knex("driver").select("*");

            return res.json(driver);
        } catch(error) {
            return res.status(500).json();
        }
    }

    async show(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const driver = await knex("driver").where("id", id).select("*");

            return res.json(driver);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                name,
                lastname,
                phone,
                password,
                num_drive_card
            } = req.body;
            const update = await knex("rout").where({ id }).update({name, lastname, phone, password, num_drive_card});

            return res.json(update ? {id, name, lastname, phone, password, num_drive_card, isUpdated: true} : {idUpdated: false});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("driver").where({id}).del();

            return res.json(remove ? {id, isRemoved: true} : {idUpdated: false})
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default DriverController;