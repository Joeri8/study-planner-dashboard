import Link from "next/link";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <Link href={href} className="commonButton">
      {children}
    </Link>
  );
}
