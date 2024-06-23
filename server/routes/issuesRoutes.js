const express = require("express");
const router = express.Router();

const {raiseIssue,searchIssues,getAllIssues} = require('../controllers/issuesControllers');

router.post('/raiseIssue',raiseIssue);
router.get('/searchIssues',searchIssues);
router.get('/getAllIssues',getAllIssues);

module.exports = router;