"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { WealonLogo } from "@/modules/ui/Icons";

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          window.location.href = "/admin";
          return;
        }

        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(payload?.error ?? "Login failed");
      } catch {
        setError("Login failed");
      }
    });
  };

  if (!isMounted) {
    return (
      <main suppressHydrationWarning className="min-h-screen bg-[#0b3f93]" />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b3f93] text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 58% 48%, rgba(54,157,221,0.68), transparent 34%), radial-gradient(circle at 34% 54%, rgba(28,109,189,0.72), transparent 38%), linear-gradient(90deg, #0a2f72 0%, #14599f 42%, #0d4691 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-20 bg-[#08285f]/70" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[#08285f]/78" />
      <div className="absolute inset-y-0 left-0 w-10 bg-[#061f55]/55" />
      <div className="absolute inset-y-0 right-0 w-10 bg-[#061f55]/45" />

      <div className="relative grid min-h-screen grid-rows-[1fr_auto]">
        <section className="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-24 md:grid-cols-[360px_minmax(0,1fr)] max-md:content-center max-md:py-28">
          <div className="flex items-center justify-center md:justify-end">
            <div className="text-center md:text-left">
              <div className="flex items-end justify-center gap-3 md:justify-start">
                <WealonLogo
                  size={92}
                  className="w-20 rounded-lg bg-white p-1 shadow-[0_8px_22px_rgba(0,0,0,0.45)]"
                />
                <div className="pb-2">
                  <p className="text-sm text-white/75">Wealon</p>
                  <h1 className="text-4xl font-light leading-none tracking-wide text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.45)] max-sm:text-3xl">
                    Admin
                    <span className="align-super text-base font-bold text-[#f4b13d]">
                      xp
                    </span>
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Content Management Console
              </p>
            </div>
          </div>

          <form
            onSubmit={handleLogin}
            className="mx-auto w-full max-w-[430px] rounded-sm bg-[#124f96]/28 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-4">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded border border-white/85 bg-white p-1 shadow-[0_0_0_3px_rgba(110,220,80,0.75),0_4px_12px_rgba(0,0,0,0.45)]">
                <WealonLogo
                  size={62}
                  className="w-full rounded bg-white p-0 shadow-none ring-0"
                />
              </div>

              <div className="min-w-0">
                <p className="text-lg font-bold leading-tight text-[#75ff38] drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                  Administrator
                </p>
                <label className="sr-only" htmlFor="admin-email">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-8 w-full max-w-[250px] rounded-sm border border-[#7aa7d8] bg-white/95 px-2 text-sm text-slate-950 outline-none shadow-[inset_1px_1px_2px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.25)] placeholder:text-slate-500 focus:border-white"
                />
                <div className="mt-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded border border-[#80aee0] bg-gradient-to-b from-[#4f8ac8] to-[#1b5798] text-xl font-bold text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.35)]"
                    aria-label="Password options"
                  >
                    +
                  </button>
                  <label className="sr-only" htmlFor="admin-password">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-8 w-full max-w-[176px] rounded-sm border border-[#7aa7d8] bg-white px-2 text-sm text-slate-950 outline-none shadow-[inset_1px_1px_2px_rgba(0,0,0,0.35)] placeholder:text-slate-500 focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex h-8 w-10 items-center justify-center rounded border border-[#80aee0] bg-gradient-to-b from-[#6fa1dc] to-[#245fa3] text-xl font-bold text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.35)] disabled:opacity-70"
                    aria-label="Sign in"
                  >
                    {isPending ? "..." : "➜"}
                  </button>
                </div>
                {error ? (
                  <p className="mt-3 max-w-[310px] rounded-sm bg-[#7e1d1d]/75 px-2 py-1 text-xs text-white">
                    {error}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[76px_minmax(0,1fr)] gap-4 opacity-75">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded border border-white/75 bg-white/90 p-1">
                <WealonLogo
                  size={50}
                  className="w-full rounded bg-white p-0 shadow-none ring-0"
                />
              </div>
              <div className="pt-1">
                <p className="text-base font-bold text-white">Wealon</p>
                <p className="text-xs text-white/70">
                  CMS access requires administrator credentials.
                </p>
              </div>
            </div>
          </form>
        </section>

        <footer className="relative flex items-center justify-between px-6 py-5 max-sm:px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/85 hover:text-white"
          >
            <span className="flex h-8 w-10 items-center justify-center rounded border border-[#f3b1a9] bg-gradient-to-b from-[#e8644e] to-[#b71919] shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]">
              ⏻
            </span>
            <span>Back to desktop</span>
          </Link>
          <div className="text-right text-xs text-white/55 max-sm:hidden">
            <p>After you sign in, the Wealon XP CMS will open.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
