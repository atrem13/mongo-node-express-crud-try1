const db = require('../models/index');
const Tutorial = db.tutorials;

// insert new data
exports.create = (req, res) => {
  // validate request input
  if(!req.body){
    return res.status(400).json({
      status: 'error',
      message: 'input cant be empty'
    });
  }

  // if input valid create tutorial
  let tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // save new tutorial to db
  tutorial.save(  ).then((data) => {
    if(data){
      return res.json({
        status: 'ok',
        data: data
      });
    }else{
      return res.status(400).json({
        status: 'error',
        message: 'idk but failed to create data'
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: err.message || 'error when to create data'
    });
  });
};

// get all data with condition
exports.findAll = (req, res) => {
  let title = req.body.title;
  let condition = title ? {title : { $regex: new RegExp(title), $options: 'i' } } : {};

  Tutorial.find(condition).then((data) => {
    if(data){
      return res.send({
        status: 'ok',
        data: data
      });
    }else{
      return res.status(400).json({
        status: 'error',
        message: 'idk but failed when trying to get data'
      });  
    }
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: err.message || 'error when trying to get data'
    });
  });
};

// retrive data with id
exports.findOne = (req, res) => {
  let id = req.params.tutorialId;

  Tutorial.findById(id).then((data) => {
    if(data){
      return res.json({
        status: 'ok',
        data: data
      });
    }else{
      return res.status(400).json({
        status: 'error',
        message: 'idk but failed when triying to get data with id ' + id
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: err.message || 'error when trying to get data with id '+ id
    });
  }) ;

};

exports.update = (req, res) => {
  let data = req.body;
  if(!data){
    return res.status(400).json({
      message: 'input cant be empty'
    });
  }

  let id = req.params.tutorialId;
  Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then((data) => {
    if(!data){
      return res.status(400).json({
        status: 'error',
        message: 'failed to update data'
      });
    }else{
      return res.json({
        status: 'ok',
        // data:data,
        message: 'update data success'
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: err.message || 'error when trying to update data with id ' + id
    });
  });
};

exports.delete = (req, res) => {
  let id = req.params.tutorialId;

  Tutorial.findByIdAndRemove(id).then((data) => {
    if(data){
      return res.json({
        status: 'ok',
        data:data,
        message: 'delete data success'
      });
    }else{
      return res.status(400).json({
        status: 'error',
        message: 'failed to delete data'
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: err.message || 'error when trying to delete data with id ' + id
    });
  });

};

exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({}).then((data) => {
    if(data){
      return res.json({
        status: 'ok',
        message: `delete ${data.deletedCount} data success`
      });
    }else{
      return res.json({
        status: 'error',
        message: 'failed to delete data'
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: err.message || 'error when trying to delete data '
    });
  })
};

exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true }).then((data) => {
      if(data){
        return res.json({
          status: 'ok',
          data: data
        });
      }else{
        return res.json({
          status: 'error',
          message: `data with status published not exist`
        });
      }
    }).catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message || "error when trying to retrieving published tutorials."
      });
    });
};