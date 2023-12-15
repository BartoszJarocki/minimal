import { Logo } from "./Logo";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { joinComponents } from "../lib/utils";
import { SupportedYears } from "./calendar/Calendar";
import { Badge } from "./Badge";

const navigation = {
  calendars: [
    {
      name: `Minimalist`,
      href: `/calendars/preview/${new Date().getFullYear()}/minimalist/`,
    },
  ],
  habitTrackers: [{ name: "Configurator", href: '/habit-tracker' }],
  planners: [{ name: "Work in progress", href: null }],
  legal: [{ name: "Terms Of Service", href: "/terms" }],
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
    <footer className="border-t" aria-labelledby="footer-heading">
      <div className="px-4 pb-16 pt-16 md:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo className="h-7 w-auto" />
            <h2 className="text-sm leading-6 text-gray-600">
              <Balancer>
                Making the world more productive one day at a time.
              </Balancer>
            </h2>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-dark/75 hover:text-dark"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Calendars
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.calendars.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Habit trackers
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.habitTrackers.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <Badge>{item.name}</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Planners
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.planners.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <Badge>{item.name}</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Misc
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-b border-t border-gray-900/10 py-8">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Use Minimal. All rights reserved.
          </p>
        </div>

        <section className="text-dark/40 max-w-3xl py-8 text-xs">
          <h4 className="py-1">Next years calendars</h4>

          {SupportedYears.map((year) => (
            <Link
              key={year}
              className=" underline"
              href={`/calendars/preview/${year}`}
            >
              {year} printable calendar PDF
            </Link>
          )).reduce(joinComponents, [])}
        </section>
      </div>
    </footer>
  );
};
