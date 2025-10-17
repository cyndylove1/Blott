"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface DataProps {
  url: string;
  image: string;
  source: string;
  datetime: string;
  headline: string;
}

const fetchData = async (): Promise<DataProps[]> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch news");
  }
};


export default function Main() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchData,
    staleTime: 5000,
    retry: false,
  });

  return (
    <div className="md:px-4 px-2">
      <h2 className="text-white md:text-[48px] text-[24px] leading-[32px] font-[500] md:my-14 mt-4 px-4">
        NEWS
      </h2>

      {isLoading && (
        <p className="text-white md:text-[20px] text-[16px] leading-[24px] font-[500] px-4">
          Loading....
        </p>
      )}

      {error && (
        <p className="text-white md:text-[20px] text-[16px] leading-[24px] font-[500] px-4">
          Something went wrong. Please try again later.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 md:gap-[24px] text-white">
        {data?.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-transparent hover:bg-[#2a283e]">
              <div className="p-[16px] flex md:flex-col items-center gap-[16px]">
                <img
                  src={item.image}
                  alt="image"
                  className="object-cover w-[100px] h-[100px] md:w-[258px] md:h-[179px]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-[#b7b6b8] uppercase font-[400] text-[12px] leading-[16px]">
                      {item.source}
                    </p>
                    <p className="text-[#b7b6b8] uppercase font-[400] text-[12px] leading-[16px]">
                      {item.datetime}
                    </p>
                  </div>
                  <h3 className="text-white font-[500] md:text-[14px] text-[12px] leading-[24px] md:pt-4 pt-2">
                    {item.headline}
                  </h3>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
