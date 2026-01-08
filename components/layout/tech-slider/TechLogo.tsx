import Image from "next/image";
import { LogoItem } from "./LogoLoop";
const TechLogo = ({
  item,
  onPauseChange,
}: Readonly<{
  item: LogoItem;
  onPauseChange: (paused: boolean) => void;
}>) => {
  return (
    <div className="flex items-center justify-center py-4 w-full h-25">
      <button
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
        onFocus={() => onPauseChange(true)}
        onBlur={() => onPauseChange(false)}
        aria-label={item.alt ?? "Technology logo"}
        className="relative w-16 h-16 md:w-20 md:h-20	cursor-pointer bg-transparent border-0 transition-transform duration-300 ease-out	hover:scale-110 focus-visible:scale-110"
      >
        <Image
          src={item.src}
          alt={item.alt ?? "Tech Logo"}
          fill
          sizes="(max-width: 768px) 64px, 80px"
          priority={false}
          className="object-contain transition-transform duration-300
						hover:scale-110"
        />
      </button>
    </div>
  );
};

export default TechLogo;
