import Image from 'next/image';
import Link from 'next/link';

interface CShare {
  href: string;
  image: string;
  name: string;
  alt: string;
}
const CShare = ({ href, image, name, alt }: CShare) => {
  return (
    <Link
      href={href}
      target="blank"
      className="flex flex-col items-center justify-center py-4 px-2 rounded-xl hover:bg-lightGrayishBlue w-[100px]"
    >
      <Image src={image} width={50} height={50} alt={alt} />
      <p className="mt-2 text-lg">{name}</p>
    </Link>
  );
};

export default CShare;
