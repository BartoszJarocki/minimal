import { Logo } from "./Logo";
import Link from "next/link";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../lib/config";
import { SupportedLocales } from "@minimal/config";

const CURRENT_YEAR = Math.max(...AVAILABLE_CALENDARS.map((c) => c.year));

const navigation = {
  products: [
    ...AVAILABLE_CALENDARS.map((calendar) => ({
      name: `${calendar.year} Calendar`,
      href: `/calendars/${calendar.year}/${calendar.theme}`,
    })),
    { name: "Habit Tracker", href: "/habit-tracker" },
  ],
  years: [
    ...AVAILABLE_CALENDARS.slice(0, 4).map((calendar) => ({
      name: calendar.year.toString(),
      href: `/calendars/${calendar.year}/simple`,
    })),
    { name: "See all years →", href: "/calendars" },
  ],
  languages: [
    ...FEATURED_LANGUAGES.map((lang) => ({
      name: lang.name,
      href: `/calendars/${CURRENT_YEAR}/simple/${lang.code}`,
    })),
    {
      name: `All ${SupportedLocales.length} languages →`,
      href: "/calendars/languages",
    },
  ],
  formats: [
    { name: "A4 Calendars", href: "/calendars/formats/a4" },
    { name: "A5 Calendars", href: "/calendars/formats/a5" },
    { name: "Letter Calendars", href: "/calendars/formats/letter" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "My account", href: "/portal" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/useminimalcom",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://pl.pinterest.com/useminimal",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M9.04,21.54C10,21.83 10.97,22 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12C2,16.25 4.67,19.9 8.44,21.34C8.35,20.56 8.26,19.27 8.44,18.38L9.59,13.44C9.59,13.44 9.3,12.86 9.3,11.94C9.3,10.56 10.16,9.53 11.14,9.53C12,9.53 12.4,10.16 12.4,10.97C12.4,11.83 11.83,13.06 11.54,14.24C11.37,15.22 12.06,16.08 13.06,16.08C14.84,16.08 16.22,14.18 16.22,11.5C16.22,9.1 14.5,7.46 12.03,7.46C9.21,7.46 7.55,9.56 7.55,11.77C7.55,12.63 7.83,13.5 8.29,14.07C8.38,14.13 8.38,14.21 8.35,14.36L8.06,15.45C8.06,15.62 7.95,15.68 7.78,15.56C6.5,15 5.76,13.18 5.76,11.71C5.76,8.55 8,5.68 12.32,5.68C15.76,5.68 18.44,8.15 18.44,11.43C18.44,14.87 16.31,17.63 13.26,17.63C12.29,17.63 11.34,17.11 11,16.5L10.33,18.87C10.1,19.73 9.47,20.88 9.04,21.57V21.54Z" />
        </svg>
      ),
    },
  ],
};

export const Footer = () => {
  return (
    <footer className="mt-24 md:mt-32" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="pb-16">
        <div className="space-y-16">
          <div className="space-y-8">
            <Logo className="h-7 w-auto" />
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Minimalist printable calendars and habit trackers.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/75 hover:text-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5"
          >
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Products
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.products.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                By Year
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.years.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                By Language
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.languages.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Formats
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.formats.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Legal
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <p className="pt-8 text-xs leading-5 text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Use Minimal. All rights reserved.
          </p>
        </div>

        <nav aria-label="All calendars" className="sr-only">
          <h4>Printable calendars by year</h4>
          <ul>
            {AVAILABLE_CALENDARS.map((calendar) => (
              <li key={calendar.year}>
                <Link href={`/calendars/${calendar.year}/simple`}>
                  {calendar.year} printable calendar PDF
                </Link>
              </li>
            ))}
          </ul>

          <h4>Printable calendars by language</h4>
          <ul>
            {SupportedLocales.map((locale) => (
              <li key={locale.code}>
                <Link
                  href={`/calendars/${CURRENT_YEAR}/simple/${locale.code}`}
                >
                  {locale.englishName} printable calendar
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
