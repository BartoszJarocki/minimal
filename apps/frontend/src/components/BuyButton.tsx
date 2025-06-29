export const BuyButton = ({ link }: { link: string }) => {
  return (
    <a
      className="gumroad-button max-w-md"
      href={link}
      data-gumroad-overlay-checkout="true"
      aria-label="Purchase and download calendar PDF"
      role="button"
    >
      Download from Gumroad
    </a>
  );
};
