import type { MouseEventHandler } from "react";

export const CommonCell = ({
  onClick,
  children,
  className,
}: {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`whitespace-nowrap ${className ? ` ${className}` : ""}`} onClick={onClick}>
    {children}
  </div>
);
