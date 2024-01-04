'use client';
import { useEffect, useRef, useState } from 'react';
import style from './styles.module.css';
import Loading from '@/components/Loading';
import { supabase } from '@/lib/supabase';

type MESSAGES = {
  roles: TYPE_ROLE;
  message: string;
  time: number;
};
enum TYPE_ROLE {
  'user',
  'bot',
  'loading',
}
export default function Chat() {
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const isOpen = useRef<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const messageEl = useRef<any>(null);
  const [messages, setMessages] = useState<MESSAGES[]>([
    {
      roles: TYPE_ROLE.bot,
      message:
        'Hello, I am prepared to answer any question from the knowledge of David Manuel.',
      time: new Date().getUTCMilliseconds(),
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (!isOpen.current) setShow(true);
    }, 10000);
  }, []);

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.scrollTop = messageEl.current.scrollHeight;
    }
  }, [question]);

  const toogleShowChat = () => {
    isOpen.current = true;
    return setShow(!show);
  };

  const scrollToMessage = (time: number) => {
    const chatElements = document.querySelector(
      `[data-element="chat-${time}"]`
    );
    if (chatElements) {
      chatElements.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const returnClassBtn = (): string => {
    return `w-14 flex flex-col justify-center items-center cursor-pointer relative ${
      show
        ? 'bg-white text-[var(--background-color)]'
        : 'text-[var(--secondary)]'
    } hover:bg-white font-semibold hover:text-[var(--background-color)] transition-colors h-14 mt-4 bg-transparent border-white border-[0.5px] rounded-md`;
  };

  const sendMessage = async () => {
    if (question === '') {
      return;
    }
    try {
      const newMessage: MESSAGES = {
        roles: TYPE_ROLE.user,
        message: question,
        time: new Date().getUTCMilliseconds(),
      };
      const timeLoading = new Date().getUTCMilliseconds();
      const newMessageLoading: MESSAGES = {
        roles: TYPE_ROLE.loading,
        message: '',
        time: timeLoading,
      };
      setMessages((previousMsg) => [
        ...previousMsg,
        newMessage,
        newMessageLoading,
      ]);
      setLoading(() => true);
      setQuestion('');
      let context = [{ content: '' }];
      const responseContext = await fetch('/api/embedding', {
        method: 'POST',
        body: JSON.stringify({ query: question, n: 1 }),
      });
      if (responseContext.status === 200) {
        const { data } = await responseContext.json();
        const [{ embedding }] = data;
        const { data: documents } = await supabase.rpc('match_documents', {
          query_embedding: embedding,
          match_count: 1,
        });
        context = documents;
      }
      const response = await fetch('/api/completion', {
        method: 'POST',
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a virtual assistant who is familiar with David Manuel's resume. 
                    You will respond professionally to the users according to the provided context: ${context
                      .map((val) => val.content)
                      .toString()}.`,
            },
            { role: 'user', content: question },
          ],
        }),
      });
      if (response !== null && response.body !== null) {
        // @ts-ignore
        response.body[Symbol.asyncIterator] = () => {
          const reader = response.body?.getReader();
          return {
            next: () => reader?.read(),
          };
        };
      }
      //Read stream data
      const decoder = new TextDecoder();
      let msgData = '';
      const timeNewMessage = new Date().getUTCMilliseconds();
      const stream = response.body as unknown as AsyncIterable<any>;
      if (stream !== null) {
        for await (const chunk of stream) {
          const content = decoder.decode(chunk);
          msgData += content;
          const newBotMessage: MESSAGES = {
            roles: TYPE_ROLE.bot,
            message: msgData,
            time: timeNewMessage,
          };
          setMessages((previous) => {
            let temp = [
              ...previous.filter((val) => val.roles !== TYPE_ROLE.loading),
            ];
            const findIndex = temp.findIndex(
              (val) => val.time === timeNewMessage
            );
            if (findIndex !== -1) {
              temp[findIndex] = newBotMessage;
              return [...temp];
            } else {
              return [...temp, newBotMessage];
            }
          });
        }
      }
      setLoading(() => false);
    } catch (e) {
      const errorTime = new Date().getUTCMilliseconds();
      const newErrorMessage: MESSAGES = {
        roles: TYPE_ROLE.bot,
        message: `The service cannot be accessed at this time. 
            You can check the <a class="group text-indigo-600 font-semibold hover:underline hover:underline-offset-2" ref="buttonCv"
                          target="_blank" href="/doc/cv.pdf">
                          <div class="flex flex-row gap-1">
                              View CV
                          </div>
                      </a>
            , sorry for the inconvenience.`,
        time: errorTime,
      };
      setMessages([
        ...messages.filter((val) => val.roles !== TYPE_ROLE.loading),
        newErrorMessage,
      ]);
      scrollToMessage(errorTime);
      setLoading(false);
    }
  };

  return (
    <div className={style.chat_widget_container}>
      <div onClick={toogleShowChat} className={returnClassBtn()}>
        {show ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-9 w-9 font-extrabold text-current'
            viewBox='0 0 256 256'
          >
            <path
              fill='currentColor'
              d='M202.83 197.17a4 4 0 0 1-5.66 5.66L128 133.66l-69.17 69.17a4 4 0 0 1-5.66-5.66L122.34 128L53.17 58.83a4 4 0 0 1 5.66-5.66L128 122.34l69.17-69.17a4 4 0 1 1 5.66 5.66L133.66 128Z'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-9 w-9 font-extrabold text-current'
            viewBox='0 0 256 256'
          >
            <path
              fill='currentColor'
              d='M216 76h-28V48a20 20 0 0 0-20-20H40a20 20 0 0 0-20 20v128a12 12 0 0 0 19.54 9.33l28.46-23V184a20 20 0 0 0 20 20h92.17l36.29 29.33A12 12 0 0 0 236 224V96a20 20 0 0 0-20-20ZM44 150.87V52h120v80H71.58a12 12 0 0 0-7.58 2.67Zm168 48l-20-16.2a12 12 0 0 0-7.54-2.67H92v-24h76a20 20 0 0 0 20-20v-36h24Z'
            />
          </svg>
        )}
      </div>
      {show && (
        <div className='h-max-[60%] fixed bottom-0 right-0 flex flex-1 flex-col justify-end rounded-tl-md rounded-tr-md border-b-0 bg-white text-sm shadow-md transition-all sm:absolute sm:bottom-20 sm:top-auto sm:h-auto sm:w-96 sm:rounded-md md:absolute md:bottom-20 md:top-auto md:w-[30rem] lg:absolute lg:bottom-16 lg:top-auto lg:w-[32rem]'>
          <div className='flex max-h-14 items-center justify-between rounded-t-md bg-white p-4 text-[var(--background-color)]'>
            <h3 className='m-0 text-lg font-normal'>Chatbot</h3>
            <button
              onClick={toogleShowChat}
              className='cursor-pointer border-none bg-transparent text-gray-300 hover:text-[var(--background-color)]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                stroke-width='2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div
            ref={messageEl}
            className='h-60 max-h-96 flex-1 overflow-y-auto p-4 sm:max-h-80'
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                data-element={`chat-${msg.time}`}
                className={
                  msg.roles === TYPE_ROLE.user
                    ? 'mb-3 flex justify-end'
                    : 'mb-3 flex'
                }
              >
                {msg.roles !== TYPE_ROLE.loading && (
                  <div
                    className={
                      msg.roles === TYPE_ROLE.user
                        ? 'max-w-[90%] rounded-lg bg-[var(--background-color)] px-4 py-2 text-white'
                        : 'max-w-[90%] rounded-lg bg-gray-200 px-4 py-2 text-black'
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: msg.message }}
                    ></span>
                  </div>
                )}
                {msg.roles === TYPE_ROLE.loading && (
                  <div className='mb-3 flex'>
                    <div className='animate-pulse bg-transparent text-black delay-200'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='32'
                        height='32'
                        viewBox='0 0 256 256'
                      >
                        <path
                          fill='currentColor'
                          d='M216 48H40a16 16 0 0 0-16 16v160a15.85 15.85 0 0 0 9.24 14.5A16.13 16.13 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78a.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Zm-100-64a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm-44 0a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm88 0a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z'
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            id='chat-input-container'
            className='border-t border-gray-200 p-4'
          >
            <form className='flex items-center space-x-4'>
              <input
                type='text'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className='w-3/4 flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none'
                placeholder='Write message'
              />
              {loading ? (
                <Loading />
              ) : (
                <button
                  onClick={sendMessage}
                  className='cursor-pointer rounded-md bg-[var(--background-color)] px-4 py-2 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 font-extrabold text-current hover:-rotate-45'
                    viewBox='0 0 256 256'
                  >
                    <path
                      fill='currentColor'
                      d='M227.32 28.68a16 16 0 0 0-15.66-4.08h-.15L19.57 82.84a16 16 0 0 0-2.42 29.84l85.62 40.55l40.55 85.62a15.86 15.86 0 0 0 14.42 9.15q.69 0 1.38-.06a15.88 15.88 0 0 0 14-11.51l58.2-191.94v-.15a16 16 0 0 0-4-15.66Zm-69.49 203.17l-.05.14l-39.36-83.09l47.24-47.25a8 8 0 0 0-11.31-11.31l-47.25 47.24L24 98.22h.14L216 40Z'
                    />
                  </svg>
                </button>
              )}
            </form>
            <div className='flex pt-4 text-center text-xs'>
              <span className='flex-1'>
                Powered by{' '}
                <a
                  href='https://openai.com/'
                  target='_blank'
                  className='text-sm font-normal text-indigo-600'
                >
                  openai
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
