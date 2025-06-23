const Resume = require('../models/resumeModel');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/customError');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const hbs = require('handlebars')
const moment = require('moment')


const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.html`);
    const html = await fs.readFile(filePath, 'utf-8');
    const template = hbs.compile(html);
    return template(data);
};

hbs.registerHelper('formatDate', function (date) {
  return moment(date).format('MMM YYYY'); // e.g., Jun 2023
});


const createResume = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new CustomError("Title is required.", 400);
    }
    const isExist = await Resume.findOne({ user: req.user._id, title: title });

    if (isExist) {
        throw new CustomError('Resume already exist with this title.', 400)
    }

    const newResume = new Resume({
        user: req.user._id,
        ...req.body
    })

    await newResume.save()

    res.status(201).json(newResume);
});

const getUserResumes = asyncHandler(async (req, res) => {

    const resumes = await Resume.find({ user: req.user._id }).select("title").sort({ updatedAt: -1 });

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
    Object.assign(resume, req.body);

    const savedResume = await resume.save();

    res.status(200).json({
        message: "Resume updated successfully.",
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
        message: "Resume deleted successfully."
    });
});

const generatePdf = asyncHandler(async (req, res) => {
    const { template, resumeId } = req.body;

    // Fetch resume by ID and user
    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id }).lean();

    if (!resume) {
        throw new CustomError("Resume not found", 404); // 
    }

    // Compile template with resume data
    const content = await compile(template, resume);

    // Launch Puppeteer and create PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(content, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    // Define PDF output path
    const pdfPath = path.join(process.cwd(), 'uploads', `${resume.title}_${resume.user}.pdf`);

    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true
    });

    await browser.close();

    // Send success response (optionally send PDF or download link)
    res.status(200).json({
        success: true,
        message: "PDF file generated successfully.",
        filePath: pdfPath // optionally return download URL or base64
    });
});



module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    generatePdf
}