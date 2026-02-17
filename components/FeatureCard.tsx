import Image from "next/image";
import { Paper } from "@mui/material";

type FeatureCardProps = {
  src: string;
  alt: string;
  imageSize?: number;
  title: string;
  description: string;
  className?: string;
};

const FeatureCard = ({
  src,
  alt,
  imageSize = 40,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div className={`flex-2 flex items-center justify-center ${className}`}>
        <Image
          loading="eager"
          src={src}
          alt={alt}
          className={`size-${imageSize}`}
        />
      </div>
      <div className="flex-1 px-4 pt-0 pb-8">
        <h2 className="text-2xl font-medium mb-2">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </Paper>
  );
};

export default FeatureCard;
