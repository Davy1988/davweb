export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const rs = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0,
        stream: true,
        n: 1,
      }),
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return new Response(rs.body);
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: 'Please try again.Apologies for the inconvenience.',
      }),
      {
        status: 500,
      }
    );
  }
}
