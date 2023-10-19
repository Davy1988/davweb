import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { email, message } = await req.json();
  try {
    await supabase
      .from('messages')
      .insert([
        {
          email,
          message,
        },
      ])
      .single();
    return new Response(
      JSON.stringify({
        message:
          'Thank you very much for reaching out to me, I will reply as soon as possible.',
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message:
          "We couldn't send your message. Please try again or use another method to contact me. Apologies for the inconvenience.",
      }),
      {
        status: 500,
      }
    );
  }
}
