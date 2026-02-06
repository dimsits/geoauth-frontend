import { useEffect, useMemo, useState } from "react";

import GeoCard from "../components/GeoCard";
import GeoMap from "../components/GeoMap";
import { useSelfGeo } from "../hooks/useSelfGeo";
import { useGeoByIp } from "../hooks/useGeoByIp";
import { isValidIp } from "../../../lib/validators";

export default function HomePage() {
  // Self geo (always shown)
  const selfGeo = useSelfGeo();

  // IP search
  const [ipInput, setIpInput] = useState("");
  const [submittedIp, setSubmittedIp] = useState<string>("");
  const [ipError, setIpError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const trimmed = ipInput.trim();
    return trimmed.length > 0 && isValidIp(trimmed);
  }, [ipInput]);

  // Use submittedIp for the query so typing does not spam queries
  const geoByIp = useGeoByIp(submittedIp, { enabled: false });

  // When user submits a new IP, refetch once (manual-search behavior)
  useEffect(() => {
    if (!submittedIp) return;
    geoByIp.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedIp]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const candidate = ipInput.trim();

    if (!candidate) {
      setIpError("Please enter an IP address.");
      return;
    }

    if (!isValidIp(candidate)) {
      setIpError("Please enter a valid IPv4 or IPv6 address.");
      return;
    }

    setIpError(null);
    setSubmittedIp(candidate);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-6 p-4">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="text-sm text-muted">
            View your IP geolocation and optionally look up another IP.
          </p>
        </header>

        {/* Self Geo */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Your IP Geolocation</h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <GeoCard
              title="Self Geo"
              geo={selfGeo.data ?? null}
              loading={selfGeo.isLoading}
              errorMessage={selfGeo.error?.message ?? null}
            />

            <GeoMap
              title="Self Geo Map"
              geo={selfGeo.data ?? null}
              loading={selfGeo.isLoading}
              errorMessage={selfGeo.error?.message ?? null}
            />
          </div>
        </section>

        {/* IP Search (optional; used later for History integration) */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Search an IP</h2>

          <form
            onSubmit={onSearchSubmit}
            className="rounded-lg border border-border bg-surface p-4"
            aria-label="IP search form"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="w-full">
                <label htmlFor="ip" className="block text-sm font-medium">
                  IP address
                </label>
                <input
                  id="ip"
                  type="text"
                  inputMode="text"
                  placeholder="e.g. 8.8.8.8"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                />
                {ipError ? (
                  <p className="mt-1 text-sm text-error">{ipError}</p>
                ) : (
                  <p className="mt-1 text-xs text-muted">
                    Tip: IPv4 or IPv6 supported.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit || geoByIp.isFetching}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
              >
                {geoByIp.isFetching ? "Searching..." : "Search"}
              </button>
            </div>

            {geoByIp.error ? (
              <div className="mt-3 rounded-md border border-border bg-background p-3">
                <p className="text-sm text-error">{geoByIp.error.message}</p>
              </div>
            ) : null}
          </form>

          {submittedIp ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <GeoCard
                title={`Search Result: ${submittedIp}`}
                geo={geoByIp.data ?? null}
                loading={geoByIp.isFetching}
                errorMessage={geoByIp.error?.message ?? null}
              />

              <GeoMap
                title="Search Result Map"
                geo={geoByIp.data ?? null}
                loading={geoByIp.isFetching}
                errorMessage={geoByIp.error?.message ?? null}
              />
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
