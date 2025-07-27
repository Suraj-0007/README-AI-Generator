'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import react-markdown with proper typing
const MarkdownPreview = dynamic(() => import('react-markdown').then(mod => mod.default), {
  ssr: false,
}) as React.FC<{ children: string }>;

interface Props {
  content: string;
  onSave?: (value: string) => void;
  onTemplateChange?: (template: string) => void;
}

export default function MarkdownEditor({ content, onSave, onTemplateChange }: Props) {
  const [value, setValue] = useState(content);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('simple');

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    onTemplateChange?.(template);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
          {showPreview ? 'Edit Mode' : 'Preview Mode'}
        </Button>

        <Button onClick={handleDownload} variant="secondary">
          <Download className="w-4 h-4 mr-2" /> Download
        </Button>

        <Button onClick={() => onSave?.(value)} variant="default">
          <Save className="w-4 h-4 mr-2" /> Save Edits
        </Button>

        <select
          value={selectedTemplate}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="ml-4 border p-2 rounded-md text-sm"
        >
          <option value="simple">Simple</option>
          <option value="detailed">Detailed</option>
          <option value="developer">Developer</option>
        </select>
      </div>

      {!showPreview ? (
        <textarea
          className="w-full h-[70vh] border rounded-md p-3 font-mono text-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <div className="w-full h-[70vh] border rounded-md p-3 bg-white overflow-auto prose prose-sm">
          <MarkdownPreview>{value}</MarkdownPreview>
        </div>
      )}
    </div>
  );
}
