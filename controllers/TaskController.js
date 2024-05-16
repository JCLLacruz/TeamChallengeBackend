const Task = require('../models/Task.js');

const TaskController = {
	async create(req, res) {
		try {
			const task = {
				...req.body,
				//userId: req.user._id,
			};
			const createTask = await Task.create(task);
			// // await User.findByIdAndUpdate(req.params._id, {
			//   $push: {postId: createTask._id}})
			res.status(201).send({ msg: 'Ehorabuena acabas de crear una tarea', createTask });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'Ha habido un problema al crear la tarea', error });
		}
	},
	async getTaskById(req, res) {
		try {
			const task = await Task.findById(req.params._id);
			res.send({msg:'La tarea ha sido encontrada',task});
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'Lo sentimos, no hemos podido encontrar esta tarea', error });
		}
	},
	async findByName(req, res) {
		try {
			const task = await Task.findOne({ $text: { $search: req.params.titulo } });
			res.send({ msg: 'Tarea encontrada:', task });
		} catch (error) {
			console.error(error);
			res.statud(500).send({ msg: 'Problema de servidor', error });
		}
	},
	async updateTask(req, res) {
		try {
			const task = await Task.findByIdAndUpdate(req.params._id ,req.body, { new: true });
			res.send({ msg: 'Tarea actualizada', task });
		} catch (error) {
			console.error(error);
			res.statud(500).send({ msg: 'Problema de servidor', error });
		}
	},
	async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
			const tasks = await Task.find()
            .limit(limit)
            .skip((page - 1) * limit);
			res.send({msg:'Todas las tareas', tasks});
		} catch (error) {
            console.error(error);
		}
	},
    async deleteTask(req, res) {
        try {
            const task = await Task.findByIdAndDelete({ _id: req.params._id });
            res.send({ msg: 'Tarea eliminada', task });
        } catch (error) {
            console.error(error);
            res.statud(500).send({ msg: 'Problema de servidor', error });
        }
    },
};
module.exports = TaskController;
