import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

  useEffect(() => {
    const { success, customer_session_token } = router.query;

    if (success === "true" && customer_session_token && !session) {
      sessionLogin.mutate(customer_session_token as string, {
        onSuccess: () => {
          window.location.href = "/portal";
        },
      });
    }
  }, [router.query, session, sessionLogin]);

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
