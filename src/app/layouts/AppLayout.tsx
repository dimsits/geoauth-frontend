import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";
import { useLogout } from "../../features/auth/hooks/useLogout";

function NavItem({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-md px-3 py-2 text-sm",
          isActive
            ? "bg-surface text-foreground"
            : "text-muted hover:bg-surface hover:text-foreground",
        ].join(" ")
      }
      end={to === "/"}
    >
      {label}
    </NavLink>
  );
}

export default function AppLayout({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold">GeoAuth</span>
            <nav className="flex items-center gap-1">
              <NavItem to="/" label="Home" />
              <NavItem to="/history" label="History" />
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user?.email ? (
              <span className="hidden text-sm text-muted sm:inline">
                {user.email}
              </span>
            ) : null}

            <button
              type="button"
              onClick={() => logout()}
              className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4">{children}</main>
    </div>
  );
}
