import clsx from "clsx";

export const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={clsx(
        "mx-auto min-h-screen max-w-5xl overflow-x-hidden py-24 px-2"
      )}
    >
      {children}
    </div>
  );
};
