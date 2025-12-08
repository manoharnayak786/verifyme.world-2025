const EMERGENT_LLM_KEY = process.env.EMERGENT_LLM_KEY;

export async function generateCertificateTemplate(params: {
  title: string;
  context?: string;
}) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EMERGENT_LLM_KEY}`,
        'HTTP-Referer': 'https://verifyme.world',
        'X-Title': 'VerifyMe Certificate Generator',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional certificate text generator. Generate concise, formal, professional descriptions for certificates.',
          },
          {
            role: 'user',
            content: `Generate a professional 2-3 sentence description for a certificate titled "${params.title}". ${params.context || ''} Keep it formal and achievement-focused.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      // Fallback template if AI fails
      return `This certificate recognizes the successful completion of ${params.title}. The holder has demonstrated proficiency and dedication in this field.`;
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || `This certifies successful completion of ${params.title}.`;
  } catch (error) {
    console.error('AI service error:', error);
    return `This certificate recognizes the successful completion of ${params.title}.`;
  }
}
