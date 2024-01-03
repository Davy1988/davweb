type Props = {
  text: string;
  onPress?: (e: any) => void;
  disabled?: boolean;
};

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onPress}
      disabled={props.disabled}
      className='relative h-14 w-40 rounded-full border-[0.5px] border-white bg-transparent font-normal text-[var(--secondary)] transition-colors hover:bg-white hover:font-medium hover:text-[var(--background-color)]'
    >
      {props.text}
      <div className='absolute right-[-2px] top-[-5px] h-4 w-4 animate-ping rounded-full border-[2.5px] border-white bg-[var(--background-color)] duration-75'></div>
      <div className='absolute right-[-2px] top-[-5px] h-4 w-4 rounded-full bg-teal-400'></div>
    </button>
  );
}
