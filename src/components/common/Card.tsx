type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="commonCard">
      {children}
    </div>
  );
}