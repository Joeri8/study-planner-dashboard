type PageTitleProps = {
  title: string;
  description?: string;
};

export default function PageTitle({
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="pageTitle">
      <h1>{title}</h1>

      {description && <p>{description}</p>}
    </div>
  );
}