const Project = require('../models/Project');
const Task = require('../models/Task');
const { validationResult } = require('express-validator');

const projectController = {
    // Crear un proyecto
    create: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            // Creamos un nuevo proyecto
            let project = new Project(req.body);

            // Guardamos el creador via JWT
            project.creator = req.user.id;

            // Guadamos el proyecto
            await project.save();
            res.status(200).json({ project });

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'});
        }
    },

    // Listar proyectos
    list: async (req, res) => {
        try {
            // Obtener todos los proyectos del usuario logueado
            const projects = await Project.find({ creator: req.user.id }).sort({created: -1});
            res.status(200).json({ projects });

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'})
        }
    },

    // Actualizar un proyecto
    update: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            // Revisar Id 
            const project = await Project.findById(req.params.id);

            // Verificar el el proyecto existe 
            if(!project){
                return res.status(404).json({msg: 'Proyecto no encontrado'});
            }
            // Vefificar el creador del proyecto 
            if(project.creator.toString() == req.user.id){
                
                // Actualizar datos del body
                project.projectName = req.body.projectName;

                // Actualizar con mongoose
                await Project.findByIdAndUpdate({_id: req.params.id}, {$set: project}, {new: true});
                res.status(200).json({ project });
            } else {
                return res.status(401).json({msg: 'Usuario no autorizado'});
            };

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'})
        }
    },

    destroy: async (req, res) => {
        try {
            let project = await Project.findById(req.params.id);

            // Verificar el el proyecto existe 
            if(!project){
                return res.status(404).json({msg: 'Proyecto no encontrado'});
            };

            // Verificar creador 
            if(project.creator == req.user.id){

                // Eliminamos proyecto
                await Project.findOneAndRemove({_id: req.params.id});

                // Eliminamos tareas asociadas
               const tasks = await Task.find({ projectId: req.params.id });
               tasks.forEach(async task => {
                   await Task.findOneAndRemove({_id: task.id});
               });

                res.status(200).json({ msg: 'El proyecto se eliminó correctamente' });
            } else {
                return res.status(401).json({msg: 'Usuario no autorizado'});
            };

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'})
        }
    },
};

module.exports = projectController;