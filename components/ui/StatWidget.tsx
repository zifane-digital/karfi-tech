import {
  LucideIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface StatWidgetProps {
  title: string;
  value: string;
  variation: string;
  positive?: boolean;
  icon: LucideIcon;
}

export default function StatWidget({
  title,
  value,
  variation,
  positive = true,
  icon: Icon,
}: StatWidgetProps) {
  return (
    <div className="card border border-secondary/30 bg-base-100 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="card-body">

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-sm text-base-content/60">
              {title}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-neutral">
              {value}
            </h2>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon size={22} />
          </div>

        </div>

        <div className="mt-4 flex items-center gap-2 text-sm">

          {positive ? (
            <TrendingUp
              size={16}
              className="text-success"
            />
          ) : (
            <TrendingDown
              size={16}
              className="text-error"
            />
          )}

          <span
            className={
              positive
                ? "font-semibold text-success"
                : "font-semibold text-error"
            }
          >
            {variation}
          </span>

          <span className="text-base-content/50">
            ce mois
          </span>

        </div>

      </div>
    </div>
  );
}