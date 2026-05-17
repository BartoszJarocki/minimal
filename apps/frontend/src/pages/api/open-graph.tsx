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
const monoBold = fetch(
  new URL("../../assets/GeistMono-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

type ImageType = "landing" | "habit-tracker" | "page" | "calendar";
type ThemeSlug = "editorial" | "mono" | "pixel";

const VALID_THEMES: ThemeSlug[] = ["editorial", "mono", "pixel"];

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

// 7x4 pixel-block frame around the pixel-theme headline. Pure squares —
// no actual pixel font needed; the chunky geometry signals the theme.
const PixelBlocks = ({
  cols,
  rows,
  size = 16,
  gap = 3,
}: {
  cols: number;
  rows: number;
  size?: number;
  gap?: number;
}) => (
  <div tw="flex flex-col" style={{ gap }}>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} tw="flex" style={{ gap }}>
        {Array.from({ length: cols }).map((_, c) => (
          <div
            key={c}
            style={{
              width: size,
              height: size,
              background: (r + c) % 2 === 0 ? "#1f1f1f" : "#1f1f1f33",
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

export default async function OpenGraphImageHandler(req: NextRequest) {
  const [GeistBold, GeistBlack, GeistMonoBold] = await Promise.all([
    bold,
    black,
    monoBold,
  ]);

  const { searchParams } = req.nextUrl;
  const type = (searchParams.get("type") as ImageType) || "landing";

  const fonts = [
    { name: "Geist", data: GeistBold, weight: 700 as const },
    { name: "Geist", data: GeistBlack, weight: 900 as const },
    { name: "GeistMono", data: GeistMonoBold, weight: 700 as const },
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
            $19 once, yours forever.
          </div>
          <div
            tw="text-xl mt-2 text-[#1f1f1f]/60"
            style={{ fontFamily: "GeistMono" }}
          >
            EDITORIAL · MONO · PIXEL
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  // type=calendar - Calendar OG with theme-aware styling
  if (type === "calendar") {
    const themeParam = searchParams.get("theme") as ThemeSlug | null;
    const theme: ThemeSlug = VALID_THEMES.includes(themeParam as ThemeSlug)
      ? (themeParam as ThemeSlug)
      : "editorial";
    const year = searchParams.get("year") || String(new Date().getFullYear());

    if (theme === "mono") {
      return new ImageResponse(
        (
          <div
            tw="w-full h-full flex flex-col justify-between text-[#1f1f1f] bg-[#fafafa] p-16"
            style={{ fontFamily: "GeistMono" }}
          >
            <div tw="flex items-start justify-between">
              <OGLogo size={64} />
              <div
                tw="text-base text-[#1f1f1f]/60"
                style={{ letterSpacing: "0.18em" }}
              >
                THEME / MONO
              </div>
            </div>

            <div tw="flex flex-col">
              <div
                tw="text-[#1f1f1f]/60 text-2xl"
                style={{ letterSpacing: "0.18em" }}
              >
                {year}
              </div>
              <div
                tw="text-8xl font-bold tracking-tight leading-none mt-2"
                style={{ letterSpacing: "-0.04em" }}
              >
                MONO CALENDAR
              </div>
              <div tw="text-2xl mt-6 text-[#1f1f1f]/70">
                Set in Geist Mono. Tabular. Print-ready.
              </div>
            </div>

            <div tw="flex" style={{ gap: 12 }}>
              {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m) => (
                <div
                  key={m}
                  tw="px-3 py-1.5 border-2 border-dashed border-[#1f1f1f]/40 text-base"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        ),
        { width: 1200, height: 630, fonts }
      );
    }

    if (theme === "pixel") {
      return new ImageResponse(
        (
          <div
            tw="w-full h-full flex text-[#1f1f1f] bg-[#fafafa]"
            style={{ fontFamily: "Geist" }}
          >
            <div tw="flex-1 flex flex-col justify-between p-16">
              <div tw="flex items-start justify-between">
                <OGLogo size={64} />
                <div
                  tw="text-base text-[#1f1f1f]/60"
                  style={{ fontFamily: "GeistMono", letterSpacing: "0.18em" }}
                >
                  THEME / PIXEL
                </div>
              </div>

              <div tw="flex flex-col">
                <div
                  tw="text-[#1f1f1f]/60 text-2xl"
                  style={{ fontFamily: "GeistMono", letterSpacing: "0.18em" }}
                >
                  {year}
                </div>
                <div tw="flex flex-col">
                  <div
                    tw="text-8xl font-black tracking-tight leading-none mt-2"
                    style={{ letterSpacing: "-0.05em" }}
                  >
                    PIXEL
                  </div>
                  <div
                    tw="text-8xl font-black tracking-tight leading-none"
                    style={{ letterSpacing: "-0.05em" }}
                  >
                    CALENDAR
                  </div>
                </div>
                <div
                  tw="text-2xl mt-6 text-[#1f1f1f]/70"
                  style={{ fontFamily: "GeistMono" }}
                >
                  Set in Geist Pixel Square.
                </div>
              </div>

              <div />
            </div>
            <div tw="flex items-center justify-center w-[280px] bg-[#1f1f1f]/[0.04] border-l-2 border-[#1f1f1f]/20">
              <PixelBlocks cols={7} rows={8} size={28} gap={4} />
            </div>
          </div>
        ),
        { width: 1200, height: 630, fonts }
      );
    }

    // editorial (default)
    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex flex-col justify-between text-[#1f1f1f] bg-[#fafafa] p-16"
          style={{ fontFamily: "Geist" }}
        >
          <div tw="flex items-start justify-between">
            <OGLogo size={64} />
            <div
              tw="text-base text-[#1f1f1f]/60"
              style={{ fontFamily: "GeistMono", letterSpacing: "0.18em" }}
            >
              THEME / EDITORIAL
            </div>
          </div>

          <div tw="flex flex-col">
            <div
              tw="text-[#1f1f1f]/60 text-2xl"
              style={{ fontFamily: "GeistMono", letterSpacing: "0.18em" }}
            >
              {year}
            </div>
            <div tw="text-8xl font-black tracking-tight leading-none mt-2">
              Editorial Calendar
            </div>
            <div tw="text-2xl mt-6 text-[#1f1f1f]/70">
              Refined. Sans-serif. Magazine.
            </div>
          </div>

          <div />
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
