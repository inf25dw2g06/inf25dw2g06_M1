const auth = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log(`[${new Date().toISOString()}] Pedido de: ${req.user.username} (ID: ${req.user.id})`);
        return next();
    }
    res.status(401).json({ erro: "Autenticação necessária" });
};

module.exports = auth;