'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateReadme } from '@/lib/api';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const repo = searchParams.get('repo');
  const router = useRouter();

  const [template, setTemplate] = useState(searchParams.get('template') || 'simple');
  const [content, setContent] = useState('Generating README...');

  const fetchReadme = async (repoUrl: string, temp: string) => {
    try {
      const readme = await generateReadme(repoUrl, temp);
      console.log('📄 Generated README:', readme); // 👈 Debug output
      setContent(readme || 'Failed to generate README.');
    } catch (error) {
      console.error('❌ Error generating README:', error);
      setContent('Error generating README.');
    }
  };


  useEffect(() => {
    if (repo) fetchReadme(repo, template);
  }, [repo, template]);

  const handleSave = (value: string) => {
    setContent(value);
    alert('README saved locally (not persisted to backend).');
  };

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate);
    const params = new URLSearchParams(searchParams.toString());
    params.set('template', newTemplate);
    router.push(`/generate?${params.toString()}`);
  };

  return (
    <div className="p-4">
      <MarkdownEditor
        content={content}
        onSave={handleSave}
        onTemplateChange={handleTemplateChange}
      />
    </div>
  );
}