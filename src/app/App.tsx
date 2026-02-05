// src/app/App.tsx
import { AppProviders } from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-4">
          <h1 className="text-3xl font-bold">GeoAuth</h1>
          <p className="text-sm text-muted">
            Providers wired. Next: auth hooks + routing.
          </p>
        </div>
      </div>
    </AppProviders>
  );
}

export default App;
