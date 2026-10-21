import { useEffect, useId, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ShieldCheck, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/seo/routes";
import { useToast } from "@/hooks/use-toast";
import { cookieCopy } from "@/content/cookieCopy";

const btnBase =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full px-4 text-sm font-semibold leading-tight text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
// Accept and Reject share identical visual weight to avoid nudging.
const btnChoice = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`;
const btnQuiet = `${btnBase} border border-primary/40 bg-white text-primary hover:bg-accent`;

function PrivacyLink({ label, hint, href }: { label: string; hint: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
    >
      {label}
      <span className="sr-only"> {hint}</span>
    </a>
  );
}

export default function CookieConsent() {
  const { ready, consent, bannerVisible, settingsOpen, openSettings, closeSettings, restoreSettingsFocus, saveConsent } =
    useCookieConsent();
  const { lang } = useLanguage();
  const { toast } = useToast();
  const c = cookieCopy[lang];
  const privacyHref = localizePath("/ochrana-osobnych-udajov", lang);
  const titleId = useId();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Reset draft to stored choice whenever dialog opens.
  useEffect(() => {
    if (settingsOpen) {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
    }
  }, [settingsOpen, consent?.analytics, consent?.marketing]);

  const commit = (choices: { analytics: boolean; marketing: boolean }) => {
    const ok = saveConsent(choices);
    if (!ok) {
      toast({ title: c.storageFailTitle, description: c.storageFailBody });
    }
  };

  if (!ready) return null;

  const expires = consent?.expiresAt
    ? new Date(consent.expiresAt).toLocaleDateString(lang === "hu" ? "hu-HU" : "sk-SK")
    : null;

  const rows = [
    { key: "necessary" as const, copy: c.necessary, checked: true, disabled: true, set: undefined },
    { key: "analytics" as const, copy: c.analytics, checked: analytics, disabled: false, set: setAnalytics },
    { key: "marketing" as const, copy: c.marketing, checked: marketing, disabled: false, set: setMarketing },
  ];

  return (
    <>
      {bannerVisible && !settingsOpen && (
        <section
          role="region"
          aria-labelledby={titleId}
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-0 sm:px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="pointer-events-auto mx-auto w-full max-w-3xl max-h-[min(70dvh,32rem)] overflow-y-auto overscroll-contain rounded-2xl border border-primary/20 bg-white shadow-2xl shadow-foreground/15">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/20" aria-hidden="true" />
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden="true">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2 id={titleId} className="font-display text-base sm:text-lg font-bold text-foreground">
                    {c.bannerTitle}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">{c.bannerBody}</p>
                  <PrivacyLink label={c.privacyLink} hint={c.opensNewTab} href={privacyHref} />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button type="button" className={btnChoice} onClick={() => commit({ analytics: true, marketing: true })}>
                  {c.acceptAll}
                </button>
                <button type="button" className={btnChoice} onClick={() => commit({ analytics: false, marketing: false })}>
                  {c.rejectOptional}
                </button>
                <button id="cookie-banner-settings" type="button" className={btnQuiet} onClick={openSettings}>
                  {c.settings}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <DialogPrimitive.Root open={settingsOpen} onOpenChange={(o) => { if (!o) closeSettings(); }}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-foreground/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              restoreSettingsFocus();
            }}
            className="fixed z-[80] inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 flex w-full sm:max-w-lg max-h-[calc(100dvh-env(safe-area-inset-top)-0.5rem)] sm:max-h-[min(90dvh,44rem)] flex-col rounded-t-2xl sm:rounded-2xl border border-primary/20 bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border px-4 pt-4 pb-3 sm:px-6">
              <DialogPrimitive.Title className="font-display text-lg sm:text-xl font-bold text-foreground pt-2">
                {c.dialogTitle}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close
                aria-label={c.close}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </DialogPrimitive.Close>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
              <DialogPrimitive.Description className="text-sm leading-relaxed text-gray-700">
                {c.dialogDescription}
              </DialogPrimitive.Description>
              <div className="mt-1">
                <PrivacyLink label={c.privacyLink} hint={c.opensNewTab} href={privacyHref} />
              </div>

              <ul className="mt-3 space-y-2">
                {rows.map((r) => {
                  const id = `cookie-${r.key}`;
                  return (
                    <li key={r.key} className={`rounded-xl border p-3 sm:p-4 ${r.checked ? "border-primary/30 bg-accent/50" : "border-border bg-white"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <label htmlFor={id} className="min-w-0 cursor-pointer font-semibold text-foreground">
                          {r.copy.title}
                        </label>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-xs font-medium text-gray-600" aria-hidden="true">
                            {r.disabled ? c.alwaysOn : r.checked ? c.on : c.off}
                          </span>
                          <span className="inline-flex h-11 min-w-11 items-center justify-center">
                            <Switch
                              id={id}
                              checked={r.checked}
                              disabled={r.disabled}
                              onCheckedChange={r.set}
                              aria-describedby={`${id}-desc`}
                              className="h-6 w-11 disabled:opacity-60 [&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-5"
                            />
                          </span>
                        </div>
                      </div>
                      <p id={`${id}-desc`} className="mt-1 text-sm leading-relaxed text-gray-600">
                        {r.copy.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
              {expires && (
                <p className="mt-3 text-xs text-gray-600">
                  {c.savedOn} {expires}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:grid-cols-3 sm:px-6 sm:pb-4">
              <button type="button" className={btnQuiet} onClick={() => commit({ analytics, marketing })}>
                {c.saveSelection}
              </button>
              <button type="button" className={btnChoice} onClick={() => commit({ analytics: false, marketing: false })}>
                {c.rejectOptional}
              </button>
              <button type="button" className={btnChoice} onClick={() => commit({ analytics: true, marketing: true })}>
                {c.acceptAll}
              </button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
