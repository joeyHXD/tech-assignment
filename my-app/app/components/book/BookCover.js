"use client";

import Image from "next/image";

export default function BookCover({ imageUrl, title }) {
  return (
    <div className="flex justify-center">
      {imageUrl ? (
        <div className="relative w-[200px] h-[300px]">
          <Image
            src={imageUrl.replace('http:', 'https:')}
            alt={title}
            fill
            className="object-contain rounded-md shadow-md"
          />
        </div>
      ) : (
        <div className="w-[200px] h-[300px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
          No Image
        </div>
      )}
    </div>
  );
}
