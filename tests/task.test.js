const request = require('supertest');
const app = require('../index.js');
require('dotenv').config();
const Task = require('../models/Task.js');
const {JWT_SECRET} = process.env;

describe('Endpoints testing', () => {
	afterAll(async () => {
		return await Task.deleteMany();
	});

    const task = {
        titulo: 'Comprar jamon'
    };

    let _id;
    test('create', async () =>{
        const res = await request(app).post('/task').send(task).expect(201);
        const testTask = {
            ...task,
            _id: res.body.createTask._id,
            createdAt: res.body.createTask.createdAt,
            updatedAt: res.body.createTask.updatedAt
        }
        _id = res.body.createTask._id;
        expect(res.body.createTask).toEqual(testTask);
    }),
    test('getTaskById', async () => {
        const res = await request(app).get(`/task/id/${_id}`).expect(200);
        expect(res.body.msg).toBe('La tarea ha sido encontrada');
    }),
    test('findByName', async ()=> {
        const res = await request(app).get('/task/titulo/jamon').expect(200);
        expect(res.body.msg).toBe('Tarea encontrada:');
    })
    test('updateTask', async ()=> {
        const res = await request(app).put(`/task/id/${_id}`).expect(200);
        expect(res.body.msg).toBe('Tarea actualizada');
    })
    test('getAll', async ()=> {
        const res = await request(app).get(`/task/`).expect(200);
        expect(res.body.msg).toBe('Todas las tareas');
    })
    test('deleteTask', async ()=> {
        const res = await request(app).delete(`/task/id/${_id}`).expect(200);
        expect(res.body.msg).toBe('Tarea eliminada');
    })
});