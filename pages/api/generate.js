import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { event, priceMin, priceMax, gender, age, hobbies } = req.body;
  const prompt = generatePrompt(event, priceMin, priceMax, gender, age, hobbies) || '';

  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid fields",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(event, priceMin, priceMax, gender, age, hobbies) {
  return `suggest 3 ${event} gift ideas
          between ${priceMin}$ and ${priceMax}$ 
          for a ${age} years old ${gender} 
          that is into ${hobbies}. 
          The answer translate to russian.`
          // Write the answer in english
          // and then translate it to russian`

          // suggest 3 Purim gift ideas 
          // between 50$ and 100$
          // for a 40 years old woman
          // that is into religious. 
          // The answer translate to russian.

}

// curl - X POST localhost: 3001 / api / generate - gifts - H "Content-Type: application/json" - d '{"event": "Purim", "priceMin": 50, "priceMax": 100, "gender": "woman", "age": 40, "hobbies": "drawing, traveling, coding"}'