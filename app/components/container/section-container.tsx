const SectionContainer = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...rest}
      className={`px-12 py-20  min-h-full min-w-full h-full ${className}`}
    >
      {children}
    </div>
  );
};
export default SectionContainer;
