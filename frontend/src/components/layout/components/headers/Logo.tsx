import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<
  { src: string; alt?: string } & React.ComponentProps<typeof Link>
> = ({ src, alt = "FantasyBuzz", ...props }) => (
  <Link {...props} className={cn(props.className)}>
    <Image
      src={src}
      height={300}
      width={300}
      alt={alt}
      className="object-contain w-25"
    />
  </Link>
);

export default Logo;
