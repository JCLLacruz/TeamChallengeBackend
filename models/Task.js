const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaType.ObjectId;

const TaskSchema = new mongoose.Schema (
    {
        titulo: {type: String, required: true},
        completado: Boolean
    },
    {timestamps: true}
);

TaskSchema.methods.toJSON = function () {
	const task = this._doc;
	delete task.__v;
	return task;
};

TaskSchema.index({titulo: 'text'});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;