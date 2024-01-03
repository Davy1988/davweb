import { ReactNode } from 'react';

type Props = {
  text: string;
  icon: ReactNode;
  link: string;
};
export default function SocialButton(props: Props) {
  return (
    <a
      className='group flex flex-row content-center items-center justify-center gap-2 text-white underline-offset-2 hover:underline'
      target='_blank'
      href={props.link}
    >
      {props.icon}
      <span className='hidden pt-1 text-current sm:block md:block lg:block'>
        {props.text}
      </span>
    </a>
  );
}
