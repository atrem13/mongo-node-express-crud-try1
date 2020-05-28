module.exports = app => {
  const tutorial = require('../controller/tutorial.controller');

  let router = require('express').Router();
  router.get('/', tutorial.findAll);
  router.post('/', tutorial.create);
  router.get('/get/:tutorialId', tutorial.findOne);
  router.put('/update/:tutorialId', tutorial.update);
  router.delete('/delete/:tutorialId', tutorial.delete);
  router.delete('/deleteAll', tutorial.deleteAll);
  router.get('/published', tutorial.findAllPublished);

  app.use('/api/tutorials', router);
};