import type { HistoryRecord } from "../history.types";

type HistoryItemProps = {
  item: HistoryRecord;

  /**
   * Optional delete handler.
   * If provided, a delete button is rendered.
   */
  onDelete?: (id: string) => void;
};

function formatLocation(item: HistoryRecord): string {
  if (!item.geo) return "Location unavailable";

  const parts = [item.geo.country, item.geo.continent].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "Location unavailable";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function HistoryItem({ item, onDelete }: HistoryItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-background p-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="break-all text-sm font-medium">{item.ip}</span>
          <span className="text-xs text-muted">- {formatLocation(item)}</span>
        </div>

        <div className="mt-1 text-xs text-muted">{formatDate(item.createdAt)}</div>
      </div>

      {onDelete ? (
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="rounded-md border border-border bg-surface px-3 py-1 text-xs text-error hover:bg-background"
          aria-label={`Delete history item ${item.ip}`}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
}
