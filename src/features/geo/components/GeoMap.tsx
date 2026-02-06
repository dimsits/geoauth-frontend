import type { GeoSnapshot } from "../geo.types";

export type GeoMapProps = {
  /**
   * The resolved geolocation snapshot to render.
   * If null, the map will render an empty state (unless `loading`/`errorMessage` override).
   */
  geo: GeoSnapshot | null;

  /**
   * Title displayed above the map.
   * Defaults to "Map".
   */
  title?: string;

  /**
   * When true, renders a loading state instead of the map.
   * Recommended to pass `isLoading` from the parent query/hook.
   */
  loading?: boolean;

  /**
   * Optional UI-safe error message.
   * Recommended to pass `error?.message` (normalized AppError) from the parent query/hook.
   */
  errorMessage?: string | null;

  /**
   * Tailwind height utility class for the map container.
   * Defaults to "h-72".
   *
   * Examples:
   * - "h-64"
   * - "h-80"
   * - "h-[420px]"
   */
  heightClassName?: string;

  /**
   * Optional container className for layout overrides (margin, grid placement, etc.).
   */
  className?: string;
};

export default function GeoMap({
  geo,
  title = "Map",
  loading,
  errorMessage,
  heightClassName = "h-72",
  className,
}: GeoMapProps) {
  return (
    <section
      className={[
        "rounded-lg border border-border bg-surface p-4",
        className ?? "",
      ].join(" ")}
      aria-label="Geolocation map"
    >
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted">Visual location preview</p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-muted">Loading map...</p>
        </div>
      ) : null}

      {/* Error state */}
      {!loading && errorMessage ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-error">{errorMessage}</p>
        </div>
      ) : null}

      {/* Empty state (no coords) */}
      {!loading && !errorMessage ? (
        <div
          className={[
            "flex items-center justify-center rounded-md border border-border bg-background",
            heightClassName,
          ].join(" ")}
        >
          <div className="text-center text-sm text-muted">
            Map is unavailable for {geo?.ip ?? "this IP"} because ipinfo does not provide coordinates.
          </div>
        </div>
      ) : null}
    </section>
  );
}
