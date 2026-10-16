import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
  id?: string;
}

const Container: React.FC<Props> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={cn("max-w-339 px-4 mx-auto", className)}>
      {children}
    </section>
  );
};

export default Container;
