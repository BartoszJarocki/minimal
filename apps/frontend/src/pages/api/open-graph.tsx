import { ImageResponse } from "@vercel/og";
import { DateTime } from "luxon";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const black = fetch(
  new URL("../../assets/Geist-Black.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const bold = fetch(
  new URL("../../assets/Geist-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

type ImageType = "calendar" | "page";

export default async function OpenGraphImageHandler(req: NextRequest) {
  const [GeistBold, GeistBlack] = await Promise.all([bold, black]);

  const { searchParams } = req.nextUrl;
  const type = searchParams.get("type") as ImageType;

  if (type === "calendar") {
    const dayParam = searchParams.get("day");
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");
    
    if (!dayParam || !monthParam || !yearParam) {
      return new Response("Missing required parameters", { status: 400 });
    }
    
    const day = parseInt(dayParam);
    const month = parseInt(monthParam);
    const year = parseInt(yearParam);
    
    if (isNaN(day) || isNaN(month) || isNaN(year) || 
        day < 1 || day > 31 || month < 1 || month > 12 || 
        year < 2020 || year > 2030) {
      return new Response("Invalid date parameters", { status: 400 });
    }
    const date = DateTime.now().set({ day, month, year }).setLocale("en");

    return new ImageResponse(
      (
        <div tw="w-full h-full flex flex-col items-center justify-start text-6xl font-bold text-[#1f1f1f] bg-[#fafafa] p-12">
          <div tw="flex ml-auto font-black text-8xl">{date.weekdayLong}</div>

          <div tw="flex mt-auto ml-auto font-bold text-7xl">
            <div tw="flex">{date.monthLong}</div>
            <div tw="flex mx-4">{date.day},</div>
            <div tw="flex">{date.year}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: "Geist",
            data: GeistBold,
            weight: 700,
          },
          {
            name: "Geist",
            data: GeistBlack,
            weight: 900,
          },
        ],
      }
    );
  }

  const title = searchParams.get("title") || "Minimalist Calendar";
  const description = searchParams.get("description") || "Beautiful printable calendar";

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col items-start justify-center font-bold text-[#1f1f1f] bg-[#fafafa] p-12">
        <div tw="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            clipRule="evenodd"
            viewBox="0 0 200 200"
            style={{ width: 80, height: 80 }}
          >
            <path
              fill="#1F1F1F"
              d="M200 29.42C200 13.182 186.818 0 170.58 0H29.42C13.182 0 0 13.182 0 29.42v141.16C0 186.818 13.182 200 29.42 200h141.16c16.238 0 29.42-13.182 29.42-29.42V29.42z"
            />
            <path
              fill="#FAFAFA"
              fillRule="nonzero"
              d="M37.604-54.627H64.91l28.841 70.363h1.228l28.84-70.363h27.307V50.1h-21.477v-68.165h-.869l-27.103 67.653H87.052L59.95-18.321h-.869V50.1H37.604V-54.627z"
              transform="matrix(.87336 0 0 .88418 17.586 102.002)"
            ></path>
          </svg>
        </div>
        <div tw="max-w-xl font-bold leading-none tracking-tighter text-6xl flex mt-10">
          {title}
        </div>
        <div tw="text-2xl flex mt-4">{description}</div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Geist",
          data: GeistBold,
          weight: 700,
        },
        {
          name: "Geist",
          data: GeistBlack,
          weight: 900,
        },
      ],
    }
  );
}
