export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      body: JSON.stringify({
        input: query,
        model: 'text-embedding-ada-002',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
    });
    if (response.ok && response.body !== null && response.status === 200) {
      const { data } = await response.json();
      return new Response(
        JSON.stringify({
          data,
        }),
        {
          status: 200,
        }
      );
    } else {
      throw 'Error embedding data';
    }
  } catch (e) {
    console.log(e);
    return new Response('Error embedding data', {
      status: 500,
    });
  }
}
