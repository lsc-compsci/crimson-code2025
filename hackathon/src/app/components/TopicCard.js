import Image from "next/image";
import Link from "next/link";

export default function TopicCard({ topic, delay }) {
  return (
    <Link href={topic.link}>

      <div className="cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white animate-fadeInUp cursor-pointer">
          <div className="relative w-full h-96">
            <Image
              src={topic.image}
              alt={topic.title}
              layout="fill" 
              objectFit="cover"
              className="w-full" />
          </div>

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center text-orange-400">{topic.title}</div>
            <p className="text-gray-700 text-base">
              {topic.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
