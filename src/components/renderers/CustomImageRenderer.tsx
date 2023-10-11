"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative  w-full min-h-[15rem] z-20">
      <Image
        alt="image"
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          borderRadius: "24px",
          objectFit: "cover", // cover, contain, none
        }}
        src={src}
      />
    </div>
  );
}

export default CustomImageRenderer;
