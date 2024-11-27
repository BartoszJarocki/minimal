export const BuyButton = ({ link }: { link: string }) => {
  return (
    <a
      className="gumroad-button max-w-md"
      href={link}
      data-gumroad-overlay-checkout="true"
    >
      Download from
    </a>
  );
};
