import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Hola, quiero que respondas como un experto en marketing a lo siguiente: 
`;
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userText}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userText}\n`,
    temperature: 0.7,
    max_tokens: 30,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;