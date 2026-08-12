import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function Card({
  children,
  title,
  description,
  className = "",
}: CardProps) {
  return (
    <div
      className={[
        "card border border-secondary/30",
        "bg-base-100 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="card-body">
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2 className="card-title text-neutral">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-base-content/50">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}