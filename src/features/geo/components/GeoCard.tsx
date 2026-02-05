import type { GeoSnapshot } from "../geo.types";

type GeoCardProps = {
  geo: GeoSnapshot | null;
  title?: string;

  /**
   * Optional convenience props so pages can keep markup thin.
   */
  loading?: boolean;
  errorMessage?: string | null;

  className?: string;
};

function formatLocation(geo: GeoSnapshot): string {
  const parts = [geo.city, geo.region, geo.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

function formatCoords(geo: GeoSnapshot): string {
  if (geo.latitude == null || geo.longitude == null) return "—";
  return `${geo.latitude.toFixed(6)}, ${geo.longitude.toFixed(6)}`;
}

function formatResolvedAt(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function GeoCard({
  geo,
  title = "Geolocation",
  loading,
  errorMessage,
  className,
}: GeoCardProps) {
  return (
    <section
      className={[
        "rounded-lg border border-border bg-surface p-4",
        className ?? "",
      ].join(" ")}
      aria-label="Geolocation details"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted">IP + Geo snapshot (source: ipinfo)</p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-muted">Loading geolocation…</p>
        </div>
      ) : null}

      {!loading && errorMessage ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-error">{errorMessage}</p>
        </div>
      ) : null}

      {!loading && !errorMessage && geo === null ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-muted">
            Geolocation is not available for this IP.
          </p>
        </div>
      ) : null}

      {!loading && !errorMessage && geo ? (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-background p-3">
            <dt className="text-xs font-medium text-muted">IP</dt>
            <dd className="mt-1 break-all text-sm">{geo.ip}</dd>
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <dt className="text-xs font-medium text-muted">Location</dt>
            <dd className="mt-1 text-sm">{formatLocation(geo)}</dd>
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <dt className="text-xs font-medium text-muted">Coordinates</dt>
            <dd className="mt-1 text-sm">{formatCoords(geo)}</dd>
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <dt className="text-xs font-medium text-muted">Timezone</dt>
            <dd className="mt-1 text-sm">{geo.timezone ?? "—"}</dd>
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <dt className="text-xs font-medium text-muted">Network</dt>
            <dd className="mt-1 text-sm">{geo.network ?? "—"}</dd>
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <dt className="text-xs font-medium text-muted">Postal Code</dt>
            <dd className="mt-1 text-sm">{geo.postalCode ?? "—"}</dd>
          </div>

          <div className="rounded-md border border-border bg-background p-3 sm:col-span-2">
            <dt className="text-xs font-medium text-muted">Resolved</dt>
            <dd className="mt-1 text-sm">
              {formatResolvedAt(geo.resolvedAt)}{" "}
              <span className="text-muted">({geo.source})</span>
            </dd>
          </div>
        </dl>
      ) : null}
    </section>
  );
}
