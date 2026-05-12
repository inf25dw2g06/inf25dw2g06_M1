const { Project, User, Task } = require('../models');

// GET - Listar apenas os projetos do utilizador logado
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { UserId: req.user.id }, // Requisito: Apenas os seus próprios recursos
            include: [{ model: Task }] // 1:N - Ver as tarefas do projeto
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar projetos', detalhe: error.message });
    }
};

// POST - Criar projeto associado ao utilizador logado
exports.createProject = async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body,
            UserId: req.user.id 
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar projeto', detalhe: error.message });
    }
};

// PUT - Atualizar projeto
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findOne({ where: { id: req.params.id, UserId: req.user.id } });
        if (!project) return res.status(404).json({ erro: 'Projeto não encontrado ou sem permissão' });
        
        await project.update(req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar', detalhe: error.message });
    }
};

// DELETE - Apagar projeto
exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.destroy({ where: { id: req.params.id, UserId: req.user.id } });
        if (!deleted) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.status(200).json({ mensagem: 'Projeto eliminado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao eliminar', detalhe: error.message });
    }
};