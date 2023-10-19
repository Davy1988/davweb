import Button from './Button';

export default function DescriptionSection() {
  const info: Record<string, string> = {
    title: "Hi, I'm David",
    subtitle: 'Frontend developer expert / QA Automation Engineer',
    description:
      'Experienced Frontend Developer and Software Quality Assurance with over five years of experience in the industry. Proven track record of designing and developing engaging websites that drive business growth. Seeking a challenging role that allows me to leverage my skills and expertise to contribute to the success of an organization.',
  };
  return (
    <div className='z-0 flex flex-col gap-4'>
      <div className='animate-fade-down animate-duration-[3000ms] animate-ease-in-out'>
        <h1 className='text-[2rem] text-[#ffffff] hover:text-[var(--secondary)] sm:text-[2rem] md:text-[2rem] lg:text-[3rem]'>
          {info.title}
        </h1>
        <h2 className='text-[1.0rem] font-extralight leading-5 text-[#ffffff] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem]'>
          {info.subtitle}
        </h2>
      </div>
      <h2 className='mt-3 animate-fade-up text-[1.0rem] font-extralight text-[#ffffff] animate-duration-[3000ms] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem]'>
        {info.description}
      </h2>
      <div className='flex animate-fade-up flex-row gap-6 animate-duration-[3000ms]'>
        <a href='/contact'>
          <Button text='Contact me' />
        </a>
        <div className='flex w-28 flex-col content-center justify-center pt-4'>
          <a
            className='group font-light text-white hover:font-normal hover:underline hover:underline-offset-2'
            target='_blank'
            href='/doc/cv.pdf'
          >
            <div className='flex flex-row gap-1'>
              View CV
              <svg
                className='group-hover:animate-duration-400 group-hover:animate-rotate-x group-hover:animate-ease-in-out'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 256 256'
              >
                <path
                  fill='currentColor'
                  d='M240 80v72a8 8 0 0 1-16 0V99.31l-98.34 98.35a8 8 0 0 1-11.32 0l-96-96a8 8 0 0 1 11.32-11.32L120 180.69L212.69 88H160a8 8 0 0 1 0-16h72a8 8 0 0 1 8 8Z'
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
