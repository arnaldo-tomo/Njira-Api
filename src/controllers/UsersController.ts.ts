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
class UserController {
    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @return {object} Object representing a response message.
     */
    async create(req: Request, res: Response) {
        try {
            const {
                firstname,
                lastname,
                username,
                email,
                phone,
                password,
            } = req.body;

            const saltRound = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password, saltRound);

            const user = {
                firstname,
                lastname,
                username,
                email,
                phone,
                password: hash
            };

            const id = await knex('user').insert(user);

            return res.json({ id: id[0], firstname, lastname, username, email, phone, password });            
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async index(req: Request, res: Response) {
        try {
            const user = await knex("user").select("id", "firstname", "lastname", "username", "email", "phone", "balance", "last_connection", "created_at", "updated_at", "verified");

            return res.json(user);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async show(req: Request, res:Response) {
        try {
            const { id } = req.params;
            const user = await knex("user").where("id", id).select("id", "firstname", "lastname", "username", "email", "phone", "balance", "last_connection", "created_at", "updated_at", "verified");

            return res.json(user);
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
                username,
                email,
                phone
            } = req.body;

            const updateTime = knex.fn.now();
     
            const update = await knex("user").where({ id }).update({ firstname, lastname, username, email, phone, updated_at: updateTime});

            return res.json(update ? {id, firstname, lastname, username, email, phone, isUpdated: true} : {idUpdated: false});
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("user").where({id}).del();

            return res.json(remove ? {id, isRemoved: true} : {idUpdated: false})
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {
                email,
                password
            } = req.body;

            if (!email || !password)
                return res.status(400).json('Please enter your password!');

            const user = await knex("user").where("email", "password").select("password");
            const userId = await knex("user").where("email", email).select("id");
            const userData = await knex("user").where("email", email).select("firstname", "lastname", "email", "username");

            if(String(user[0]) === 'undefined')
                return res.status(400).json({ error: 'Email not exist' });

            
            if(!await bcrypt.compare(password, String(user[0].password))) 
                return res.status(400).json({ error: 'Invalid password' });
 
            return res.json({
                userData,
                token: generateToken({ id: userId }),
            });
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default UserController;