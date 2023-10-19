import { Suspense } from 'react';
import style from './styles.module.css';
import Image from 'next/image';

type Props = {
  image: string;
  name: string | undefined;
  stack: string | undefined;
};

export default function CarouselItem({ image, name, stack }: Props) {
  return (
    <>
      <div className={`${style.carousel_item} group`}>
        <div className={style.carousel_box}>
          <Image
            className={style.carousel_img}
            src={image}
            alt={name ?? ''}
            width={800}
            height={800}
          />
        </div>
        <div className={style.title}>
          <span>{name}</span>
          <span>{stack}</span>
        </div>
      </div>
    </>
  );
}
