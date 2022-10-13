import express from 'express';
import UsersController from './controllers/UsersController.ts';
import AdminController from './controllers/AdminController';
import CarController from './controllers/CarController';
import DriverController from './controllers/DriverController';
import PackageController from './controllers/PackageController';
import PaymentController from './controllers/PaymentController';
import RoutController from './controllers/RoutController';
import TravelController from './controllers/TravelController';

const routes = express.Router();

const userController = new UsersController();
const adminController = new AdminController();
const carController = new CarController();
const driverController = new DriverController();
const packageController = new PackageController();
const paymentController = new PaymentController();
const routController = new RoutController();
const travelController = new TravelController();

// User
routes.get('/user', userController.index); // Listar usuários
routes.get('/user/:id', userController.show); // Listar usuário específico
routes.post('/user', userController.create); // Criar usuário
routes.delete('/user', userController.remove); // Remover usuário
routes.put('/user/:id', userController.update); // Atualizar usuário específico
routes.post('/login', userController.login); // Autenticação do usuário

// Admin
routes.get('/admin', adminController.index);
routes.get('/admin/:id', adminController.show);
routes.post('/admin', adminController.create);
routes.delete('/admin', adminController.remove);
routes.put('/admin/:id', adminController.update);
routes.post('/login', adminController.login);

// Car
routes.get('/car', carController.index);
routes.get('/car/:id', carController.show);
routes.post('/car', carController.create);
routes.delete('/car', carController.remove);
routes.put('/car/:id', carController.update);

// Driver
routes.get('/driver', driverController.index);
routes.get('/driver/:id', driverController.show);
routes.post('/driver', driverController.create);
routes.delete('/driver', driverController.remove);
routes.put('/driver/:id', driverController.update);

// Package
routes.get('/package', packageController.index);
routes.get('/package/:id', packageController.show);
routes.post('/package', packageController.create);
routes.delete('/package', packageController.remove);
routes.put('/package/:id', packageController.update);

// Payment
routes.get('/payment', paymentController.index);
routes.get('/payment/:id', paymentController.show);
routes.post('/payment', paymentController.pay);

// Rout
routes.get('/rout', routController.index);
routes.get('/rout/:id', routController.show);
routes.post('/rout', routController.create);
routes.delete('/rout', routController.remove);
routes.put('/rout/:id', routController.update);

// Travel
routes.post('/travel', travelController.travel);

export default routes;