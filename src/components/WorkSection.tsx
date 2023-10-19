'use client';
import { useEffect } from 'react';
import { setColor } from '@/lib/utils';
import { setColorValue } from '@/hooks/useColor';
type EXP = {
  name: string;
  post: string;
  list: string[];
};

export default function WorkSection() {
  setColorValue({ primary: '#3a41e4', secondary: '#3a41e4', bg: '#ffffff' });

  //return setColor({primary: '#ffffff', secondary: '#ffffff', bg: '#3a41e4'});;

  const exp: EXP[] = [
    {
      name: 'DATYS',
      post: 'Software Quality Assurance / Full Stack Developer',
      list: [
        'Team leader in the Quality Portal project(Framework Django/ VueJs).',
        'Team leader in quality assurance for several company-owned projects, detecting 99% of high severity errors before the production process.',
        'I obtained the senior degree as Software Quality Assurance.',
      ],
    },
    {
      name: 'a11ySolutions',
      post: 'Frontend Developer / QA Automation',
      list: [
        'Frontend developer in a tool to run automated tests(React/GraphQL).',
        'I create and execute automated scripts providing services for the company EveryMundo(Playwright/Typescript).',
        'Backend developer for creating an accessibility chat experiment (python, openai, chroma DB, langchain).',
      ],
    },
    {
      name: 'Exeditec',
      post: 'Frontend Developer',
      list: [
        'Frontend developer in the <a class="font-bold border-b-2 border-[var(--secondary)]" href="https://www.coltonclub.io/">Colton club</a> project implementing new interfaces and communication with MetaMask. I also worked on the debugging and bug fixing of the first deployment(Nuxt).',
      ],
    },
    {
      name: 'Heippi',
      post: 'Flutter Developer / Frontend Developer',
      list: [
        'Development of new functionalities and maintenance of the mobile application in production <a class="font-bold border-b-2 border-[var(--secondary)]" href="https://play.google.com/store/apps/details?id=com.hipal.co.hipal">Hipal</a>.',
        'Development of new functionalities and maintenance of the web application in production to manage the residential complexes of Hipal(Angular).',
        'Custom development of application for the registration of new furniture for the company Araujo and Segovia (Angular/ NgRx).',
      ],
    },
  ];
  return (
    <main className='z-auto my-4 flex min-h-screen animate-fade flex-col items-start animate-duration-[1000] animate-ease-linear'>
      <h1 className='my-6 text-[3rem] text-[var(--primary)] max-[600px]:text-[3rem]'>
        Work experience
      </h1>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2'>
        {exp.map((ex, indexEx) => (
          <div
            key={indexEx}
            className='flex flex-col gap-2 border-l-2 p-3 text-[var(--primary)]'
          >
            <h2 className='text-[1.5rem] font-medium leading-5 max-[600px]:text-[0.8rem]'>
              {ex.post}
            </h2>
            <h3 className='font-medium'>{ex.name}</h3>
            <ul className='list-disc'>
              {ex.list.map((list, index) => (
                <li key={index}>
                  <span dangerouslySetInnerHTML={{ __html: list }}></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
