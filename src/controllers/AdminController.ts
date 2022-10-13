import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

class AdminController {
    /**
     * @memberof AdminController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @return {object} Object representing a response message.
     */
    async create(req: Request, res: Response) {
        try {
            const {
                firstname,
                lastname,
                password
            } = req.body;

            const saltRound = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password, saltRound);

            const admin = {
                firstname,
                lastname,
                password: hash
            };

            const id = await knex('admin').insert(admin);

            return res.json({ id: id[0], firstname, lastname });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const admin = await knex("admin").select("id","firstname","lastname");

            return res.json(admin);
        } catch(error) {
            return res.status(500).json();
        }
    }

    async show(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const admin = await knex("admin").where("id", id).select("id","firstname","lastname");

            return res.json(admin);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                firstname,
                lastname,
            } = req.body;
            const update = await knex("admin").where({ id }).update({ firstname, lastname });

            return res.json(update ? {id, firstname, lastname, isUpdated: true} : {idUpdated: false});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("admin").where({id}).del();

            return res.json(remove ? {id, isRemoved: true} : {idUpdated: false})
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {
                firstname,
                lastname,
                password
            } = req.body;

            const admin = await knex("admin").where({ firstname, lastname }).select("firstname, password");
            const comparePassword = await knex("admin").where("password", password).select("password");

            if(String(name) === 'undefined')
                return res.status(400).json({ error: 'Admin did not found!' });

            
            if(!await bcrypt.compare(comparePassword, String(admin[0].password))) 
                return res.status(400).json({ error: 'Invalid password' });
 
            return res.json({
                admin,
                token: generateToken({ id: admin }),
            });
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default AdminController;