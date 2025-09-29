import React, { useMemo, useState } from "react";

// TailwindCSS expected. All UI is built with semantic HTML + Tailwind classes
// Replace contact info and seed data with your real content.

const SEED_PUPS = [
  {
    id: "p1",
    name: "Marley",
    breed: "Labrador Retriever",
    sex: "Male",
    ageWeeks: 12,
    priceUSD: 850,
    weight: "14 lb",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop",
    vaccinated: true,
    location: "Kingston, JM",
    bio: "Playful water‑lover, great with families and other pets.",
    gallery: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "p2",
    name: "Zuri",
    breed: "German Shepherd",
    sex: "Female",
    ageWeeks: 10,
    priceUSD: 1200,
    weight: "12 lb",
    image:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?q=80&w=1600&auto=format&fit=crop",
    vaccinated: true,
    location: "Montego Bay, JM",
    bio: "Confident guardian with a gentle heart and sharp mind.",
    gallery: [
      "https://images.unsplash.com/photo-1601758064136-76f0d4d9ec61?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "p3",
    name: "Kobe",
    breed: "Golden Retriever",
    sex: "Male",
    ageWeeks: 9,
    priceUSD: 1100,
    weight: "11 lb",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1600&auto=format&fit=crop",
    vaccinated: false,
    location: "Kingston, JM",
    bio: "Sunshine‑sweet, eager to please, and perfect for first‑time owners.",
    gallery: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558944351-c9c2f6c3af0f?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "p4",
    name: "Nala",
    breed: "French Bulldog",
    sex: "Female",
    ageWeeks: 13,
    priceUSD: 2200,
    weight: "10 lb",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop",
    vaccinated: true,
    location: "Ocho Rios, JM",
    bio: "Compact cuddle bug with a big personality.",
    gallery: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1600&auto=format&fit=crop",
    ],
  },
];

const HELP_CONTACTS = [
  {
    type: "Shelter",
    name: "Kingston Animal Shelter",
    phone: "+1 (876) 555‑1200",
    email: "adopt@kingshelter.org",
    url: "https://example.org/shelter",
  },
  {
    type: "Vet",
    name: "Harbour View Veterinary Clinic",
    phone: "+1 (876) 555‑4433",
    email: "care@harbourvet.com",
    url: "https://example.org/vet",
  },
  {
    type: "Pet Food",
    name: "Paws & Provisions",
    phone: "+1 (876) 555‑7788",
    email: "orders@pawsprovisions.com",
    url: "https://example.org/food",
  },
];

const TESTIMONIALS_SEED = [
  {
    id: "t1",
    name: "Shanice B.",
    text:
      "We found our dream pup here. Smooth process, healthy puppy, and great support!",
    rating: 5,
  },
  { id: "t2", name: "Andre R.", text: "Professional and caring breeders.", rating: 4 },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

function PupCard({ pup, onOpen }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white/70 shadow hover:shadow-lg transition">
      <img
        src={pup.image}
        alt={`${pup.name} the ${pup.breed}`}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{pup.name}</h3>
            <p className="text-sm text-muted-foreground">{pup.breed}</p>
          </div>
          <Badge>{pup.sex}</Badge>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-medium">{pup.ageWeeks} wks</span>
          <span className="text-muted-foreground">{pup.location}</span>
          <span className="font-semibold">${pup.priceUSD}</span>
        </div>
        <button
          onClick={() => onOpen(pup)}
          className="mt-4 w-full rounded-xl bg-black text-white py-2.5 font-medium hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

function PupModal({ pup, onClose }) {
  if (!pup) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-full overflow-hidden rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <img src={pup.image} alt="" className="h-64 w-full object-cover md:h-full" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{pup.name}</h3>
                <p className="text-sm text-muted-foreground">{pup.breed}</p>
              </div>
              <Badge>{pup.sex}</Badge>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{pup.bio}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Age</dt>
                <dd>{pup.ageWeeks} weeks</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Weight</dt>
                <dd>{pup.weight}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Vaccinated</dt>
                <dd>{pup.vaccinated ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd>{pup.location}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xl font-semibold">${pup.priceUSD}</span>
              <button
                className="rounded-xl bg-black text-white px-4 py-2 hover:bg-zinc-800"
                onClick={onClose}
              >
                Close
              </button>
            </div>

            {pup.gallery?.length ? (
              <div className="mt-6">
                <h4 className="font-semibold">More photos</h4>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {pup.gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-20 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Steps() {
  const steps = [
    {
      title: "Browse available pups",
      text: "Use search to filter by breed or name. Open any profile to learn more.",
    },
    {
      title: "Submit an inquiry",
      text: "Fill out the form with your contact details and preferred puppy.",
    },
    {
      title: "Health & home check",
      text: "We coordinate vet checks and answer readiness questions.",
    },
    {
      title: "Meet & adopt",
      text: "Schedule a meet‑and‑greet, finalize paperwork, and take your new friend home!",
    },
  ];
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold">
              {i + 1}
            </div>
            <h4 className="font-semibold leading-tight">{s.title}</h4>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function HelpDirectory() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    return HELP_CONTACTS.filter((c) =>
      (c.name + " " + c.type).toLowerCase().includes(q.toLowerCase())
    );
  }, [q]);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle
          title="Get help"
          subtitle="Local shelters, vets, and pet‑supply partners"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search partners…"
          className="w-full sm:w-72 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((c, i) => (
          <div key={i} className="rounded-2xl border bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{c.name}</h4>
              <Badge>{c.type}</Badge>
            </div>
            <dl className="mt-3 text-sm">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="mb-1">{c.phone}</dd>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="mb-1">
                <a className="underline" href={`mailto:${c.email}`}>{c.email}</a>
              </dd>
              <dt className="text-muted-foreground">Website</dt>
              <dd>
                <a className="underline" href={c.url} target="_blank" rel="noreferrer">
                  Visit site
                </a>
              </dd>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm({ pups }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    puppyId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Replace with real POST action or email service
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div className="rounded-2xl border bg-green-50 p-6 text-green-900">
        <h4 className="text-lg font-semibold">Thanks! We received your inquiry.</h4>
        <p className="mt-1 text-sm">
          A team member will contact you shortly to discuss next steps.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border bg-white p-6 shadow">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email address</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Telephone</label>
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="+1 (876) 000‑0000"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Puppy of interest</label>
          <select
            value={form.puppyId}
            onChange={(e) => update("puppyId", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="">— Select a puppy —</option>
            {pups.map((p) => (
              <option key={p.id} value={p.id}>{`${p.name} • ${p.breed}`}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1 min-h-[120px] w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Tell us about your home, experience, and what you’re looking for"
        />
      </div>
      <button className="rounded-xl bg-black text-white px-4 py-2.5 font-medium hover:bg-zinc-800">
        Submit inquiry
      </button>
      <p className="text-xs text-muted-foreground">
        Or reach us directly at <a className="underline" href="mailto:hello@yourpuppystore.com">hello@yourpuppystore.com</a> or <a className="underline" href="tel:+18765550000">+1 (876) 555‑0000</a>.
      </p>
    </form>
  );
}

function Testimonials() {
  const [items, setItems] = useState(TESTIMONIALS_SEED);
  const [draft, setDraft] = useState({ name: "", text: "", rating: 5 });

  function submit(e) {
    e.preventDefault();
    if (!draft.name || !draft.text) return;
    setItems((arr) => [
      { id: "t" + (arr.length + 1), ...draft },
      ...arr,
    ]);
    setDraft({ name: "", text: "", rating: 5 });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{t.name}</h4>
              <div aria-label={`${t.rating} out of 5 stars`} className="text-yellow-500">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-700">{t.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="rounded-2xl border bg-white p-6 shadow">
        <SectionTitle title="Leave a review" subtitle="Share your experience" />
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Your name</label>
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Review</label>
            <textarea
              value={draft.text}
              onChange={(e) => setDraft({ ...draft, text: e.target.value })}
              className="mt-1 min-h-[120px] w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Tell others about your experience"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Rating</label>
            <input
              type="range"
              min={1}
              max={5}
              value={draft.rating}
              onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              className="mt-2 w-full"
            />
            <div className="text-sm">{draft.rating} / 5</div>
          </div>
          <button className="rounded-xl bg-black text-white px-4 py-2.5 font-medium hover:bg-zinc-800">
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
}

function InfoPanels() {
  const items = [
    {
      title: "Are you ready to own a dog?",
      bullets: [
        "Budget for food, vet care, grooming, and training.",
        "Daily time for walks, play, and enrichment.",
        "Pet‑friendly housing and a safe home setup.",
        "Commitment for 10–15+ years depending on breed.",
      ],
    },
    {
      title: "Learn more about buying a dog",
      bullets: [
        "Meet the puppy (or video call) and the breeder/guardian.",
        "Ask for vaccination and deworming records.",
        "Understand contracts, guarantees, and returns.",
        "Consider adoption from shelters and rescues.",
      ],
    },
    {
      title: "Caring for your new puppy",
      bullets: [
        "Schedule a vet exam within 72 hours of pickup.",
        "Start crate training and a consistent routine.",
        "Socialize with people, places, and gentle dogs.",
        "Feed a balanced diet and establish potty breaks.",
      ],
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border bg-white p-6 shadow">
          <h4 className="text-lg font-semibold">{it.title}</h4>
          <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700 space-y-1">
            {it.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function PuppyMarketplace() {
  const [activeTab, setActiveTab] = useState("available");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const pups = SEED_PUPS;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return pups.filter(
      (p) => p.name.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q)
    );
  }, [search, pups]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-black">🐾</div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">Puppy Marketplace</h1>
                <p className="text-xs text-muted-foreground">Find your new best friend</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab("available")}
                className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                  activeTab === "available" ? "bg-zinc-900 text-white hover:bg-zinc-900" : ""
                }`}
              >
                Available pups
              </button>
              <button
                onClick={() => setActiveTab("how")}
                className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                  activeTab === "how" ? "bg-zinc-900 text-white hover:bg-zinc-900" : ""
                }`}
              >
                How it works
              </button>
              <button
                onClick={() => setActiveTab("help")}
                className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                  activeTab === "help" ? "bg-zinc-900 text-white hover:bg-zinc-900" : ""
                }`}
              >
                Get help
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                  activeTab === "gallery" ? "bg-zinc-900 text-white hover:bg-zinc-900" : ""
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveTab("testimonials")}
                className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                  activeTab === "testimonials" ? "bg-zinc-900 text-white hover:bg-zinc-900" : ""
                }`}
              >
                Testimonials
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                  activeTab === "info" ? "bg-zinc-900 text-white hover:bg-zinc-900" : ""
                }`}
              >
                Puppy Care 101
              </button>
              <a
                href="#contact"
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black leading-tight">
              Meet your <span className="underline decoration-amber-400 decoration-8 underline-offset-4">forever friend</span>
            </h2>
            <p className="mt-3 text-zinc-700">
              Browse adorable, responsibly raised puppies from trusted guardians. Search by
              breed or name, explore profiles, and submit an inquiry in minutes.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => setActiveTab("available")}
                className="rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-zinc-800"
              >
                Explore available pups
              </button>
              <button
                onClick={() => setActiveTab("how")}
                className="rounded-xl border px-5 py-3 font-semibold hover:bg-zinc-50"
              >
                How it works
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=1600&auto=format&fit=crop"
              alt="Happy puppies"
              className="aspect-video w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 rotate-2 rounded-2xl bg-white px-4 py-2 shadow">
              <div className="text-sm">Trusted by <span className="font-semibold">1,200+</span> families</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        {/* Search bar visible on Available + Gallery */}
        {(activeTab === "available" || activeTab === "gallery") && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionTitle
              title={activeTab === "available" ? "Available pups" : "Gallery"}
              subtitle={
                activeTab === "available"
                  ? "Search by breed or name to find your match"
                  : "See all pups, past and present"
              }
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by breed or name…"
              aria-label="Search by breed or dog name"
              className="w-full sm:w-80 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        )}

        {activeTab === "available" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PupCard key={p.id} pup={p} onOpen={setSelected} />)
            )}
            {filtered.length === 0 && (
              <div className="rounded-2xl border bg-white p-6 text-center text-sm text-muted-foreground">
                No pups match that search right now.
              </div>
            )}
          </div>
        )}

        {activeTab === "how" && (
          <div className="space-y-6">
            <SectionTitle title="How it works" subtitle="Simple, safe, and transparent" />
            <Steps />
          </div>
        )}

        {activeTab === "help" && <HelpDirectory />}

        {activeTab === "gallery" && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <img key={p.id} src={p.image} alt={p.name} className="aspect-square w-full rounded-2xl object-cover" />
            ))}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <SectionTitle title="Happy families" subtitle="Real stories from adopters" />
            <Testimonials />
          </div>
        )}

        {activeTab === "info" && (
          <div className="space-y-6">
            <SectionTitle
              title="Puppy Care 101"
              subtitle="Guides to help you prepare, buy responsibly, and care for your pup"
            />
            <InfoPanels />
          </div>
        )}

        {/* Contact */}
        <div id="contact" className="mt-16 space-y-6">
          <SectionTitle title="Contact & Inquiry" subtitle="Have questions? We’re here to help." />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow lg:col-span-2">
              <ContactForm pups={SEED_PUPS} />
            </div>
            <aside className="rounded-2xl border bg-white p-6 shadow">
              <h4 className="font-semibold">Reach us directly</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">Email: </span>
                  <a className="underline" href="mailto:hello@yourpuppystore.com">hello@yourpuppystore.com</a>
                </li>
                <li>
                  <span className="text-muted-foreground">Phone: </span>
                  <a className="underline" href="tel:+18765550000">+1 (876) 555‑0000</a>
                </li>
                <li>
                  <span className="text-muted-foreground">Hours: </span>
                  Mon–Sat, 10am–6pm
                </li>
                <li className="text-muted-foreground">
                  We’ll respond within one business day.
                </li>
              </ul>
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm">
                <div className="font-medium">Adoption tip</div>
                <p className="mt-1 text-amber-900">
                  Always meet the puppy (or on video), review health records, and make sure the seller is reputable.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Puppy Marketplace. All rights reserved.
        </div>
      </footer>

      <PupModal pup={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
