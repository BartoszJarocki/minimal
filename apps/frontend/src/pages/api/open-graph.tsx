import { ImageResponse } from "@vercel/og";
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

type ImageType = "landing" | "calendar" | "habit-tracker" | "page";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// Inline logo component for OG images
const OGLogo = ({ size = 80 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      background: "#1f1f1f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span
      style={{
        color: "#fafafa",
        fontSize: size * 0.65,
        fontFamily: "Geist",
        fontWeight: 900,
      }}
    >
      M
    </span>
  </div>
);

export default async function OpenGraphImageHandler(req: NextRequest) {
  const [GeistBold, GeistBlack] = await Promise.all([bold, black]);

  const { searchParams } = req.nextUrl;
  const type = (searchParams.get("type") as ImageType) || "landing";

  const fonts = [
    { name: "Geist", data: GeistBold, weight: 700 as const },
    { name: "Geist", data: GeistBlack, weight: 900 as const },
  ];

  // type=landing - Brand focused
  if (type === "landing") {
    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex flex-col items-start justify-center text-[#1f1f1f] bg-[#fafafa] p-16"
          style={{ fontFamily: "Geist" }}
        >
          <OGLogo size={80} />
          <div tw="flex flex-col mt-10">
            <div tw="text-6xl font-black tracking-tight leading-tight">
              Printable calendars
            </div>
            <div tw="text-6xl font-black tracking-tight leading-tight">
              and habit trackers
            </div>
          </div>
          <div tw="text-3xl mt-6 text-[#1f1f1f]/70">
            $29 once, yours forever.
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  // type=calendar - Year + mini month grid
  if (type === "calendar") {
    const year = searchParams.get("year") || "2027";

    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex flex-col items-center justify-center text-[#1f1f1f] bg-[#fafafa] p-12"
          style={{ fontFamily: "Geist" }}
        >
          <div tw="text-9xl font-black tracking-tighter">{year}</div>
          <div tw="flex flex-wrap justify-center mt-8" style={{ gap: 8 }}>
            {MONTHS.map((month, i) => (
              <div
                key={i}
                tw="w-16 h-16 border-2 border-[#1f1f1f]/20 flex items-center justify-center text-2xl font-bold"
              >
                {month}
              </div>
            ))}
          </div>
          <div tw="text-2xl mt-10 text-[#1f1f1f]/60">
            Minimalist printable calendar
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  // type=habit-tracker - Grid hint + title
  if (type === "habit-tracker") {
    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex flex-col items-center justify-center text-[#1f1f1f] bg-[#fafafa] p-12"
          style={{ fontFamily: "Geist" }}
        >
          <div tw="flex flex-col" style={{ gap: 4 }}>
            {[0, 1, 2].map((row) => (
              <div key={row} tw="flex" style={{ gap: 4 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((col) => (
                  <div
                    key={col}
                    tw="w-10 h-10 border-2 border-[#1f1f1f]/20"
                    style={{
                      background:
                        col % 7 >= 5 ? "rgba(0,0,0,0.05)" : "transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div tw="text-6xl font-black tracking-tight mt-12">Habit Tracker</div>
          <div tw="text-2xl mt-4 text-[#1f1f1f]/60">
            Track daily habits with printable grids
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  // type=page - Generic fallback
  const title = searchParams.get("title") || "Minimal";
  const description = searchParams.get("description") || "";

  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex flex-col items-start justify-center text-[#1f1f1f] bg-[#fafafa] p-16"
        style={{ fontFamily: "Geist" }}
      >
        <OGLogo size={80} />
        <div tw="max-w-3xl text-6xl font-black tracking-tight leading-tight mt-10">
          {title}
        </div>
        {description && (
          <div tw="text-2xl mt-6 text-[#1f1f1f]/70">{description}</div>
        )}
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
