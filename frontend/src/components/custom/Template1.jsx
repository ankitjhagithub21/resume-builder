const Template1 = ({ resume }) => {
    console.log(resume)

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
            <div className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center border-b pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {resume.fullName || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                        {resume.contact?.email && (
                            <span>{resume.contact.email}</span>
                        )}
                        {resume.contact?.phone && (
                            <span>• {resume.contact.phone}</span>
                        )}
                        {resume.contact?.location && (
                            <span>• {resume.contact.location}</span>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-blue-600 mt-2">
                        {resume.contact?.linkedin && (
                            <a href={resume.contact.linkedin} target="_blank" className="hover:underline">
                                LinkedIn
                            </a>
                        )}
                        {resume.contact?.github && (
                            <a href={resume.contact.github} target="_blank" className="hover:underline">
                                GitHub
                            </a>
                        )}
                        {resume.contact?.website && (
                            <a href={resume.contact.website} target="_blank" className="hover:underline">
                                Website
                            </a>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {resume.summary && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
                    </div>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                        {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {resume.experience && resume.experience.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Work Experience
                        </h2>
                        <div className="space-y-4">
                            {resume.experience.map((exp, index) => (
                                <div key={index} className="border-l-2 border-blue-200 pl-4">
                                    <h3 className="font-semibold text-gray-900">
                                        {exp.role || 'Position'}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                        {exp.company || 'Company'}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {exp?.startDate.slice(0,10) || 'Start'} - {exp.endDate.slice(0,10) || 'End'} 
                                    </p>
                                    {exp.description && (
                                        <p className="text-gray-700 text-sm">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Education
                        </h2>
                        <div className="space-y-3">
                            {resume.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree || 'Degree'}
                                    </h3>
                                    <p className="text-blue-600">{edu.institution || 'Institution'}</p>
                                    <p className="text-sm text-gray-600">
                                        {edu.startYear || 'Start'} - {edu.endYear || 'End'}
                                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resume.projects && resume.projects.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {resume.projects.map((project, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-gray-900">
                                        {project.name || 'Project Name'}
                                    </h3>
                                    {project.techStack && (
                                        <p className="text-sm mb-1 text-gray-900">
                                            Tech Stack :  <span className="text-blue-500">{project.techStack.join(',')}</span>
                                        </p>
                                    )}
                                    {project.description && (
                                        <p className="text-gray-700 text-sm">{project.description}</p>
                                    )}
                                    <div className="flex gap-2">
                                        {project.liveDemo && (
                                        <a href={project.liveDemo} target="_blank" className="text-blue-600 hover:underline text-sm">
                                            View Project
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" className="text-blue-600 hover:underline text-sm">
                                            Github
                                        </a>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certificates */}
                {resume.certificates && resume.certificates.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Certificates
                        </h2>
                        <div className="space-y-2 grid grid-cols-2">
                            {resume.certificates.map((cert, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-gray-900">
                                        {cert.title || 'Certificate Name'}
                                    </h3>
                                    <p className="text-blue-600 text-sm">
                                        {cert.issuer || 'Issuing Organization'}
                                    </p>
                                    {cert.year && (
                                        <p className="text-gray-600 text-sm">{cert.year}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {resume.languages && resume.languages.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Languages
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {resume.languages.map((lang, index) => (
                                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                    {lang.name || lang} {lang.level && `(${lang.level})`}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {resume.interests && resume.interests.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            Interests
                        </h2>
                        <p className="text-gray-700">
                            {resume.interests.join(', ')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Template1