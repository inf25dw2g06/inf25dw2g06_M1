const express = require('express');
const session = require('express-session');
const passport = require('./config/auth');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(session({
    secret: "my top secret key",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.json({ 
            mensagem: "Login efetuado com sucesso!", 
            utilizador: req.user.username,
            id_github: req.user.id
        });
    } else {
        res.json({ mensagem: "Bem-vindo! Faz login em /auth/github" });
    }
});

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/auth/github/callback", 
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
        
        console.log("----");
        console.log("UTILIZADOR AUTENTICADO COM SUCESSO!");
        console.log("Username GitHub:", req.user.username);
        console.log("ID Único:", req.user.id);
        console.log("-----");
        res.redirect("/");
    }
);

app.get("/logout", function (req, res) {
    req.logout(function(err) { 
        if(err){ 
            console.log(err); 
        } 
        res.redirect("/"); 
    });
});

const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log('Servidor na porta 3000!');
});