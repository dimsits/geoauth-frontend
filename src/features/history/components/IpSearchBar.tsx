// src/features/history/components/IpSearchBar.tsx
import { useMemo, useState } from "react";

import { isValidIp } from "../../../lib/validators";
import { useSearchIp } from "../hooks/useSearchIp";
import GeoCard from "../../geo/components/GeoCard";
import type { GeoSnapshot } from "../../geo/geo.types";

type IpSearchBarProps = {
  title?: string;
  className?: string;

  /**
   * If true, shows the returned geo snapshot below the search bar.
   * Defaults to true for better UX.
   */
  showResult?: boolean;
};

export default function IpSearchBar({
  title = "Search an IP",
  className,
  showResult = true,
}: IpSearchBarProps) {
  const search = useSearchIp();

  const [ipInput, setIpInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<GeoSnapshot | null>(null);
  const [lastSearchedIp, setLastSearchedIp] = useState<string | null>(null);

  const trimmed = ipInput.trim();

  const canSubmit = useMemo(() => {
    return trimmed.length > 0 && isValidIp(trimmed) && !search.isPending;
  }, [trimmed, search.isPending]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmed) {
      setInputError("Please enter an IP address.");
      return;
    }

    if (!isValidIp(trimmed)) {
      setInputError("Please enter a valid IPv4 or IPv6 address.");
      return;
    }

    setInputError(null);

    const res = await search.mutateAsync({ ip: trimmed });

    setLastSearchedIp(trimmed);
    setLastResult(res.geo ?? null);
  };

  return (
    <section
      className={[
        "rounded-lg border border-border bg-surface p-4",
        className ?? "",
      ].join(" ")}
      aria-label="IP search"
    >
      <div className="mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted">
          Search an IP address. Successful searches are recorded in your history.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
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
              aria-invalid={Boolean(inputError)}
              aria-describedby={inputError ? "ip-error" : undefined}
            />

            {inputError ? (
              <p id="ip-error" className="mt-1 text-sm text-error">
                {inputError}
              </p>
            ) : (
              <p className="mt-1 text-xs text-muted">IPv4 and IPv6 supported.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {search.isPending ? "Searching..." : "Search"}
          </button>
        </div>

        {search.error ? (
          <div className="rounded-md border border-border bg-background p-3">
            <p className="text-sm text-error">{search.error.message}</p>
          </div>
        ) : null}
      </form>

      {showResult && lastSearchedIp ? (
        <div className="mt-4">
          <GeoCard
            title={`Result: ${lastSearchedIp}`}
            geo={lastResult}
            loading={search.isPending}
            errorMessage={search.error?.message ?? null}
          />
        </div>
      ) : null}
    </section>
  );
}
