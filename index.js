const express = require('express');

const server = express();

server.use(express.json());

function checkProjectExist(req, res, next){
    const {id} = req.params;
    const project = projects.find(p => p.id == id);
    if(!project){
        return res.status(400).json({error: 'Project not found'});
    }

    return next();
}

const projects = [
    { id: "1", title: 'Node', tasks: [] },
    { id: "2", title: 'React', tasks: [] },
    { id: "3", title: 'React Native', tasks: [] },
];

server.get('/projects/', (req, res) => {
    return res.json(projects)
});

server.get('/projects/:id', checkProjectExist, (req, res) => {
    const {id} = req.params;
    const project = projects.find(p => p.id == id);
    return res.json(project);
});

server.post('/projects/', (req, res) => {
    const {id, title, tasks} = req.body;

    const project = {
        id, title, tasks
    };

    projects.push(project);
    return res.json(projects);
});

server.post('/project/:id/tasks', checkProjectExist, (req, res) => {
    const {id} = req.params;
    const {task} = req.body;
    const project = projects.find(p => p.id == id);
    project.tasks.push(task);
    return res.json(project);
});

server.put('/project/:id', checkProjectExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    const project = projects.find(p => p.id == id);
    project.title = title;
    return res.json(project);

});

server.delete('/project/:id', checkProjectExist, (req, res) => {
    const {id} = req.params;
    const project = projects.find(p => p.id == id);
    projects.splice(project, 1);
    return res.status(200).json({success: `Project ID ${id} deleted`});

});

server.listen(3000); 