const { Task, Project } = require('../models');

// POST Criar
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar tarefa', detalhe: error.message });
    }
};

// GET Listar
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ include: [Project] });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar tarefas', detalhe: error.message });
    }
};

// PUT Atualizar
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        
        await task.update(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar', detalhe: error.message });
    }
};

// DELETE Apagar
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.status(200).json({ mensagem: 'Tarefa eliminada com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao eliminar', detalhe: error.message });
    }
};