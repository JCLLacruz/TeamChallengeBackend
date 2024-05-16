const express = require('express');
const TaskController = require('../controllers/TaskController');
const router = express.Router();



router.post('/', TaskController.create);
router.get('/', TaskController.getAll);
router.get('/id/:_id', TaskController.getTaskById);
router.put('/id/:_id', TaskController.updateTask);
router.delete('/id/:_id', TaskController.deleteTask);
router.get('/titulo/:titulo', TaskController.findByName);




module.exports = router;