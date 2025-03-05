const SectionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`px-12 py-20 sm:p-[5rem] min-h-full min-w-full ${className}`}
    >
      {children}
    </div>
  );
};
export default SectionContainer;
