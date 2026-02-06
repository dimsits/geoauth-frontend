import { useMemo } from "react";

import HistoryItem from "./HistoryItem";
import { useHistoryList } from "../hooks/useHistoryList";
import { useDeleteHistory } from "../hooks/useDeleteHistory";

type HistoryListProps = {
  /**
   * Optional limit passed to the history list endpoint.
   * If omitted, backend default is used.
   */
  limit?: number;

  /**
   * Section title shown above the list.
   */
  title?: string;

  className?: string;
};

export default function HistoryList({
  limit,
  title = "Search History",
  className,
}: HistoryListProps) {
  const list = useHistoryList({ limit });
  const del = useDeleteHistory();

  const items = list.data ?? [];

  const canDelete = useMemo(() => {
    return !del.isPending && !list.isLoading;
  }, [del.isPending, list.isLoading]);

  const onDelete = async (id: string) => {
    if (!canDelete) return;
    await del.mutateAsync({ ids: [id] });
  };

  return (
    <section
      className={[
        "rounded-lg border border-border bg-surface p-4",
        className ?? "",
      ].join(" ")}
      aria-label="Search history"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted">
            Recent IP lookups recorded for your account.
          </p>
        </div>

        {del.isPending ? (
          <span className="text-xs text-muted">Deleting…</span>
        ) : null}
      </div>

      {list.isLoading ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-muted">Loading history…</p>
        </div>
      ) : null}

      {!list.isLoading && list.error ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-error">{list.error.message}</p>
        </div>
      ) : null}

      {!list.isLoading && !list.error && items.length === 0 ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-muted">
            No searches yet. Use the search bar to look up an IP.
          </p>
        </div>
      ) : null}

      {!list.isLoading && !list.error && items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onDelete={canDelete ? onDelete : undefined}
            />
          ))}
        </div>
      ) : null}

      {del.error ? (
        <div className="mt-3 rounded-md border border-border bg-background p-3">
          <p className="text-sm text-error">{del.error.message}</p>
        </div>
      ) : null}
    </section>
  );
}
