const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

const taskController = {
        // Crear una tarea
    create: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            const { projectId } = req.body;

            // Revisar Id del proyecto 
            const project = await Project.findById(projectId);

            // Verificar el el proyecto existe 
            if(!project){
                return res.status(404).json({msg: 'Proyecto no encontado'});
            };

            // Vefificar el creador del proyecto 
            if(project.creator.toString() == req.user.id){

                // Creamos una nueva tarea en un proyecto
                let task = new Task(req.body);
                await task.save();
                res.status(200).json({ task });

            } else {
                return res.status(401).json({msg: 'Usuario no autorizado'});
            };

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error en el servidor')
        }
    },

    // Listar tareas
    list: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            const { projectId } = req.body;

            // Revisar Id del proyecto 
            const project = await Project.findById(projectId);

            // Verificar el el proyecto existe 
            if(!project){
                return res.status(404).json({msg: 'Proyecto no encontado'});
            };

            // Vefificar el creador del proyecto 
            if(project.creator.toString() == req.user.id){

                // Obtenemos tareas de un proyecto
                const tasks = await Task.find({ projectId: projectId })
                res.status(200).json({ tasks });

            } else {
                return res.status(401).json({msg: 'Usuario no autorizado'});
            };

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error en el servidor')
        }
    },

    // Actualizar un proyecto
    update: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            const { projectId, status, taskName } = req.body;

            // Revisar Id del proyecto 
            const project = await Project.findById(projectId);

            // Verificar si el proyecto existe 
            if(!project){
                return res.status(404).json({msg: 'Proyecto no encontado'});
            };

            // Revisar tarea por id
            let task = await Task.findById(req.params.id);
            
            // Verificar si la tarea existe 
            if(!task){
                return res.status(404).json({msg: 'Tarea no encontada'});
            };

            // Vefificar el creador del proyecto 
            if(project.creator.toString() == req.user.id){

                // Actualizar con mongoose la tarea
                task.taskName = taskName;
                task.status = status;
                await Task.findByIdAndUpdate({_id: req.params.id}, {$set: task}, {new: true});
                res.status(200).json({ task });

            } else {
                return res.status(401).json({msg: 'Usuario no autorizado'});
            };

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error en el servidor')
        }
    },

    destroy: async (req, res) => {
       const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            const { projectId } = req.body;

            // Revisar Id del proyecto 
            const project = await Project.findById(projectId);

            // Verificar si el proyecto existe 
            if(!project){
                return res.status(404).json({msg: 'Proyecto no encontado'});
            };

            // Revisar tarea por id
            let task = await Task.findById(req.params.id);
            
            // Verificar si la tarea existe 
            if(!task){
                return res.status(404).json({msg: 'Tarea no encontada'});
            };

            // Vefificar el creador del proyecto 
            if(project.creator.toString() == req.user.id){

                // Eliminamos la tarea
                await Task.findOneAndRemove({_id: req.params.id});
                res.status(200).json({ msg: 'La tarea se eliminó correctamente' });

            } else {
                return res.status(401).json({msg: 'Usuario no autorizado'});
            };

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error en el servidor')
        }
    },
};

module.exports = taskController;