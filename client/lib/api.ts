export const generateReadme = async (repoUrl: string, template: string) => {
  try {
    const res = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl, template }),
    });

    const data = await res.json();
    return data.readme; // 👈 Must match backend JSON key
  } catch (error) {
    console.error('API error:', error);
    return null;
  }
};
