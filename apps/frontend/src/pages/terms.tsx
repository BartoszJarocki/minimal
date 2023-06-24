import { NextSeo } from "next-seo";
import { Container } from "../components/Container";
import { H1 } from "../components/H1";

const Terms = () => {
  const url = "https://useminimal.com";
  const title = `Use Minimal - Terms of Service`;
  const description = `Terms of Service for Use Minimal`;

  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          siteName: "Use Minimal",
          title,
          description,
          url,
          images: [
            {
              url: `${url}/api/open-graph?title=${title}&description=${description}`,
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{
          handle: "@UseMinimal",
          cardType: "summary_large_image",
        }}
      />
      <main className="pb-24">
        <section className="prose w-full break-words">
          <H1>Terms of Service</H1>
          <ol>
            <li>
              <p>
                Introduction: These Terms of Service (“Terms”) govern your use
                of our self printable PDFs, which are available for purchase
                through Gumroad and Etsy. By using our PDFs, you agree to these
                Terms.
              </p>
            </li>
            <li>
              <p>
                Use of PDFs: Our PDFs are for personal use only and may not be
                used for commercial purposes. You are not allowed to sell,
                license, or distribute our PDFs in any way.
              </p>
            </li>
            <li>
              <p>
                Ownership: Our PDFs are the property of the company and are
                protected by copyright and other intellectual property laws. You
                do not acquire any ownership rights by purchasing and using our
                PDFs.
              </p>
            </li>
            <li>
              <p>
                Refunds: We do not offer refunds for our PDFs, as they are
                digital products that cannot be returned.
              </p>
            </li>
            <li>
              <p>
                Warranty: Our PDFs are provided “as is” and we do not offer any
                warranties, express or implied, regarding their quality or
                performance.
              </p>
            </li>
            <li>
              <p>
                Limitation of Liability: In no event shall we be liable for any
                damages, including without limitation, direct, indirect,
                incidental, special, or consequential damages, arising out of or
                in connection with the use of our PDFs.
              </p>
            </li>
            <li>
              <p>
                Changes to Terms: We reserve the right to change these Terms at
                any time. Your continued use of our PDFs following any changes
                to these Terms constitutes your acceptance of those changes.
              </p>
            </li>
          </ol>
          <p>Privacy Policy:</p>
          <ol>
            <li>
              <p>
                Introduction: This Privacy Policy describes how we collect, use,
                and disclose your personal information when you use our self
                printable PDFs.
              </p>
            </li>
            <li>
              <p>
                Information Collection: We collect personal information such as
                your name and email address when you make a purchase through
                Gumroad or Etsy. This information is used to process your
                payment and deliver the PDFs to you.
              </p>
            </li>
            <li>
              <p>
                Information Use: We may use your personal information to
                communicate with you about your purchase, provide customer
                support, and for internal business purposes.
              </p>
            </li>
            <li>
              <p>
                Information Sharing: We do not share your personal information
                with third parties, except as necessary to fulfill your order
                (such as with Gumroad or Etsy) or as required by law.
              </p>
            </li>
            <li>
              <p>
                Data Security: We take reasonable steps to protect your personal
                information from unauthorized access, use, or disclosure.
                However, no data transmission over the internet can be
                guaranteed to be 100% secure.
              </p>
            </li>
            <li>
              <p>
                Changes to Privacy Policy: We reserve the right to change this
                Privacy Policy at any time. Your continued use of our PDFs
                following any changes to this Privacy Policy constitutes your
                acceptance of those changes.
              </p>
            </li>
            <li>
              <p>
                Contact Us: If you have any questions or concerns about our
                Privacy Policy, please contact us at [insert company email
                address].
              </p>
            </li>
          </ol>
        </section>
      </main>
    </Container>
  );
};

export default Terms;
