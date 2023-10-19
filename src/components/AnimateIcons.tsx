import Image from 'next/image';
export default function AnimateIcons() {
  const skill: string[] = [
    'SkillIconsJavascript',
    'SkillIconsTypescript',
    'SkillIconsAngularLight',
    'SkillIconsReactDark',
    'SkillIconsVuejsLight',
    'SkillIconsFlutterLight',
  ];

  const tools: string[] = [
    'SkillIconsViteLight',
    'SkillIconsGithubLight',
    'SkillIconsSupabaseDark',
    'SkillIconsTailwindcssDark',
    'SkillIconsCloudflareDark',
    'SkillIconsDocker',
  ];

  const isOdd = (num: number) => {
    return num % 2;
  };

  const animateImages = (index: number) => {
    return `w-10 h-10 ${
      isOdd(index) ? 'animate-fade-left' : 'animate-fade-right'
    } animate-duration-[${200 * index}]`;
  };

  const getImageUrl = (img: string): string => {
    return `/images/${img}.svg`;
  };
  return (
    <div className='hidden flex-col items-center overflow-x-hidden overflow-y-hidden lg:flex lg:flex-row'>
      <div className='mb-2 flex justify-start gap-10 lg:rotate-45'>
        {skill.map((ex, index) => (
          <div className={animateImages(index)} key={index}>
            <Image src={getImageUrl(ex)} alt={ex} width={50} height={50} />
          </div>
        ))}
      </div>
      <div className='flex flex-row justify-start gap-10 lg:flex-col '>
        {tools.map((tool, index) => (
          <div className={animateImages(index)} key={index}>
            <Image src={getImageUrl(tool)} alt={tool} width={50} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}
