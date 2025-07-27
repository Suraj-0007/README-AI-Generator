const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetchRepoData = require("../utils/fetchRepoData");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateREADME(req, res) {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: "Missing repoUrl" });

    const repoDetails = await fetchRepoData(repoUrl);

    const prompt = `
You are an expert open-source contributor.
Generate a professional, well-structured README.md file for the following GitHub project:

Details:
- Name: ${repoDetails.name}
- Description: ${repoDetails.description}
- Topics: ${repoDetails.topics.join(", ")}
- Languages: ${repoDetails.languages.join(", ")}
- Stars: ${repoDetails.stars}
- Forks: ${repoDetails.forks}
- License: ${repoDetails.license}
- Last Updated: ${repoDetails.updated_at}

Include these sections:
- Project Title
- Description
- Features
- Installation
- Usage
- Technologies Used
- Contributing (if applicable)
- License

Return only clean markdown.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const readme = response.text();

    res.status(200).json({ readme });
  } catch (error) {
    console.error("❌ Gemini Gen Error:", error.message);
    res.status(500).json({ error: "Failed to generate README" });
  }
}

module.exports = { generateREADME };
