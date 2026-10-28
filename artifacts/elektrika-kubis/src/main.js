const doc = document;
doc.documentElement.classList.add("js");

// Pätička: aktuálny rok
const year = doc.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Mobilné menu
const burger = doc.querySelector(".burger");
const nav = doc.getElementById("nav");
const closeNav = () => {
  nav.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
};
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", (e) => e.target.closest("a") && closeNav());
doc.addEventListener("keydown", (e) => e.key === "Escape" && closeNav());

// Odkrývanie sekcií pri skrolovaní
const reveals = doc.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// Dialóg s ochranou osobných údajov
const privacy = doc.getElementById("privacy");
doc.querySelectorAll("[data-open-privacy]").forEach((btn) =>
  btn.addEventListener("click", () => privacy.showModal()),
);
privacy.addEventListener("click", (e) => e.target === privacy && privacy.close());

// Predvyplnenie služby z kariet
const serviceSelect = doc.getElementById("f-service");
doc.querySelectorAll("[data-service]").forEach((link) =>
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  }),
);

// Formulár
const form = doc.getElementById("lead-form");
const statusEl = doc.getElementById("form-status");
const submitBtn = form.querySelector(".form__submit");

const setStatus = (msg, kind) => {
  statusEl.textContent = msg;
  statusEl.className = `form__status ${kind ? `is-${kind}` : ""}`;
};

const validate = () => {
  let firstBad = null;
  for (const input of form.querySelectorAll("input[required], select[required]")) {
    const field = input.closest(".field");
    const bad = !input.checkValidity() || (input.type === "text" && !input.value.trim());
    field.classList.toggle("is-invalid", bad);
    input.setAttribute("aria-invalid", String(bad));
    if (bad && !firstBad) firstBad = input;
  }
  const mail = form.elements.email;
  if (mail.value && !mail.checkValidity()) {
    mail.closest(".field").classList.add("is-invalid");
    firstBad ??= mail;
  } else mail.closest(".field").classList.remove("is-invalid");
  return firstBad;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const bad = validate();
  if (bad) {
    setStatus(bad.type === "checkbox" ? "Potvrďte prosím súhlas so spracovaním údajov." : "Skontrolujte prosím označené polia.", "err");
    bad.focus();
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  data.consent = true;
  submitBtn.disabled = true;
  setStatus("Odosielam…");
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(String(res.status));
    form.reset();
    setStatus("Ďakujem, dopyt som prijal. Ozvem sa vám čo najskôr.", "ok");
  } catch {
    setStatus("Odoslanie sa nepodarilo. Zavolajte prosím na 0951 357 127 alebo napíšte na WhatsApp.", "err");
  } finally {
    submitBtn.disabled = false;
  }
});
