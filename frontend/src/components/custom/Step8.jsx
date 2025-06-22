import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


import { Plus, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Step8 = ({resume,setResume}) => {
    const addLanguage = () => {
        setResume(prev => ({
            ...prev,
            languages: [...prev.languages, { name: '', level: 'beginner' }]
        }))
    }

    const removeLanguage = (index) => {
        setResume(prev => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index)
        }))
    }

    const updateLanguage = (index, field, value) => {
        setResume(prev => ({
            ...prev,
            languages: prev.languages.map((lang, i) => 
                i === index ? { ...lang, [field]: value } : lang
            )
        }))
    }


  return (

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Languages
                        <Button onClick={addLanguage} size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Language
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {resume.languages.map((lang, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                            <Input
                                value={lang.name}
                                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                placeholder="Language name"
                                className="flex-1"
                            />
                            <Select
                                value={lang.level}
                                onValueChange={(value) => updateLanguage(index, 'level', value)}
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
                                onClick={() => removeLanguage(index)}
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

export default Step8