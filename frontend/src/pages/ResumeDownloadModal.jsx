import React, { useCallback, useRef, useState } from 'react'
import { toPng} from 'html-to-image';
import Template1 from '@/components/custom/Template1'
import Template2 from '@/components/custom/Template2'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'

const ResumeDownloadModal = ({ resume, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [isDownloading, setIsDownloading] = useState(false);
    const resumeRef = useRef(null);

    const handleDownload = useCallback(() => {
    if (resumeRef.current === null) {
      return
    }
    

    toPng(resumeRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = resume.title
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [resumeRef])

    

    return (
        <div className='h-screen w-full bg-black fixed top-0 left-0 p-5 overflow-y-scroll z-50'>
            <div className='fixed right-6 top-0 flex gap-2 p-2 z-50 '>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="template1">Template 1</SelectItem>
                        <SelectItem value="template2">Template 2</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                >
                    {isDownloading ? 'Generating...' : 'Download Resume'}
                </Button>
                <Button variant="outline" onClick={() => onClose(null)}>
                    Close
                </Button>
            </div>

            <div className='mt-20' ref={resumeRef}>
                {selectedTemplate === "template1" && <Template1 resume={resume} />}
                {selectedTemplate === "template2" && <Template2 resume={resume} />}
            </div>
        </div>
    );
}

export default ResumeDownloadModal;