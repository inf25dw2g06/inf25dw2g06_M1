'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    const users = [];
    for (let i = 1; i <= 30; i++) {
      users.push({
        username: `UserApi${i}`,
        email: `User${i}@umaia.pt`,
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Users', users, {});

    
    const projects = [];
    for (let i = 1; i <= 30; i++) {
      projects.push({
        title: `Projeto ${i}`,
        description: `Projeto :  ${i}.`,
        UserId: i, 
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Projects', projects, {});

    
    const tasks = [];
    for (let i = 1; i <= 30; i++) {
      tasks.push({
        title: `Tarefa${i}`,
        status: i % 2 === 0 ? 'concluída' : 'pendente',
        ProjectId: i, 
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Tasks', tasks, {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};