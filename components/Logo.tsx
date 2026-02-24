// components/Logo.tsx
import Image from "next/image";
import LogoSVG from "@/public/icons/logo.svg";

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export default function Logo({
  size = 32,
  showText = true,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showText && (
        <span className="text-base md:text-xl font-rubik">taskCodex</span>
      )}
      <Image
        // color="blue"
        src={LogoSVG}
        alt="TaskCodex"
        width={size}
        height={size}
        className="shrink-0"
      />
    </div>
  );
}
