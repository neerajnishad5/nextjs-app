import React from "react";

const DetailsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="min-h-[80vh]">{children}</div>;
};

export default DetailsLayout;
