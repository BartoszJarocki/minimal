import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { LicenseForm } from "../components/portal/LicenseForm";
import { PortalContent } from "../components/portal/PortalContent";
import {
  getSessionFromCookieHeader,
  type PortalSession,
} from "../lib/portal";

interface Props {
  session: PortalSession | null;
}

export default function Portal({ session: initialSession }: Props) {
  const router = useRouter();
  const [session, setSession] = useState(initialSession);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { success, customer_session_token } = router.query;

    if (success === "true" && customer_session_token && !initialSession) {
      setIsLoading(true);
      fetch("/api/portal/session-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: customer_session_token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            router.replace("/portal", undefined, { shallow: false });
            window.location.href = "/portal";
          } else {
            setIsLoading(false);
          }
        })
        .catch(() => setIsLoading(false));
    }
  }, [router.query, initialSession, router]);

  if (isLoading) {
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
          <div className="flex items-center gap-x-6 pb-12">
            <Logo className="h-24 w-24" />
          </div>

          {session ? <PortalContent session={session} /> : <LicenseForm />}
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
