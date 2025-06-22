const express = require('express');
const isAuth = require('../middlewares/authMiddleware');
const { createResume, getUserResumes, getResumeById, updateResume ,deleteResume } = require('../controllers/resumeController');
const resumeRouter = express.Router();


resumeRouter.post("/create",isAuth,createResume)
resumeRouter.get("/",isAuth,getUserResumes)
resumeRouter.get("/:id",isAuth,getResumeById)
resumeRouter.put("/:id",isAuth,updateResume)
resumeRouter.delete("/:id",isAuth,deleteResume)

module.exports = resumeRouter