import { Request, Response } from 'express';
import knex from '../database/connection';
class PackageController {

    async create(req: Request, res: Response) {
        try {
            const {
                name,
                price,
                terminate
            } = req.body;

            const packagetrip = await knex('package').insert({ name, price, terminate });
            const id = packagetrip[0];

            return res.json({id, name, price, terminate});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const packagetrip = await knex("user").select("*");
            const id = packagetrip[0];

            return res.json({id, packagetrip});
        } catch(error) {
            return res.status(500).json();
        }
    }

    async show(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const packagetrip = await knex("package").where("id", id).select("*");

            return res.json(packagetrip);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                name,
                price,
                terminate
            } = req.body;
            const update = await knex("package").where({ id }).update({name, price, terminate});

            return res.json(update ? {id,name, price, terminate, isUpdated: true} : {idUpdated: false});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("package").where({id}).del();

            return res.json(remove ? {id, isRemoved: true} : {idUpdated: false})
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    
}

export default PackageController;