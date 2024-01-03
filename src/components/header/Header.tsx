'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import style from './styles.module.css';
export default function Header() {
  const pathName = usePathname();
  const logo = 'David Manuel';
  return (
    <header
      id='app-header'
      className='mx-6 animate-fade animate-duration-1000 animate-ease-in-out'
    >
      <div className='flex w-full flex-col justify-start  sm:flex-row sm:justify-start md:flex-row md:justify-between lg:justify-between'>
        <div className='mb-4 items-start sm:flex md:flex lg:flex'>
          <span className="font-['TheScientist'] text-sm text-[var(--secondary)] sm:text-[1.0rem] md:text-[1.5rem] lg:text-[1.5rem]">
            {logo}
          </span>
        </div>
        <div className='flex min-h-[30px] min-w-[20px] cursor-pointer gap-3 sm:mx-6'>
          <Link href={'/'}>
            <span
              className={pathName === '/' ? style.active_menu : style.menu_item}
            >
              Home
            </span>
          </Link>
          <Link href={'/work'}>
            <span
              className={
                pathName === '/work' ? style.active_menu : style.menu_item
              }
            >
              Work
            </span>
          </Link>
          <Link href={'/projects'}>
            <span
              className={
                pathName === '/gallery' ? style.active_menu : style.menu_item
              }
            >
              Projects
            </span>
          </Link>
          <Link href={'/contact'}>
            <span
              className={
                pathName === '/contact' ? style.active_menu : style.menu_item
              }
            >
              Contact
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
