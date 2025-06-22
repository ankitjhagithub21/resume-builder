
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X } from 'lucide-react'



const Step3 = ({ resume, setResume }) => {
    const addSkill = () => {
        setResume(prev => ({
            ...prev,
            skills: [...prev.skills, { name: '', level: 'beginner' }]
        }))
    }

    const removeSkill = (index) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }))
    }

    const updateSkill = (index, field, value) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) =>
                i === index ? { ...skill, [field]: value } : skill
            )
        }))
    }
    return (


        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Skills
                    <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Skill
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {resume.skills?.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Input
                            value={skill.name || ''}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            placeholder="Skill name"
                            className="flex-1"
                        />
                        <Select
                            value={skill.level || 'beginner'}
                            onValueChange={(value) => updateSkill(index, 'level', value)}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() => removeSkill(index)}
                            variant="outline"
                            size="sm"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Step3