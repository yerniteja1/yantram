import Image from "next/image";

export default function LogoImage({
  src,
  alt,
  size,
  priority = false,
}: {
  src: string;
  alt: string;
  size: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      priority={priority}
      className={`${size} object-contain`}
    />
  );
}
