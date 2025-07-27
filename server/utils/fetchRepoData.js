const axios = require("axios");

async function fetchRepoData(repoUrl) {
  try {
    const regex = /github\.com\/([\w-]+)\/([\w.-]+)/;
    const match = repoUrl.match(regex);

    if (!match) throw new Error("Invalid GitHub repo URL");

    const [_, owner, repo] = match;

    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
      : {};

    const [repoRes, topicsRes, langsRes] = await Promise.all([
      axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
      axios.get(`https://api.github.com/repos/${owner}/${repo}/topics`, {
        headers: { ...headers, Accept: "application/vnd.github.mercy-preview+json" },
      }),
      axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
    ]);

    return {
      name: repoRes.data.name,
      description: repoRes.data.description,
      topics: topicsRes.data.names,
      languages: Object.keys(langsRes.data),
      stars: repoRes.data.stargazers_count,
      forks: repoRes.data.forks_count,
      license: repoRes.data.license?.name || "None",
      updated_at: repoRes.data.updated_at,
      owner,
      repo,
    };
  } catch (error) {
    console.error("❌ GitHub Fetch Error:", error.message);
    throw new Error("Failed to fetch repository data");
  }
}

module.exports = fetchRepoData;
