export const BuyButton = ({ link }: { link: string }) => {
  return (
    <a
      className="gumroad-button max-w-md"
      href="https://bjarocki.gumroad.com/l/minimalist"
      data-gumroad-overlay-checkout="true"
    >
      Download from
    </a>
  );
};
