import { GetServerSideProps } from "next";
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

export default function Portal({ session }: Props) {
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
