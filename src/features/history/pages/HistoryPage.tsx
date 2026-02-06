import IpSearchBar from "../components/IpSearchBar";
import HistoryList from "../components/HistoryList";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-6 p-4">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-sm text-muted">
            Search IP addresses and review your past lookups.
          </p>
        </header>

        {/* IP Search */}
        <IpSearchBar />

        {/* History List */}
        <HistoryList />
      </div>
    </div>
  );
}
