const router = require('express').Router();
const Grade = require('../models/grades.model');

router.get('/:roll_no', function (req, res) {
  const roll_no = req.params.roll_no;
  Grade.find({ roll_no: roll_no }, function (err, gr) {
    if (!err) {
      res.json(gr);
    } else {
      res.json(err);
    }
  });
});

router.post('/add', function (req, res) {
  const data = req.body;
  const newData = new Grade(data);
  newData.save((err) => {
    if (!err) {
      res.json('Added Succesfully');
    } else {
      res.json(err);
    }
  });
});

router.patch('/add/:roll_no', function (req, res) {
  const roll_no = req.params.roll_no;
  const grade = req.body;
  Grade.update({ roll_no: roll_no }, { $push: { info: grade } }, function (
    err
  ) {
    if (!err) {
      res.json('Added grade Succesfully');
    } else {
      res.json(err);
    }
  });
});

module.exports = router;
