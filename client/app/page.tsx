'use client';

import { useState } from 'react';
import RepoInputForm from '@/components/RepoInputForm';
import TemplateSelector from '@/components/TemplateSelector';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('simple');
  const router = useRouter();

  const handleSubmit = async (url: string) => {
    setRepoUrl(url);
    // You can call your backend API here or navigate to `/generate`
    router.push(`/generate?repo=${encodeURIComponent(url)}&template=${selectedTemplate}`);
  };

  return (
    <main className="flex flex-col gap-6 p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center">AI README Generator</h1>
      <RepoInputForm onSubmit={handleSubmit} />
      <TemplateSelector selected={selectedTemplate} onChange={setSelectedTemplate} />
    </main>
  );
}
