const ApiError = require('../errors/ApiError');;
const TaskService = require('../service/TaskService');
const {validationResult} = require('express-validator');

class TaskController {

    async getTasks(req, res, next){
        try{
            const {projectId} = req.params;
            const tasks = await TaskService.getTasks(projectId);
            return res.json({tasks})
        } catch (e) {
            next(e);
        }
    }

    async createTask(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("Invalid data", errors))
            }
            const {projectId} = req.params;
            const {title, description, timeAllotted, statusId, typeId, userId} = req.body;
            const task = await TaskService.createTask(projectId, title, description, timeAllotted, statusId, typeId, userId);
            return res.json({task})
        } catch (e) {
            next(e);
        }
    }

    async deleteTask(req, res, next){
        try {
            const {id} = req.params;
            const isDone = await TaskService.deleteTask(id);
            return res.json({deleted: isDone})
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TaskController();