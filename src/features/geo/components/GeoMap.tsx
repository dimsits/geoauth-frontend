import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
  // Extract coordinates from snapshot.
  // These fields can legitimately be null (API allows unresolved geo).
  const lat = geo?.latitude ?? null;
  const lng = geo?.longitude ?? null;

  const hasCoords = lat !== null && lng !== null;

  /**
   * React Leaflet `center` expects a `LatLngExpression`.
   * The tuple form `[number, number]` is the simplest and most type-safe for our use case.
   *
   * If coordinates are missing, `center` stays null and we render an empty state instead.
   */
  const center: [number, number] | null = hasCoords ? [lat, lng] : null;

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
          <p className="text-sm text-muted">Loading map…</p>
        </div>
      ) : null}

      {/* Error state */}
      {!loading && errorMessage ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-error">{errorMessage}</p>
        </div>
      ) : null}

      {/* Empty state (no coords) */}
      {!loading && !errorMessage && !center ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-muted">
            Map is unavailable because coordinates were not provided.
          </p>
        </div>
      ) : null}

      {/* Map */}
      {!loading && !errorMessage && center ? (
        <div
          className={[
            "overflow-hidden rounded-md border border-border",
            heightClassName,
          ].join(" ")}
        >
          <MapContainer
            center={center}
            zoom={11}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Using CircleMarker avoids Leaflet marker icon bundling issues */}
            <CircleMarker center={center} radius={10}>
              <Popup>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{geo?.ip ?? "IP"}</div>
                  <div className="text-xs">
                    {geo?.city ?? "—"}, {geo?.region ?? "—"}, {geo?.country ?? "—"}
                  </div>
                  <div className="text-xs">
                    {center[0].toFixed(6)}, {center[1].toFixed(6)}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          </MapContainer>
        </div>
      ) : null}
    </section>
  );
}
