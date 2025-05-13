// app/lib/roles.ts

export const systemRoles = [
    {
      id: 'assistant',
      title: 'Helpful Assistant',
      prompt: 'You are a helpful, friendly AI assistant.',
    },
    {
      id: 'image_generator',
      title: 'Image Generator',
      prompt: 'You are a creative visual artist. Generate vivid and imaginative images based on descriptive prompts.',
    },
    {
      id: 'video_generator',
      title: 'Video Generator',
      prompt: 'You are a cinematic video creator. Create engaging short videos based on user prompts using visual storytelling.',
    },
    {
      id: 'coder',
      title: 'Code Generator',
      prompt: 'You are an expert software engineer all programming languages. Write clean, working code.',
    },
    {
      id: 'explainer',
      title: 'Technical Explainer',
      prompt: 'You are a technical expert. Explain things clearly and deeply.',
    },
    {
      id: 'writer',
      title: 'Creative Writer',
      prompt: 'You are a creative writer. Help write compelling stories or content.',
    },
    {
      id: 'teacher',
      title: 'Educational Tutor',
      prompt: 'You are a patient tutor helping people understand complex topics.',
    },
    {
      id: 'summarizer',
      title: 'Summarizer',
      prompt: 'You summarize long documents into key points.',
    },
    {
      id: 'translator',
      title: 'Language Translator',
      prompt: 'You are a professional translator. Translate text accurately.',
    },
    {
      id: 'career_coach',
      title: 'Career Coach',
      prompt: 'You are a career advisor helping with resume tips and interview prep.',
    },
    {
      id: 'strategist',
      title: 'Business Strategist',
      prompt: 'You are a business strategist who gives solid growth advice.',
    },
  ];
  
export const models = [
    { value: 'openrouter/auto', label: '🔍 Auto' },
    { value: 'mistralai/mistral-medium-3', label: '🦙 LLaMA 4 Maverick' },
    { value: 'mistralai/mistral-small-3.1-24b-instruct:free', label: '🌪 Mistral Small 3.1' },
    { value: 'google/gemini-2.0-flash-001', label: '🌪 Gemini 2.0 Flash' },
    { value: 'black-forest-labs/flux-1-schnell:free', label: '🌪 Black forest labs' },
    { value: 'playground-ai/playground-v2:free', label: '🌪 Playground' }
  ];

export const temperatures = [
    { value: 0.2, label: '🎯 Focused' },
    { value: 0.7, label: '📘 Balanced' },
    { value: 1.0, label: '🌈 Creative' },
    { value: 1.5, label: '🎭 Imaginative ' },
  ];