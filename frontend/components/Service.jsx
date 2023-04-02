import React from 'react'
import { useRouter } from "next/router";

const Service = ({title, path}) => {
  const router = useRouter();
  return (
    <div
      className="h-20 w-64 shadow-md shadow-sky-400 border-2 border-black my-6 cursor-pointer hover:bg-sky-600 hover:border-none hover:text-white hover:scale-110"
      onClick={() => router.push(path)}
    >
      <div className="h-full w-full font-noto flex justify-center items-center text-center p-2">
        {title}
      </div>
    </div>
  )
}

export default Service
