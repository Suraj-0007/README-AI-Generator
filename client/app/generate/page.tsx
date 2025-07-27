'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateReadme } from '@/lib/api';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const repo = searchParams.get('repo') ?? '';
  const initialTemplate = searchParams.get('template') ?? 'simple';

  const [template, setTemplate] = useState<string>(initialTemplate);
  const [content, setContent] = useState<string>('Generating README...');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReadme = async (repoUrl: string, temp: string) => {
    setIsLoading(true);
    try {
      const readme = await generateReadme(repoUrl, temp);
      console.log('📄 Generated README:', readme);
      setContent(readme || 'Failed to generate README.');
    } catch (error) {
      console.error('❌ Error generating README:', error);
      setContent('Error generating README.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (repo) {
      fetchReadme(repo, template);
    }
  }, [repo, template]);

  const handleSave = (value: string) => {
    setContent(value);
    alert('✅ README saved locally (not persisted to backend).');
  };

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate);
    const params = new URLSearchParams(searchParams.toString());
    params.set('template', newTemplate);
    router.push(`/generate?${params.toString()}`);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-gray-600 animate-pulse">⏳ Generating README...</p>
      ) : (
        <MarkdownEditor
          content={content}
          onSave={handleSave}
          onTemplateChange={handleTemplateChange}
        />
      )}
    </div>
  );
}
