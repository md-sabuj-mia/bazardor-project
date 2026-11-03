


export default function CategoryHeader({
  icon,
  title,
  subtitle,
}) {
  return (
    <header className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-5 shadow-sm">
      <span aria-hidden className="text-3xl sm:text-4xl leading-none shrink-0">
        {icon}
      </span>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <p className="text-xs sm:text-sm text-base-content/70 mt-0.5">{subtitle}</p>
      </div>
    </header>
  );
}