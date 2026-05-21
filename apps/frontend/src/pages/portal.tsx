import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { NextSeo } from "next-seo";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LicenseForm } from "../components/portal/LicenseForm";
import { PortalContent } from "../components/portal/PortalContent";
import { useSessionLogin } from "../hooks/use-portal";
import {
  getSessionFromCookieHeader,
  type PortalSession,
} from "../lib/portal";

interface Props {
  session: PortalSession | null;
}

export default function Portal({ session }: Props) {
  const router = useRouter();
  const sessionLogin = useSessionLogin();
  // Auto-login from a Polar checkout redirect must run exactly once. The
  // mutation object's identity changes on every state transition, and
  // `session` stays null until the cookie is set + page reloads — so without
  // this guard the effect re-fires `mutate` forever and the spinner never
  // settles ("Setting up your account..." hangs).
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (!router.isReady || attemptedRef.current) return;
    const { success, customer_session_token } = router.query;

    if (
      success === "true" &&
      typeof customer_session_token === "string" &&
      !session
    ) {
      attemptedRef.current = true;
      sessionLogin.mutate(customer_session_token, {
        onSuccess: () => {
          window.location.href = "/portal";
        },
        // On failure, fall through to the manual license form below — the
        // customer also received a license key by email.
      });
    }
  }, [router.isReady, router.query, session, sessionLogin]);

  if (sessionLogin.isPending) {
    return (
      <Container>
        <main className="flex min-h-[50vh] items-center justify-center px-4 md:px-8">
          <p className="text-muted-foreground">Setting up your account...</p>
        </main>
      </Container>
    );
  }

  return (
    <>
      <NextSeo
        title="Customer Portal | Use Minimal"
        description="Access your calendar downloads"
        noindex
      />

      <Container>
        <main className="px-4 md:px-8">
          <div className="pb-12">
            <Header hideAccountLink />
          </div>

          {session ? (
            <PortalContent session={session} />
          ) : (
            <div className="space-y-6">
              {sessionLogin.isError && (
                <p className="max-w-md text-sm text-muted-foreground">
                  We couldn&apos;t sign you in automatically. Enter the license
                  key from your purchase email below — it&apos;s also in your
                  Polar receipt.
                </p>
              )}
              <LicenseForm />
            </div>
          )}
        </main>
        <Footer />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const session = getSessionFromCookieHeader(req.headers.cookie || "");
  return { props: { session } };
};
