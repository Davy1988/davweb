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
      className='relative mt-4 h-14 w-40 rounded-full border-[0.5px] border-white bg-white font-semibold text-[var(--background-color)] transition-colors hover:bg-transparent hover:text-[var(--secondary)]'
    >
      {props.text}
      <div className='absolute right-[-2px] top-[-5px] h-4 w-4 animate-ping rounded-full border-[2.5px] border-white bg-[var(--background-color)] duration-75'></div>
      <div className='absolute right-[-2px] top-[-5px] h-4 w-4 rounded-full bg-teal-400'></div>
    </button>
  );
}
