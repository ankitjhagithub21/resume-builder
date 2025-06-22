const Resume = require('../models/resumeModel')
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/customError');

const createResume = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new CustomError("Title is required.", 400);
    }

    const newResume = new Resume({
        user: req.user._id,
        ...req.body
    })

    await newResume.save()

    res.status(201).json({
        message: 'Resume created successfully.',
        success: true,
        data: newResume
    });
});

const getUserResumes = asyncHandler(async (req, res) => {

    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });

    if (!resumes) {
        throw new CustomError("Resume not found.", 404)
    }
    res.status(200).json(resumes);
});

const getResumeById = asyncHandler(async (req, res) => {

    const resumeId = req.params.id;

    const resume = await Resume.findOne({ user: req.user._id, _id: resumeId });

    if (!resume) {
        throw new CustomError("Resume not found.", 404)
    }

    res.status(200).json(resume);
});

const updateResume = asyncHandler(async (req, res) => {

    const resumeId = req.params.id;

    const resume = await Resume.findOne({ user: req.user._id, _id: resumeId });

    if (!resume) {
        throw new CustomError("Resume not found.", 404)
    }

    //merge updated resume value
    Object.assign(resume,req.body);

    const savedResume = await resume.save();

    res.status(200).json({
        message:"Resume updated successfully.",
        success: true,
        data: savedResume
    });
});

const deleteResume = asyncHandler(async (req, res) => {

    const resumeId = req.params.id;

    const resume = await Resume.findOneAndDelete({ user: req.user._id, _id: resumeId });

    if (!resume) {
        throw new CustomError("Resume not found.", 404)
    }

    res.status(200).json({
        success: true,
        message:"Resume deleted successfully."
    });
});

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume
}