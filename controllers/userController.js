const { User } = require('../models'); 

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const usersWithoutPassword = users.map(u => {
            const { password, ...userSafe } = u.toJSON();
            return userSafe;
        });
        res.status(200).json(usersWithoutPassword);
    } catch (error) {
        res.status(500).json({ erro: 'Falha ao listar users', detalhe: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar user', detalhe: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ erro: 'User não encontrado' });
        await user.update(req.body);
        res.status(200).json({ mensagem: 'Utilizador atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar', detalhe: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ erro: 'User não encontrado' });
        res.status(200).json({ mensagem: 'Utilizador aniquilado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao eliminar', detalhe: error.message });
    }
};