import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowLeft, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE_NUMBER = "+421 909 159 609";
const PHONE_HREF = "tel:+421909159609";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>404 — Freshkom</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center bg-accent/20 px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="text-8xl sm:text-9xl font-extrabold text-primary/20 leading-none select-none mb-2">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t("notFound.heading")}
          </h1>

          <p className="text-gray-500 text-base sm:text-lg mb-8">
            {t("notFound.subtext")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-primary/90 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("notFound.backHome")}
            </Link>

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary/5 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            {t("notFound.help")}{" "}
            <a href={PHONE_HREF} className="text-primary font-medium hover:underline">
              {PHONE_NUMBER}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
