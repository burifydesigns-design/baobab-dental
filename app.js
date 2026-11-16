const branches = [
  {
    slug: "perth-city",
    name: "Perth City",
    neighborhood: "Thoughtful care in the heart of Perth",
    address: "Perth CBD, WA 6000, Australia",
    hours: "Mon–Fri, 8:00–18:00 · Sat, 9:00–14:00",
    phone: "+61 8 0000 0001",
    map: "https://maps.google.com/?q=Perth+CBD+WA+Australia",
    image: "photo-1606811841689-23dfddce3e95",
    label: "City living, considered care"
  },
  {
    slug: "subiaco",
    name: "Subiaco",
    neighborhood: "A quieter kind of care",
    address: "Subiaco, WA 6008, Australia",
    hours: "Mon–Fri, 8:00–18:00 · Sat, 9:00–14:00",
    phone: "+61 8 0000 0002",
    map: "https://maps.google.com/?q=Subiaco+WA+Australia",
    image: "photo-1629909613654-28e377c37b09",
    label: "Room to feel at ease"
  },
  {
    slug: "south-perth",
    name: "South Perth",
    neighborhood: "Close to your everyday",
    address: "South Perth, WA 6151, Australia",
    hours: "Mon–Fri, 8:00–18:00 · Sat, 9:00–14:00",
    phone: "+61 8 0000 0003",
    map: "https://maps.google.com/?q=South+Perth+WA+Australia",
    image: "photo-1559839734-2b71ea197ec2",
    label: "A little closer to home"
  }
];

const services = [
  { slug: "general-dentistry", name: "General dentistry", category: "Everyday care", short: "A good relationship with your dentist starts with the basics.", price: "From $80 AUD", image: "photo-1606811841689-23dfddce3e95", description: "Thoughtful check-ups and a clear picture of your oral health, so you can make decisions with confidence.", process: ["A conversation about your comfort, questions and goals.", "A gentle examination and digital images only when needed.", "A clear care plan, explained in plain language."], recovery: "Most routine visits fit easily into your day. Your clinician will share any specific advice before you leave." },
  { slug: "cleaning-hygiene", name: "Cleaning & hygiene", category: "Everyday care", short: "A fresh start for your teeth, gums and everyday routine.", price: "From $160 AUD", image: "photo-1629909613654-28e377c37b09", description: "A professional clean helps remove the build-up brushing can miss and gives you practical tips for home.", process: ["A gum health check and a conversation about your routine.", "A careful clean to remove plaque and hardened deposits.", "Personalised guidance to help your results last."], recovery: "Your teeth may feel a little sensitive for a short time. This varies from person to person." },
  { slug: "fillings", name: "Tooth-coloured fillings", category: "Restorative care", short: "Repair a tooth while keeping its natural character.", price: "From $250 AUD", image: "photo-1629909613654-28e377c37b09", description: "A filling restores a tooth affected by decay or minor damage. Your dentist will talk you through material options.", process: ["Assessment and imaging if clinically appropriate.", "Gentle removal of decay and preparation of the tooth.", "Placement and shaping of a restorative material."], recovery: "Temporary sensitivity can happen. Your dentist will advise you on what to expect for your tooth." },
  { slug: "root-canal", name: "Root canal care", category: "Restorative care", short: "Relieve infection and give a natural tooth a chance to stay.", price: "From $1,200 AUD", image: "photo-1629909613654-28e377c37b09", description: "When the soft tissue inside a tooth is inflamed or infected, root canal treatment may help preserve it.", process: ["A careful assessment and a discussion of suitable options.", "Cleaning and shaping the inside of the affected tooth.", "Sealing the tooth and planning any additional restoration."], recovery: "Some tenderness may follow treatment. Follow the personalised instructions from your treating clinician." },
  { slug: "extractions", name: "Tooth extractions", category: "Restorative care", short: "Clear advice and gentle support when a tooth needs to come out.", price: "From $350 AUD", image: "photo-1629909613654-28e377c37b09", description: "An extraction may be recommended when a tooth cannot be restored or is affecting your oral health.", process: ["Examination and discussion of the reason for removal.", "A plan to keep you comfortable during treatment.", "Aftercare guidance and a follow-up plan if needed."], recovery: "Recovery differs by procedure and person. You'll receive clear written and verbal aftercare." },
  { slug: "braces-aligners", name: "Braces & clear aligners", category: "Smile journeys", short: "A considered plan for a smile that feels more like you.", price: "Consultation from $100 AUD", image: "photo-1606811841689-23dfddce3e95", description: "Orthodontic treatment can improve alignment and bite. The right approach depends on a detailed assessment.", process: ["A conversation about your goals and clinical assessment.", "A personalised treatment plan with options and timelines.", "Regular progress visits and guidance throughout."], recovery: "Some temporary tenderness is common after adjustments or changing aligners. Your clinician can help you manage it." },
  { slug: "whitening", name: "Teeth whitening", category: "Smile journeys", short: "A brighter smile, guided by your dentist.", price: "From $650 AUD", image: "photo-1559839734-2b71ea197ec2", description: "Professional whitening begins with a dental health check and a conversation about realistic results.", process: ["Check that your teeth and gums are ready for whitening.", "Choose a suitable dentist-supervised whitening option.", "Follow guidance on application and sensitivity."], recovery: "Temporary sensitivity can occur. Your dentist will explain how to reduce irritation and when to pause." },
  { slug: "dental-implants", name: "Dental implants", category: "Restorative care", short: "Explore a lasting option for replacing a missing tooth.", price: "Consultation from $150 AUD", image: "photo-1629909613654-28e377c37b09", description: "An implant is one option for replacing missing teeth. Suitability depends on your health, bone and individual needs.", process: ["A comprehensive consultation and imaging where appropriate.", "A personalised treatment plan with clear stages and costs.", "Placement, healing and restoration with planned follow-up."], recovery: "Healing takes time and varies. Your care team will provide tailored instructions at each stage." },
  { slug: "veneers", name: "Veneers", category: "Smile journeys", short: "Explore subtle changes, thoughtfully planned.", price: "Consultation from $100 AUD", image: "photo-1559839734-2b71ea197ec2", description: "Veneers may change the appearance of teeth. Your dentist will discuss alternatives, suitability and long-term care.", process: ["A smile consultation and discussion of what matters to you.", "A clinical assessment and preview of treatment options.", "A personalised plan with materials, timing and costs."], recovery: "Your clinician will explain care and any sensitivity based on the treatment selected." },
  { slug: "childrens-dentistry", name: "Children's dentistry", category: "Care for every age", short: "Kind, confidence-building visits for growing smiles.", price: "From $80 AUD", image: "photo-1606811841689-23dfddce3e95", description: "Positive early visits help children feel comfortable and give families practical support for healthy habits.", process: ["A relaxed introduction at your child's pace.", "A gentle check and age-appropriate advice.", "Time for questions and a plan that feels manageable."], recovery: "Routine check-ups have no downtime. We'll share any follow-up guidance directly with you." },
  { slug: "emergency-dental-care", name: "Emergency dental care", category: "Here when you need us", short: "A helpful next step when something can't wait.", price: "Assessment from $100 AUD", image: "photo-1629909613654-28e377c37b09", description: "Dental pain, injury or swelling can be worrying. Call a clinic for advice and to check current availability.", process: ["Call us so the team can understand urgency and advise on next steps.", "A clinician assesses the problem and explains immediate options.", "We agree on follow-up care and what to watch for."], recovery: "Advice depends on the cause. Seek urgent medical care for facial swelling affecting breathing or swallowing." }
];

const team = [
  { name: "Dr. Sophie Bennett", role: "General dentist", note: "A calm, collaborative approach to everyday dental care.", image: "photo-1559839734-2b71ea197ec2" },
  { name: "Dr. Liam Parker", role: "Restorative dentist", note: "Helping patients understand their options, one step at a time.", image: "photo-1612349317150-e413f6a5b16d" },
  { name: "Dr. Emily Wilson", role: "Children's dentist", note: "Making early dental visits feel a little more familiar.", image: "photo-1594824476967-48c8b964273f" }
];

const articles = [
  { slug: "what-to-expect-first-visit", category: "Your first visit", title: "A calmer first visit starts before you arrive", read: "4 min read", image: "photo-1606811841689-23dfddce3e95", intro: "New places and new faces can feel like a lot. A little preparation can make your first dental visit feel more familiar.", content: ["Bring a list of any medicines you take and questions you'd like answered. You don't need to have everything figured out before you arrive.", "Your first appointment is a conversation as much as a check-up. Let the team know what helps you feel comfortable, and ask them to explain each step.", "You'll leave with a clear picture of any next steps. You can take time to consider your options before deciding on treatment."] },
  { slug: "sensitive-teeth-guide", category: "Everyday oral health", title: "Sensitive teeth: what might be behind it?", read: "5 min read", image: "photo-1559839734-2b71ea197ec2", intro: "A sharp twinge from a cold drink can have several causes. Understanding the pattern is a useful first step.", content: ["Sensitivity may be linked to gum recession, enamel wear, tooth decay or other causes. It isn't possible to diagnose the cause from a symptom alone.", "Notice when it happens, how long it lasts and whether anything makes it better or worse. Share this with a dentist at your visit.", "If pain is persistent, worsening or accompanied by swelling, contact a dental professional for individual advice."] },
  { slug: "making-checkups-a-habit", category: "Small habits, big difference", title: "Making regular check-ups part of your routine", read: "3 min read", image: "photo-1629909613654-28e377c37b09", intro: "A regular dental check-up is a chance to ask questions, spot changes and keep your care plan up to date.", content: ["How often you need a check-up depends on your oral health and personal risk factors. Your dentist can recommend an interval that suits you.", "Pairing a check-up with an existing routine, like a school holiday or annual health review, can make it easier to remember.", "Between visits, brush twice daily with fluoride toothpaste and clean between your teeth. Your dentist can help tailor these habits."] }
];

const Appointments = [
  { id: "BD-4811", time: "08:30", service: "General dentistry", branch: "Perth City", status: "Confirmed" },
  { id: "BD-4812", time: "09:15", service: "Cleaning & hygiene", branch: "Subiaco", status: "Confirmed" },
  { id: "BD-4813", time: "10:00", service: "Children's dentistry", branch: "South Perth", status: "Awaiting" },
  { id: "BD-4814", time: "11:30", service: "Braces consultation", branch: "Perth City", status: "Confirmed" },
  { id: "BD-4815", time: "13:00", service: "General dentistry", branch: "Subiaco", status: "Awaiting" },
  { id: "BD-4816", time: "14:15", service: "Dental consultation", branch: "South Perth", status: "Confirmed" },
  { id: "BD-4817", time: "15:30", service: "Cleaning & hygiene", branch: "Perth City", status: "Confirmed" }
];

const Staff = [
  { id: "STAFF-001", name: "Dr. Sophie Bennett", role: "General dentist", branch: "Perth City", shift: "08:00–16:00", status: "On shift" },
  { id: "STAFF-002", name: "Dr. Liam Parker", role: "Restorative dentist", branch: "Subiaco", shift: "09:00–17:00", status: "On shift" },
  { id: "STAFF-003", name: "Dr. Emily Wilson", role: "Children's dentist", branch: "South Perth", shift: "09:00–15:00", status: "Off shift" },
  { id: "STAFF-004", name: "Olivia Hart", role: "Practice coordinator", branch: "Perth City", shift: "08:00–16:00", status: "On shift" },
  { id: "STAFF-005", name: "Jack Turner", role: "Dental assistant", branch: "Subiaco", shift: "10:00–18:00", status: "On leave" }
];
const additionalDemoStaffNames = ["Alex Morgan", "Sam Mitchell", "Taylor Brooks", "Jordan Campbell", "Casey Walker"];

const Finance = {
  month: {
    collected: 64280,
    outstanding: 5840,
    expenses: 31890,
    series: [
      { month: "Jun", income: 58400, expense: 28600 },
      { month: "Jul", income: 61200, expense: 30200 },
      { month: "Aug", income: 59800, expense: 31500 },
      { month: "Sep", income: 67400, expense: 32900 },
      { month: "Oct", income: 72840, expense: 35210 },
      { month: "Nov", income: 64280, expense: 31890 }
    ],
    payments: [["Card & EFTPOS", "58%"], ["Private health funds", "27%"], ["Bank transfer", "10%"], ["Other", "5%"]],
    costs: [["Team & contractors", "42%"], ["Lab fees", "21%"], ["Supplies", "16%"], ["Facilities", "14%"], ["Other", "7%"]]
  },
  previous: {
    collected: 72840,
    outstanding: 4360,
    expenses: 35210,
    series: [
      { month: "May", income: 56200, expense: 27900 },
      { month: "Jun", income: 58400, expense: 28600 },
      { month: "Jul", income: 61200, expense: 30200 },
      { month: "Aug", income: 59800, expense: 31500 },
      { month: "Sep", income: 67400, expense: 32900 },
      { month: "Oct", income: 72840, expense: 35210 }
    ],
    payments: [["Card & EFTPOS", "61%"], ["Private health funds", "25%"], ["Bank transfer", "9%"], ["Other", "5%"]],
    costs: [["Team & contractors", "43%"], ["Lab fees", "20%"], ["Supplies", "16%"], ["Facilities", "14%"], ["Other", "7%"]]
  },
  quarter: {
    collected: 196400,
    outstanding: 11200,
    expenses: 101350,
    series: [
      { month: "Jun", income: 58400, expense: 28600 },
      { month: "Jul", income: 61200, expense: 30200 },
      { month: "Aug", income: 59800, expense: 31500 },
      { month: "Sep", income: 67400, expense: 32900 },
      { month: "Oct", income: 72840, expense: 35210 },
      { month: "Nov", income: 64280, expense: 31890 }
    ],
    payments: [["Card & EFTPOS", "60%"], ["Private health funds", "26%"], ["Bank transfer", "9%"], ["Other", "5%"]],
    costs: [["Team & contractors", "42%"], ["Lab fees", "21%"], ["Supplies", "16%"], ["Facilities", "14%"], ["Other", "7%"]]
  }
};

const Ledger = [
  { id: "RCPT-4101", date: "13 Nov", description: "Card settlement", branch: "Perth City", amount: 1840, status: "Reconciled" },
  { id: "RCPT-4102", date: "12 Nov", description: "Health fund batch", branch: "Subiaco", amount: 2190, status: "Pending" },
  { id: "EXP-2201", date: "12 Nov", description: "Laboratory invoice", branch: "South Perth", amount: -640, status: "Scheduled" },
  { id: "EXP-2202", date: "11 Nov", description: "Clinical supplies", branch: "Perth City", amount: -385, status: "Reconciled" },
  { id: "RCPT-4103", date: "10 Nov", description: "Bank transfer batch", branch: "South Perth", amount: 980, status: "Pending" }
];

const main = document.querySelector("#main");
const bookingDialog = document.querySelector("#booking-dialog");
const bookingForm = document.querySelector("#booking-form");
const bookingResult = document.querySelector("#booking-result");

const imageUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const image = (id, alt, cls = "", width = 900, loading = "lazy") => `<img class="${cls}" src="${imageUrl(id, width)}" alt="${alt}" loading="${loading}" decoding="async"${loading === "eager" ? ' fetchpriority="high"' : ""} />`;
const serviceHref = (slug) => `#/services/${slug}`;
const branchHref = (slug) => `#/clinics/${slug}`;

function serviceCard(item, index = 0) {
  return `<a class="service-card" href="${serviceHref(item.slug)}">
    <div class="service-card-image">${image(item.image, "", "", 700)}<span class="service-number">0${index + 1}</span></div>
    <div class="service-card-copy"><span class="card-kicker">${item.category}</span><h3>${item.name}</h3><p>${item.short}</p><span class="text-link">Explore treatment ${arrow}</span></div>
  </a>`;
}

function branchCard(branch) {
  return `<article class="branch-card">
    <a class="branch-image-link" href="${branchHref(branch.slug)}" aria-label="Explore the ${branch.name} clinic">${image(branch.image, `Illustrative image for the ${branch.name} clinic`) }<span class="image-label">${branch.label}</span></a>
    <div class="branch-card-body"><div class="branch-title"><span class="branch-pin" aria-hidden="true">⌖</span><h3>${branch.name}</h3></div><p class="branch-neighborhood">${branch.neighborhood}</p><p class="branch-address">${branch.address}</p><p class="branch-hours">${branch.hours}</p><div class="branch-links"><a href="${branchHref(branch.slug)}">Clinic details ${arrow}</a><a href="${branch.map}" target="_blank" rel="noopener noreferrer">Directions ↗</a></div></div>
  </article>`;
}

function sectionHeading(eyebrow, title, copy = "", link = "") {
  return `<div class="section-heading"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${copy ? `<p>${copy}</p>` : ""}</div>${link}</div>`;
}

function ctaBand(title = "Your next step can be a simple conversation.", copy = "Tell us what you need. We'll help you find the right place to begin.") {
  return `<section class="cta-band"><div><span class="eyebrow eyebrow-light">Care, on your terms</span><h2>${title}</h2><p>${copy}</p></div><button class="button button-cream" type="button" data-book>Find a time ${arrow}</button><span class="cta-orbit" aria-hidden="true"></span></section>`;
}

function trustStrip() {
  return `<section class="trust-strip" aria-label="Our approach"><div><span class="trust-icon">✳</span><span><strong>Care, without the rush</strong><small>Time to talk and understand</small></span></div><div><span class="trust-icon">⌖</span><span><strong>Here in your neighbourhood</strong><small>Three Perth clinic locations</small></span></div><div><span class="trust-icon">♡</span><span><strong>Made for real life</strong><small>Clear options, no pressure</small></span></div></section>`;
}

function homePage() {
  return `<section class="hero">
    <div class="hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span> Dentistry, with a little more heart</span>
      <h1>Care that feels<br /><em>different.</em></h1>
      <p class="hero-lede">A thoughtful dental home for every generation. Real conversations, considered care and a team that sees you.</p>
      <div class="hero-actions"><button class="button button-dark" type="button" data-book>Book a visit ${arrow}</button><a class="button button-outline" href="#/clinics">Find your clinic <span aria-hidden="true">⌖</span></a></div>
      <div class="hero-proof"><div class="proof-avatars"><span>A</span><span>D</span><span>W</span></div><p><strong>A team that takes time.</strong><br />Meet the people behind your care.</p><a href="#/team" aria-label="Meet our team">↗</a></div>
    </div>
    <div class="hero-visual"><div class="hero-image">${image("photo-1606811841689-23dfddce3e95", "A dentist explaining an x-ray to a patient", "", 1300, "eager")}</div>
      <div class="hero-float-card"><span class="float-spark">✳</span><span><strong>A little more at ease.</strong><small>Thoughtful care, from hello.</small></span></div>
      <div class="hero-location"><span class="location-dot"></span> Perth, Australia</div>
      <span class="hero-arc" aria-hidden="true"></span>
    </div>
    <div class="hero-side-note">GOOD CARE IS A JOURNEY, NOT A CHECKLIST <span>— BAOBAB, PERTH</span></div>
  </section>
  ${trustStrip()}
  <section class="section section-services">
    ${sectionHeading("The care you need, the way you need it", "Small steps. <em>Healthy smiles.</em>", "From your regular check-up to a little extra support, we'll help you understand your options.", '<a class="text-link section-all-link" href="#/services">All treatments '+arrow+'</a>')}
    <div class="service-grid">${services.slice(0, 4).map((item, index) => serviceCard(item, index)).join("")}</div>
  </section>
  <section class="story-section">
    <div class="story-image">${image("photo-1629909613654-28e377c37b09", "A bright, modern dental treatment room", "", 1200)}<div class="story-stamp"><span>Here for<br /><em>your smile</em></span><span class="stamp-mark">✳</span></div></div>
    <div class="story-copy"><span class="eyebrow">A different kind of dental visit</span><h2>Good care begins with <em>being heard.</em></h2><p>We're making space for the conversations that matter. Your questions, your comfort, your pace — they're all part of the care.</p><p>Meet a team that explains your options clearly and helps you feel at home, wherever you are in your dental journey.</p><a class="text-link" href="#/about">Get to know us ${arrow}</a></div>
  </section>
  <section class="section branch-section">
    ${sectionHeading("A familiar face, close to home", "Find your <em>Baobab.</em>", "Three welcoming clinics around Perth. Each one ready to make your next visit feel a little easier.", '<a class="text-link section-all-link" href="#/clinics">Explore all clinics '+arrow+'</a>')}
    <div class="branch-grid">${branches.map(branchCard).join("")}</div>
  </section>
  <section class="quote-section">
    <span class="quote-mark" aria-hidden="true">“</span>
    <blockquote>“The best dental care isn't only about your teeth. It's about how you feel while you're here.”</blockquote>
    <span class="quote-attribution">A thought we bring to every visit <span>·</span> Baobab Dental</span>
    <div class="quote-bottom"><span>OUR PROMISE, IN EVERY CONVERSATION</span><a href="#/about">The way we care ${arrow}</a></div>
  </section>
  <section class="section service-wide-section">${sectionHeading("A little more about what we do", "Care for every <em>kind of smile.</em>", "Explore the full range of ways we can help you feel good about your oral health.", '<a class="text-link section-all-link" href="#/services">View all treatments '+arrow+'</a>')}<div class="service-list">${services.slice(4).map((item, index) => `<a href="${serviceHref(item.slug)}"><span class="service-list-number">${String(index + 5).padStart(2, "0")}</span><span>${item.name}</span><span>${item.category}</span><span class="service-list-arrow">↗</span></a>`).join("")}</div></section>
  <section class="section journal-section">
    ${sectionHeading("A few good things to know", "Notes for your <em>everyday.</em>", "Friendly guidance, thoughtful ideas and the occasional myth, put to rest.", '<a class="text-link section-all-link" href="#/journal">Visit the journal '+arrow+'</a>')}
    <div class="journal-grid">${articles.map((article) => `<a class="journal-card" href="#/journal/${article.slug}"><div class="journal-image">${image(article.image, "")}<span class="journal-read">${article.read}</span></div><span class="card-kicker">${article.category}</span><h3>${article.title}</h3><span class="text-link">Read the story ${arrow}</span></a>`).join("")}</div>
  </section>
  <section class="emergency-strip"><div class="emergency-icon">+</div><div><span class="eyebrow">Something can't wait?</span><h2>Let's figure out the next step.</h2></div><p>Toothache or a dental injury? Call your nearest clinic for advice and to check same-day availability.</p><a class="button button-dark" href="tel:+61800000000">Call our team ${arrow}</a></section>
  ${ctaBand()}`;
}

function pageHero(eyebrow, title, copy, imageId = "photo-1606811841689-23dfddce3e95") {
  return `<section class="page-hero"><div class="page-hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span>${eyebrow}</span><h1>${title}</h1><p>${copy}</p><div class="breadcrumbs"><a href="#/">Home</a><span>/</span><span>${eyebrow}</span></div></div><div class="page-hero-image">${image(imageId, `Illustrative image for ${eyebrow.toLowerCase()}`, "", 1200)}<span class="page-image-mark">✳</span></div></section>`;
}

function servicesPage() {
  const categories = [...new Set(services.map(service => service.category))];
  return `${pageHero("Treatments", "Thoughtful care for <em>every smile.</em>", "From the everyday to the unexpected, find out what to expect and how we'll help you feel at ease.", "photo-1606811841689-23dfddce3e95")}
    <section class="section all-services-section">${sectionHeading("A good place to start", "Explore our <em>treatments.</em>", "Every care plan begins with a conversation about you. Browse services to learn more.")}
      <div class="filter-pills" role="group" aria-label="Filter treatments">${["All treatments", ...categories].map((category, i) => `<button type="button" class="filter-pill ${i === 0 ? "active" : ""}" data-filter="${i === 0 ? "all" : category}" aria-pressed="${i === 0}">${category}</button>`).join("")}</div>
      <div class="service-grid service-grid-all">${services.map((item, index) => `<div data-service-category="${item.category}">${serviceCard(item, index)}</div>`).join("")}</div>
    </section>
    <section class="section service-note"><div class="service-note-icon">✳</div><div><span class="eyebrow">Clear from the start</span><h2>Good care should never come with guesswork.</h2><p>Prices shown are illustrative starting points for this demo only. A dentist will explain what is right for you and confirm costs before treatment begins.</p></div><a class="text-link" href="#/patients?section=payments">About payment options ${arrow}</a></section>
    ${ctaBand("The right care starts with your questions.", "Tell us what you'd like to understand. We'll help you take it from there.")}`;
}

function servicePage(slug) {
  const item = services.find(service => service.slug === slug);
  if (!item) return notFound();
  return `<section class="detail-hero"><div class="detail-hero-copy"><div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/services">Treatments</a><span>/</span><span>${item.name}</span></div><span class="eyebrow"><span class="eyebrow-dot"></span>${item.category}</span><h1>${item.name}<em>, made personal.</em></h1><p>${item.description}</p><div class="detail-price"><span>Illustrative demo pricing</span><strong>${item.price}</strong></div><button class="button button-dark" type="button" data-book data-service="${item.slug}">Ask about this treatment ${arrow}</button></div><div class="detail-hero-image">${image(item.image, `Illustrative photo for ${item.name}`, "", 1200)}<div class="detail-floating">Care that starts<br /><em>with a conversation.</em></div></div></section>
    <section class="section detail-body"><div class="detail-main">${sectionHeading("What to expect", "A little more <em>at ease.</em>", item.description)}
      <div class="process-list">${item.process.map((step, index) => `<div><span>0${index + 1}</span><p>${step}</p></div>`).join("")}</div>
      <div class="recovery-card"><span class="eyebrow">After your visit</span><h3>Room to recover, with support.</h3><p>${item.recovery}</p></div>
      <div class="detail-disclaimer"><span>✳</span><p>This page is general information for a website demo, not personal medical advice. Your dentist will tailor guidance to you.</p></div>
    </div><aside class="detail-aside"><span class="eyebrow">Take the next step</span><h3>Have a question about ${item.name.toLowerCase()}?</h3><p>We're happy to talk it through, with no pressure to decide on the spot.</p><button class="button button-dark" type="button" data-book data-service="${item.slug}">Preview booking ${arrow}</button><div class="aside-divider"></div><span class="eyebrow">Visit us</span>${branches.map(branch => `<a class="aside-branch" href="${branchHref(branch.slug)}">${branch.name}<span>↗</span></a>`).join("")}</aside></section>
    <section class="section related-services">${sectionHeading("You might also like", "More ways we can <em>help.</em>")}<div class="related-grid">${services.filter(other => other.slug !== item.slug && other.category === item.category).slice(0, 3).map((other, index) => serviceCard(other, index)).join("")}</div></section>${ctaBand("Care should feel like a conversation.", "Tell us what's on your mind and we'll help you explore your options.")}`;
}

function clinicsPage() {
  return `${pageHero("Our clinics", "A familiar face, <em>close to home.</em>", "Three welcoming places across Perth, each with the same thoughtful approach to your care.", "photo-1629909613654-28e377c37b09")}
    <section class="section clinics-page">${sectionHeading("Find us around Perth", "Your neighbourhood, <em>your clinic.</em>", "Choose the location that works for you. Branch details shown here are illustrative for this website demo.")}<div class="branch-grid branch-grid-large">${branches.map(branchCard).join("")}</div></section>
    <section class="clinic-visit-note"><div><span class="eyebrow">A little more at ease</span><h2>Whichever door you walk through, <em>you belong here.</em></h2></div><p>Our teams share one simple idea: thoughtful care should feel personal, wherever you find us.</p><a class="text-link" href="#/about">The Baobab approach ${arrow}</a></section>${ctaBand("Find the right clinic for you.", "Choose a location and we'll help you take it from there.")}`;
}

function clinicPage(slug) {
  const branch = branches.find(location => location.slug === slug);
  if (!branch) return notFound();
  return `<section class="branch-detail-hero"><div class="branch-detail-copy"><div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/clinics">Our clinics</a><span>/</span><span>${branch.name}</span></div><span class="eyebrow"><span class="eyebrow-dot"></span>${branch.neighborhood}</span><h1>Your Baobab, <em>in ${branch.name}.</em></h1><p>A welcoming place to ask questions, get thoughtful care and feel a little more at home.</p><a class="button button-dark" href="${branch.map}" target="_blank" rel="noopener noreferrer">Get directions ${arrow}</a></div><div class="branch-detail-photo">${image(branch.image, `The ${branch.name} clinic interior`, "", 1500)}<span class="image-caption">${branch.label}</span></div></section>
    <section class="section clinic-details-layout"><div><span class="eyebrow">Come say hello</span><h2>We'd love to <em>see you.</em></h2><p>Our clinic team is here to help you with the details and find a time that suits.</p><button class="button button-dark" data-book type="button">Preview booking ${arrow}</button></div><div class="clinic-info-cards"><article><span>⌖</span><h3>Find us</h3><p>${branch.address}</p><a href="${branch.map}" target="_blank" rel="noopener noreferrer">Open directions ↗</a></article><article><span>◷</span><h3>Opening hours</h3><p>${branch.hours}</p><small>Hours are illustrative for demo only.</small></article><article><span>✆</span><h3>Give us a call</h3><p>${branch.phone}</p><a href="tel:${branch.phone.replaceAll(" ", "")}">Call this clinic ↗</a></article></div></section>
    <section class="section branch-services">${sectionHeading("Here for all the little things", "Care that fits <em>real life.</em>", "Our team can help you navigate a wide range of everyday and specialist dental care.")}<div class="service-grid">${services.slice(0, 3).map((item, index) => serviceCard(item, index)).join("")}</div><a class="text-link" href="#/services">Explore all treatments ${arrow}</a></section>${ctaBand("A good visit starts with a hello.", `Our ${branch.name} team is ready when you are.`)}`;
}

function teamPage() {
  return `${pageHero("Our people", "Meet the people behind <em>your care.</em>", "Good dentistry is a team effort. Meet a few of the friendly faces who make space for your questions.", "photo-1629909613654-28e377c37b09")}
    <section class="section team-section">${sectionHeading("A little more about us", "People first. <em>Always.</em>", "Names and credentials are fictional placeholders; they do not represent actual clinicians or imply First Nations identity. Verify all details before publishing.")}<div class="team-grid">${team.map(person => `<article class="team-card">${image(person.image, `Demo profile portrait for ${person.name}`, "", 800)}<div class="team-card-copy"><span class="card-kicker">${person.role}</span><h3>${person.name}</h3><p>${person.note}</p><span class="team-placeholder">Demo profile · Qualifications to be verified</span></div></article>`).join("")}</div></section>
    <section class="section team-values">${sectionHeading("What you can expect", "Time, clarity, <em>kindness.</em>")}<div class="value-grid"><article><span>01</span><h3>We listen first.</h3><p>Your priorities matter. We start by understanding what's important to you.</p></article><article><span>02</span><h3>We explain clearly.</h3><p>You'll have time to understand your options before choosing a next step.</p></article><article><span>03</span><h3>We go at your pace.</h3><p>Good care should work for your life, not the other way around.</p></article></div></section>${ctaBand("A friendly face is just around the corner.", "Find a clinic and start with a conversation.")}`;
}

function aboutPage() {
  return `${pageHero("Our story", "A more human kind of <em>dentistry.</em>", "We believe good care feels like being listened to. That's the idea behind every Baobab conversation.", "photo-1606811841689-23dfddce3e95")}
    <section class="story-section about-story"><div class="story-image">${image("photo-1629909613654-28e377c37b09", "Bright, welcoming dental clinic", "", 1200)}<div class="story-stamp"><span>Rooted in<br /><em>care</em></span><span class="stamp-mark">✳</span></div></div><div class="story-copy"><span class="eyebrow">Why Baobab</span><h2>There's more to a visit than <em>what happens in the chair.</em></h2><p>It's the welcome at the door. The time to ask one more question. The feeling that your choices are respected.</p><p>We're building a dental home around the things that make care feel more human — clear conversations, thoughtful details and room to be yourself.</p></div></section>
    <section class="section about-principles">${sectionHeading("The things we come back to", "Our roots. <em>Our reasons.</em>")}<div class="principle-grid"><article><span>✳</span><h3>Care is personal.</h3><p>No two people, smiles or stories are the same. Your care should reflect that.</p></article><article><span>↗</span><h3>Clarity builds trust.</h3><p>We make time to explain options and answer questions in language that makes sense.</p></article><article><span>♡</span><h3>Comfort is part of care.</h3><p>Small thoughtful moments can change how a dental visit feels.</p></article></div></section>
    <section class="section facility-section"><div class="facility-photo">${image("photo-1629909613654-28e377c37b09", "A clean and welcoming dental treatment room", "", 1300)}<span class="image-caption">A little room to breathe</span></div><div><span class="eyebrow">Your space, your pace</span><h2>Made to feel a little <em>more like you.</em></h2><p>Our clinic concept brings warmth and calm to the details, from a friendly first hello to clear explanations about your care.</p><p>Facility photography and technology details are illustrative. Clinic images and equipment specifications should be verified before publication.</p><a class="text-link" href="#/clinics">Explore our clinics ${arrow}</a></div></section>${ctaBand("We'd love to meet you.", "Come as you are. We'll take it from here.")}`;
}

function patientsPage() {
  const faqs = [
    ["What should I bring to my first visit?", "Bring any relevant medical or dental records, a list of medicines you take and your questions. If you have insurance, bring the details so the team can help you understand your cover."],
    ["How long will my appointment take?", "It depends on the reason for your visit. The clinic team can give you an estimate when you book. Please allow a little extra time for your first appointment."],
    ["Do you accept private health insurance?", "This demo does not represent actual cover arrangements. Please contact the clinic directly to confirm accepted health funds and what your policy includes. Medicare or public dental eligibility depends on your circumstances."],
    ["What payment methods can I use?", "Payment methods shown on this site are for demonstration. Confirm current card, EFTPOS and other payment options with your chosen clinic before your visit."],
    ["I'm nervous about dental treatment. What can I do?", "Let the team know before your visit. You can ask questions, request explanations and agree on a signal to pause. Your comfort matters."],
    ["What if I have a dental emergency?", "Call a clinic for advice and to check availability. If you have severe facial swelling that affects breathing or swallowing, seek urgent medical care immediately."]
  ];
  return `${pageHero("Patient guide", "Your visit, <em>made easier.</em>", "A few helpful details before you arrive, so you can feel more prepared and focus on what matters.", "photo-1606811841689-23dfddce3e95")}
    <section class="section patient-guide-grid"><article class="patient-guide-card"><span class="guide-number">01</span><span class="eyebrow">Before you arrive</span><h3>A little preparation goes a long way.</h3><p>Bring your questions, any relevant records and a list of medicines you take. Let us know if there's anything that would help you feel more at ease.</p></article><article class="patient-guide-card"><span class="guide-number">02</span><span class="eyebrow">At the clinic</span><h3>Your pace is the right pace.</h3><p>We'll explain what we're doing and why. You can ask us to pause, repeat something or talk through your options at any time.</p></article><article class="patient-guide-card"><span class="guide-number">03</span><span class="eyebrow">After your visit</span><h3>Clear next steps, no guesswork.</h3><p>We'll share any care instructions and help you understand what comes next. Ask for written guidance if that works better for you.</p></article></section>
    <section class="section payment-section" id="payments"><div class="payment-copy"><span class="eyebrow">The practical details</span><h2>Good care includes <em>clear answers.</em></h2><p>We want you to understand costs and payment options before choosing treatment. These details are placeholders in this demo — contact your clinic to verify current fees, payment methods and insurance arrangements.</p><button class="button button-dark" type="button" data-book>Ask our team ${arrow}</button></div><div class="payment-options"><article><span class="payment-icon">AUD</span><div><h3>Transparent estimates</h3><p>We'll explain the cost before treatment starts.</p></div></article><article><span class="payment-icon">EFT</span><div><h3>Payment options</h3><p>Confirm card, EFTPOS and other options with your clinic.</p></div></article><article><span class="payment-icon">♡</span><div><h3>Insurance & cover</h3><p>Ask us to help you check private health cover and eligibility.</p></div></article></div></section>
    <section class="section faq-section">${sectionHeading("Good questions", "Things you're <em>wondering about.</em>", "Can't see what you need? Our clinic teams are happy to help.")}<div class="faq-list">${faqs.map(([question, answer]) => `<details class="faq-item"><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join("")}</div></section>
    <section class="emergency-callout"><span class="emergency-icon">+</span><div><span class="eyebrow">For urgent dental concerns</span><h2>Don't wait and wonder.</h2><p>Call a clinic for advice and to check availability. Call emergency services if you have trouble breathing or swallowing.</p></div><a class="button button-dark" href="tel:+61800000000">Call the team ${arrow}</a></section>${ctaBand("A question is a good place to start.", "Get in touch and we'll point you in the right direction.")}`;
}

function journalPage() {
  return `${pageHero("The journal", "A few good things to <em>know.</em>", "Friendly guidance, thoughtful ideas and the occasional myth, put to rest. Always a good conversation to have with your dentist, too.", "photo-1629909613654-28e377c37b09")}
    <section class="section journal-page">${sectionHeading("Notes from the team", "Small reads, <em>useful ideas.</em>", "General information for everyday oral health. It isn't a substitute for advice from your dentist.")}<div class="journal-grid journal-grid-all">${articles.map(article => `<a class="journal-card journal-card-large" href="#/journal/${article.slug}"><div class="journal-image">${image(article.image, `Illustration for ${article.title}`)}<span class="journal-read">${article.read}</span></div><span class="card-kicker">${article.category}</span><h3>${article.title}</h3><p>${article.intro}</p><span class="text-link">Read the story ${arrow}</span></a>`).join("")}</div></section>
    <section class="journal-disclaimer"><span>✳</span><p>Our journal shares general educational information, not personalised diagnosis or treatment advice. Please speak with a dental professional about your individual needs.</p></section>${ctaBand("Questions are always welcome.", "Talk to a member of the team about what's on your mind.")}`;
}

function articlePage(slug) {
  const article = articles.find(item => item.slug === slug);
  if (!article) return notFound();
  return `<section class="article-hero"><div class="breadcrumbs"><a href="#/">Home</a><span>/</span><a href="#/journal">Journal</a><span>/</span><span>${article.category}</span></div><span class="eyebrow"><span class="eyebrow-dot"></span>${article.category} · ${article.read}</span><h1>${article.title}</h1><p>${article.intro}</p><div class="article-byline"><span class="author-avatar">B</span><span>Baobab Dental team <small>General information · Demo article</small></span></div></section>
    <div class="article-feature-image">${image(article.image, `Illustration for ${article.title}`, "", 1400)}</div>
    <article class="article-content"><p class="article-lede">${article.intro}</p>${article.content.map(paragraph => `<p>${paragraph}</p>`).join("")}<div class="article-callout"><span>✳</span><p>Have a question about your own dental health? A dentist can give advice tailored to you.</p><a class="text-link" href="#/clinics">Find a clinic ${arrow}</a></div><p class="article-disclaimer">This article is general information for demonstration purposes and is not a substitute for professional advice.</p><a class="text-link" href="#/journal">← Back to the journal</a></article>${ctaBand("Let's talk about what's right for you.", "We're here to help you find a good next step.")}`;
}

function contactPage() {
  return `${pageHero("Contact", "We're here to <em>make it easy.</em>", "Find a clinic, give us a call or send a quick WhatsApp. We'd be happy to help you take the next step.", "photo-1629909613654-28e377c37b09")}
    <section class="section contact-page"><div class="contact-intro"><span class="eyebrow">Say hello</span><h2>One conversation can <em>change everything.</em></h2><p>Our friendly team can help with clinic details, appointment questions and what to expect on your first visit.</p><a class="contact-phone" href="tel:+61800000000">+61 8 0000 0000 ${arrow}</a><span class="contact-demo-note">Illustrative contact number for demo only</span><a class="button button-dark" href="https://wa.me/?text=Hello%20Baobab%20Dental%20-%20this%20is%20a%20demo%20enquiry" target="_blank" rel="noopener noreferrer">Message on WhatsApp ${arrow}</a></div>
      <div class="contact-clinics">${branches.map(branch => `<article><div><span class="branch-pin">⌖</span><h3>${branch.name}</h3></div><p>${branch.address}</p><p>${branch.hours}</p><div><a href="${branchHref(branch.slug)}">Clinic details ↗</a><a href="${branch.map}" target="_blank" rel="noopener noreferrer">Directions ↗</a></div></article>`).join("")}</div>
    </section><section class="contact-emergency"><div><span class="eyebrow">Need help sooner?</span><h2>For a dental emergency, <em>call your nearest clinic.</em></h2><p>We'll help you understand what to do next and check current availability.</p></div><a class="button button-dark" href="tel:+61800000000">Call now ${arrow}</a></section>${ctaBand("We look forward to meeting you.", "Find your clinic and we'll take it from there.")}`;
}

function legalPage(which) {
  const content = {
    privacy: {
      eyebrow: "Privacy",
      title: "Your privacy matters.",
      intro: "This website is a static demonstration. It does not connect to a database, transmit booking details or collect health information.",
      sections: [
        ["Information this demo handles", "The booking preview uses only the choices you make in your browser tab (clinic, service, preferred day and time). It does not ask for your name, phone number or health details. The preview is not sent to Baobab Dental and is not stored."],
        ["External links and images", "This demo loads photography from Unsplash and provides optional links to WhatsApp and Google Maps. Those services have their own privacy practices. Opening an external link may share information with that provider."],
        ["Cookies and analytics", "No analytics, advertising pixels or tracking cookies are configured in this demonstration. The dismissible site notice is kept only in the current page view."],
        ["A real clinic website", "Before a live launch, replace this demo notice with a reviewed privacy policy describing the actual data controller, purposes, lawful basis, retention, processors, security, data-subject rights and contact details, in line with Australia's Privacy Act 1988, the Australian Privacy Principles and applicable Western Australian requirements."]
      ]
    },
    terms: {
      eyebrow: "Terms",
      title: "A note about this demo.",
      intro: "This site is a non-production website concept. Its copy and interactions are provided to demonstrate a possible clinic experience.",
      sections: [
        ["Illustrative information", "Branch locations, contact details, clinic hours, clinician profiles, prices, reviews and payment arrangements shown here are examples only and must be verified before publication."],
        ["Not a booking service", "The booking preview does not create, confirm, amend or cancel an appointment. Contact the clinic directly for real availability and booking."],
        ["Not medical advice", "Website content is general information only and cannot diagnose or treat an individual condition. Speak to a qualified dental professional for advice about your health."],
        ["Emergency concerns", "For severe facial swelling affecting breathing or swallowing, seek urgent medical attention. For other dental concerns, contact a dental professional for advice."]
      ]
    },
    cookies: {
      eyebrow: "Cookies",
      title: "No tracking, just a demo.",
      intro: "This demonstration doesn't set analytics, advertising or tracking cookies.",
      sections: [
        ["Essential browser behavior", "The browser may cache static website files and externally hosted images to display the page efficiently. The site itself doesn't use cookies to identify you."],
        ["Your choice", "The small notice at the bottom of the screen can be dismissed. That choice isn't saved after you close or reload the page."],
        ["External services", "If you choose to open WhatsApp or Google Maps, those providers may use their own technologies. Review their privacy and cookie information directly."]
      ]
    }
  }[which];
  if (!content) return notFound();
  return `<section class="legal-hero"><div class="breadcrumbs"><a href="#/">Home</a><span>/</span><span>${content.eyebrow}</span></div><span class="eyebrow"><span class="eyebrow-dot"></span>Baobab Dental · Website demo</span><h1>${content.title}</h1><p>${content.intro}</p></section><article class="legal-content">${content.sections.map(([title, copy], index) => `<section><span class="legal-number">0${index + 1}</span><div><h2>${title}</h2><p>${copy}</p></div></section>`).join("")}<div class="legal-updated">Demonstration copy · Review and replace before a public launch</div></article>${ctaBand("Questions? We're happy to help.", "Reach out to your preferred clinic.")}`;
}

function formatAdminCurrency(amount) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(amount);
}

function staffRows(staff) {
  return staff.map(member => `<tr data-staff-row>
    <td><span class="admin-appointment-id">${member.name}</span><span class="admin-row-subtitle">${member.id}</span></td>
    <td>${member.role}</td>
    <td><select class="admin-inline-select" data-staff-clinic="${member.id}" aria-label="Assign ${member.id} to clinic">${branches.map(branch => `<option value="${branch.name}"${member.branch === branch.name ? " selected" : ""}>${branch.name}</option>`).join("")}</select></td>
    <td>${member.shift}</td>
    <td><select class="admin-inline-select staff-status-${member.status.toLowerCase().replace(/ /g, "-")}" data-staff-status="${member.id}" aria-label="Set availability for ${member.id}">${["On shift", "Off shift", "On leave"].map(status => `<option value="${status}"${member.status === status ? " selected" : ""}>${status}</option>`).join("")}</select></td>
  </tr>`).join("");
}

function ledgerRows(entries) {
  return entries.map(entry => `<tr data-ledger-row>
    <td><span class="admin-appointment-id">${entry.id}</span></td>
    <td>${entry.date}</td>
    <td>${entry.description}</td>
    <td>${entry.branch}</td>
    <td class="ledger-amount ${entry.amount < 0 ? "amount-out" : "amount-in"}">${entry.amount < 0 ? "−" : "+"}${formatAdminCurrency(Math.abs(entry.amount))}</td>
    <td><select class="admin-ledger-status ledger-status-${entry.status.toLowerCase()}" data-ledger-status="${entry.id}" aria-label="Update reconciliation status for ${entry.id}">${["Reconciled", "Pending", "Scheduled"].map(status => `<option value="${status}"${entry.status === status ? " selected" : ""}>${status}</option>`).join("")}</select></td>
  </tr>`).join("");
}

function financeChart(rows) {
  const maxAmount = Math.max(...rows.map(row => Math.max(row.income, row.expense)));
  return rows.map(row => `<div class="finance-chart-column">
    <div class="finance-bar-pair" aria-label="${row.month}: collected ${formatAdminCurrency(row.income)}, costs ${formatAdminCurrency(row.expense)}">
      <span class="finance-bar finance-bar-income" style="height:${Math.round(row.income / maxAmount * 100)}%" title="Collected ${formatAdminCurrency(row.income)}"></span>
      <span class="finance-bar finance-bar-expense" style="height:${Math.round(row.expense / maxAmount * 100)}%" title="Costs ${formatAdminCurrency(row.expense)}"></span>
    </div><span class="finance-month">${row.month}</span>
  </div>`).join("");
}

function financeBreakdown(items, className) {
  return items.map(([name, share], index) => `<div class="finance-breakdown-row"><span class="finance-breakdown-name"><span class="finance-swatch ${className}-${index % 4}"></span>${name}</span><strong>${share}</strong></div>`).join("");
}

function adminPage() {
  const confirmedCount = Appointments.filter(appointment => appointment.status === "Confirmed").length;
  const awaitingCount = Appointments.filter(appointment => appointment.status === "Awaiting").length;
  const onShiftCount = Staff.filter(member => member.status === "On shift").length;
  const branchesSummary = branches.map(branch => {
    const count = Appointments.filter(appointment => appointment.branch === branch.name).length;
    return { ...branch, count };
  });
  const servicesSummary = [...new Set(Appointments.map(appointment => appointment.service))].map(service => ({
    name: service,
    count: Appointments.filter(appointment => appointment.service === service).length
  }));
  const rows = Appointments.map(appointment => `<tr data-admin-row data-branch="${appointment.branch}" data-status="${appointment.status}" data-id="${appointment.id.toLowerCase()}">
    <td class="admin-time">${appointment.time}</td>
    <td><span class="admin-appointment-id">${appointment.id}</span><span class="admin-row-subtitle">Demo appointment</span></td>
    <td>${appointment.service}</td>
    <td>${appointment.branch}</td>
    <td><select class="admin-status-select status-${appointment.status.toLowerCase()}" data-appointment-status="${appointment.id}" aria-label="Update status for ${appointment.id}">${["Confirmed", "Awaiting", "Completed", "Cancelled"].map(status => `<option value="${status}"${appointment.status === status ? " selected" : ""}>${status}</option>`).join("")}</select></td>
  </tr>`).join("");
  return `<div class="admin-topbar">
      <a class="brand" href="#/admin" aria-label="Baobab Dental admin demo">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 42 42" fill="none"><path d="M21 5v31M21 14C13 14 9 10 8 6c8 0 12 3 13 8Zm0 7c8 0 12-4 13-8-8 0-12 3-13 8Zm0 5c-7 0-11 3-13 8 7 0 11-2 13-8Zm0 0c7 0 11 3 13 8-7 0-11-2-13-8Z" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="brand-name">baobab<span>dental</span></span>
      </a>
      <div class="admin-top-actions"><span class="admin-demo-badge"><span></span> Demo dashboard</span><a href="#/">View public site ${arrow}</a></div>
    </div>
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="admin-workspace"><span class="admin-workspace-mark">B</span><span><strong>Baobab Dental</strong><small>Perth · Demo workspace</small></span><span class="admin-workspace-menu">⌄</span></div>
        <span class="admin-nav-label">Workspace</span>
        <nav class="admin-nav" aria-label="Admin demo navigation">
          <a class="admin-nav-link active" href="#/admin"><span>◫</span> Overview</a>
          <a class="admin-nav-link" href="#/admin?section=admin-appointments"><span>▤</span> Appointments <b>${demoAppointments.length}</b></a>
          <a class="admin-nav-link" href="#/admin?section=admin-staff"><span>♙</span> Staff</a>
          <a class="admin-nav-link" href="#/admin?section=admin-finances"><span>$</span> Finances</a>
          <a class="admin-nav-link" href="#/admin?section=admin-clinics"><span>⌖</span> Clinics</a>
          <a class="admin-nav-link" href="#/admin?section=admin-content"><span>▧</span> Website content</a>
        </nav>
        <div class="admin-sidebar-spacer"></div>
        <div class="admin-demo-note"><span class="admin-demo-note-icon">i</span><div><strong>Prototype mode</strong><p>No sign-in or access control. Use sample data only; nothing is saved or connected to a clinic system.</p></div></div>
        <a class="admin-back-link" href="#/">← Back to public website</a>
      </aside>
      <div class="admin-content">
        <section class="admin-intro" id="admin-overview">
          <div><span class="admin-date">${new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Perth", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date())}</span><h1>Welcome back, team.</h1><p>Here's a calm overview of the day ahead.</p></div>
          <button class="admin-primary-action" type="button" data-book><span>＋</span> Preview a booking</button>
        </section>
        <div class="admin-sample-banner"><span>✳</span><p><strong>Demo data only</strong> · These synthetic records contain no patient names, contact details or clinical notes.</p><span class="admin-sample-tag">NOT LIVE</span></div>
        <section class="admin-metrics" aria-label="Today's summary">
          <article class="admin-metric-card"><span class="admin-metric-icon icon-green">▤</span><span class="admin-metric-label">Appointments today</span><strong>${demoAppointments.length}</strong><small><span class="metric-neutral">Across three demo clinics</span></small></article>
          <article class="admin-metric-card"><span class="admin-metric-icon icon-blue">✓</span><span class="admin-metric-label">Confirmed</span><strong id="admin-confirmed-count">${confirmedCount}</strong><small><span class="metric-up">Ready for the day</span></small></article>
          <article class="admin-metric-card"><span class="admin-metric-icon icon-amber">◷</span><span class="admin-metric-label">Awaiting confirmation</span><strong id="admin-awaiting-count">${awaitingCount}</strong><small><span class="metric-neutral">Demo status only</span></small></article>
          <article class="admin-metric-card"><span class="admin-metric-icon icon-lilac">⌖</span><span class="admin-metric-label">Clinic locations</span><strong>${branches.length}</strong><small><span class="metric-neutral">Perth metro · illustrative</span></small></article>
        </section>
        <section class="admin-main-grid">
          <article class="admin-panel admin-appointments-panel" id="admin-appointments">
            <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Today · Perth time</span><h2>Appointment overview</h2></div><button class="admin-text-button" type="button" id="admin-print">Print view ↗</button></div>
            <div class="admin-filters">
              <label class="admin-search"><span aria-hidden="true">⌕</span><input id="admin-search" type="search" placeholder="Search demo ID" aria-label="Search by demo appointment ID" /></label>
              <select id="admin-branch-filter" aria-label="Filter appointments by clinic"><option value="">All clinics</option>${branches.map(branch => `<option value="${branch.name}">${branch.name}</option>`).join("")}</select>
              <select id="admin-status-filter" aria-label="Filter appointments by status"><option value="">All statuses</option>${["Confirmed", "Awaiting", "Completed", "Cancelled"].map(status => `<option value="${status}">${status}</option>`).join("")}</select>
            </div>
            <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>TIME</th><th>DEMO ID</th><th>VISIT TYPE</th><th>CLINIC</th><th>STATUS</th></tr></thead><tbody>${rows}</tbody></table></div>
            <div class="admin-empty" id="admin-empty" hidden>No demo appointments match these filters.</div>
            <div class="admin-table-footer"><span>Showing <strong id="admin-visible-count">${demoAppointments.length}</strong> synthetic records</span><span>Sample data · not connected</span></div>
          </article>
          <article class="admin-panel admin-clinic-panel" id="admin-clinics">
            <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Across Perth</span><h2>Clinic snapshot</h2></div><a class="admin-text-button" href="#/clinics">Public pages ↗</a></div>
            <div class="admin-clinic-list">${branchesSummary.map(branch => `<div class="admin-clinic-row"><span class="admin-clinic-pin">⌖</span><div class="admin-clinic-info"><strong>${branch.name}</strong><small>${branch.address}</small><div class="admin-progress"><span style="width:${Math.max(28, branch.count / demoAppointments.length * 100)}%"></span></div></div><span class="admin-clinic-count">${branch.count}<small>visits</small></span></div>`).join("")}</div>
            <div class="admin-panel-footnote">Visual distribution is based on the sample list above.</div>
          </article>
        </section>
        <section class="admin-secondary-grid">
          <article class="admin-panel admin-service-panel">
            <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Today · sample mix</span><h2>Visit types</h2></div><span class="admin-mini-tag">DEMO</span></div>
            <div class="admin-service-chart"><div class="admin-donut" style="--donut-value:${demoAppointments.length ? servicesSummary[0].count / demoAppointments.length * 100 : 0}%"><span><strong>${demoAppointments.length}</strong><small>visits</small></span></div>
              <div class="admin-service-legend">${servicesSummary.map((service, index) => `<div><span class="legend-swatch swatch-${index % 4}"></span><span>${service.name}</span><strong>${service.count}</strong></div>`).join("")}</div>
            </div>
          </article>
          <article class="admin-panel admin-content-panel" id="admin-content">
            <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Website</span><h2>Content at a glance</h2></div><span class="admin-mini-tag">STATIC DEMO</span></div>
            <div class="admin-content-list"><div><span class="admin-content-icon">◈</span><span><strong>Treatments</strong><small>${services.length} service pages · sample copy</small></span><span class="content-status">Preview</span></div><div><span class="admin-content-icon">✳</span><span><strong>Journal</strong><small>${articles.length} articles · sample copy</small></span><span class="content-status">Preview</span></div><div><span class="admin-content-icon">⌖</span><span><strong>Clinic pages</strong><small>${branches.length} locations · sample details</small></span><span class="content-status">Preview</span></div></div>
            <a class="admin-view-site" href="#/">Open public website ${arrow}</a>
          </article>
        </section>
        <section class="admin-module" id="admin-staff">
          <div class="admin-module-heading"><div><span class="admin-panel-kicker">Team & roster · illustrative</span><h2>Staff management</h2><p>Assign sample teammates to a clinic and update their demo availability.</p></div><button class="admin-primary-action" type="button" id="admin-add-staff"><span>＋</span> Add demo teammate</button></div>
          <div class="admin-metrics admin-staff-metrics">
            <article class="admin-metric-card"><span class="admin-metric-icon icon-green">♙</span><span class="admin-metric-label">Demo team members</span><strong id="admin-staff-total">${demoStaff.length}</strong><small><span class="metric-neutral">Fictional profiles only</span></small></article>
            <article class="admin-metric-card"><span class="admin-metric-icon icon-blue">✓</span><span class="admin-metric-label">On shift today</span><strong id="admin-staff-on-shift">${onShiftCount}</strong><small><span class="metric-neutral">Across sample locations</span></small></article>
            <article class="admin-metric-card"><span class="admin-metric-icon icon-amber">◷</span><span class="admin-metric-label">On leave</span><strong id="admin-staff-on-leave">${demoStaff.filter(member => member.status === "On leave").length}</strong><small><span class="metric-neutral">Demo availability</span></small></article>
            <article class="admin-metric-card"><span class="admin-metric-icon icon-lilac">⌖</span><span class="admin-metric-label">Clinic assignments</span><strong>${branches.length}</strong><small><span class="metric-neutral">Perth metro · illustrative</span></small></article>
          </div>
          <article class="admin-panel admin-staff-panel">
            <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Roster overview</span><h2>Team & clinic assignments</h2></div><span class="admin-mini-tag">SAMPLE PROFILES</span></div>
            <div class="admin-filters admin-staff-filters">
              <label class="admin-search"><span aria-hidden="true">⌕</span><input id="admin-staff-search" type="search" placeholder="Search role or demo ID" aria-label="Search staff by role or demo ID" /></label>
              <select id="admin-staff-branch-filter" aria-label="Filter staff by clinic"><option value="">All clinics</option>${branches.map(branch => `<option value="${branch.name}">${branch.name}</option>`).join("")}</select>
              <select id="admin-staff-status-filter" aria-label="Filter staff by availability"><option value="">All availability</option><option value="On shift">On shift</option><option value="Off shift">Off shift</option><option value="On leave">On leave</option></select>
            </div>
            <div class="admin-table-wrap"><table class="admin-table admin-staff-table"><thead><tr><th>TEAM MEMBER</th><th>ROLE</th><th>CLINIC ASSIGNMENT</th><th>NEXT SHIFT</th><th>AVAILABILITY</th></tr></thead><tbody id="admin-staff-rows">${staffRows(demoStaff)}</tbody></table></div>
            <div class="admin-empty" id="admin-staff-empty" hidden>No demo teammates match these filters.</div>
            <div class="admin-table-footer"><span>Showing <strong id="admin-staff-visible">${demoStaff.length}</strong> synthetic profiles</span><span>Changes stay in memory and reset on refresh.</span></div>
          </article>
        </section>
        <section class="admin-module" id="admin-finances">
          <div class="admin-module-heading"><div><span class="admin-panel-kicker">Practice performance · AUD</span><h2>Finances</h2><p>Illustrative totals only—not accounting, payroll or tax records.</p></div><label class="admin-period-select">Reporting period<select id="admin-finance-period" aria-label="Select finance reporting period"><option value="month">Month to date · Nov 2026</option><option value="previous">Previous month · Oct 2026</option><option value="quarter">Quarter to date</option></select></label></div>
          <div class="admin-metrics admin-finance-metrics">
            <article class="admin-metric-card"><span class="admin-metric-icon icon-green">$</span><span class="admin-metric-label">Collected</span><strong data-finance-field="collected">${formatAdminCurrency(demoFinance.month.collected)}</strong><small><span class="metric-neutral">Synthetic receipts</span></small></article>
            <article class="admin-metric-card"><span class="admin-metric-icon icon-amber">◷</span><span class="admin-metric-label">Outstanding</span><strong data-finance-field="outstanding">${formatAdminCurrency(demoFinance.month.outstanding)}</strong><small><span class="metric-neutral">Demo unpaid balance</span></small></article>
            <article class="admin-metric-card"><span class="admin-metric-icon icon-blue">−</span><span class="admin-metric-label">Operating costs</span><strong data-finance-field="expenses">${formatAdminCurrency(demoFinance.month.expenses)}</strong><small><span class="metric-neutral">Aggregated sample costs</span></small></article>
            <article class="admin-metric-card"><span class="admin-metric-icon icon-lilac">↗</span><span class="admin-metric-label">Operating surplus · estimate</span><strong data-finance-field="surplus">${formatAdminCurrency(demoFinance.month.collected - demoFinance.month.expenses)}</strong><small><span class="metric-neutral">Before tax · illustrative</span></small></article>
          </div>
          <div class="admin-finance-grid">
            <article class="admin-panel admin-finance-chart-panel">
              <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Recent monthly trend · AUD</span><h2>Collections & operating costs</h2></div><button class="admin-text-button" type="button" id="admin-finance-print">Print summary ↗</button></div>
              <div class="admin-chart-legend"><span><i class="legend-income"></i>Collected</span><span><i class="legend-expense"></i>Operating costs</span></div>
              <div class="admin-finance-chart" id="admin-finance-chart" role="img" aria-label="Illustrative six-month revenue and operating cost comparison">${financeChart(demoFinance.month.series)}</div>
            </article>
            <article class="admin-panel admin-finance-detail-panel">
              <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Illustrative breakdown</span><h2>Money in & out</h2></div><span class="admin-mini-tag">SAMPLE</span></div>
              <div class="admin-finance-breakdowns"><section><h3>Collection channels</h3><div id="admin-finance-payments">${financeBreakdown(demoFinance.month.payments, "payment-swatch")}</div></section><section><h3>Operating costs</h3><div id="admin-finance-costs">${financeBreakdown(demoFinance.month.costs, "cost-swatch")}</div></section></div>
              <p class="admin-panel-footnote">No invoices, bank feeds, payment gateways or payroll data are connected.</p>
            </article>
          </div>
          <article class="admin-panel admin-ledger-panel">
            <div class="admin-panel-heading"><div><span class="admin-panel-kicker">Recent activity · no patient links</span><h2>Demo ledger</h2></div><span class="admin-mini-tag">NOT ACCOUNTING DATA</span></div>
            <div class="admin-filters admin-ledger-filters">
              <label class="admin-search"><span aria-hidden="true">⌕</span><input id="admin-ledger-search" type="search" placeholder="Search reference or entry" aria-label="Search demo ledger entries" /></label>
              <select id="admin-ledger-status-filter" aria-label="Filter ledger by reconciliation status"><option value="">All reconciliation statuses</option>${["Reconciled", "Pending", "Scheduled"].map(status => `<option value="${status}">${status}</option>`).join("")}</select>
            </div>
            <div class="admin-table-wrap"><table class="admin-table admin-ledger-table"><thead><tr><th>REFERENCE</th><th>DATE</th><th>ENTRY</th><th>CLINIC</th><th>AMOUNT · AUD</th><th>RECONCILIATION</th></tr></thead><tbody id="admin-ledger-rows">${ledgerRows(demoLedger)}</tbody></table></div>
            <div class="admin-empty" id="admin-ledger-empty" hidden>No ledger entries match these filters.</div>
            <div class="admin-table-footer"><span>Showing <strong id="admin-ledger-visible">${demoLedger.length}</strong> synthetic entries</span><span>Status changes are temporary and reset on refresh.</span></div>
          </article>
        </section>
        <footer class="admin-footer"><span>Baobab Dental · Admin interface concept</span><span>Illustrative data only · No database or patient records</span></footer>
      </div>
    </div>`;
}

function notFound() {
  return `<section class="not-found"><span class="eyebrow">Page not found</span><h1>Let's get you <em>back on track.</em></h1><p>That page may have moved. You can explore our treatments or find a clinic below.</p><div><a class="button button-dark" href="#/">Back to home ${arrow}</a><a class="button button-outline" href="#/services">Explore treatments</a></div></section>`;
}

function render() {
  const [route, query = ""] = location.hash.replace(/^#\/?/, "").split("?");
  const path = route.split("#")[0];
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) main.innerHTML = homePage();
  else if (parts[0] === "services" && parts[1]) main.innerHTML = servicePage(parts[1]);
  else if (parts[0] === "services") main.innerHTML = servicesPage();
  else if (parts[0] === "clinics" && parts[1]) main.innerHTML = clinicPage(parts[1]);
  else if (parts[0] === "clinics") main.innerHTML = clinicsPage();
  else if (parts[0] === "team") main.innerHTML = teamPage();
  else if (parts[0] === "about") main.innerHTML = aboutPage();
  else if (parts[0] === "patients") main.innerHTML = patientsPage();
  else if (parts[0] === "journal" && parts[1]) main.innerHTML = articlePage(parts[1]);
  else if (parts[0] === "journal") main.innerHTML = journalPage();
  else if (parts[0] === "contact") main.innerHTML = contactPage();
  else if (parts[0] === "admin") main.innerHTML = adminPage();
  else if (["privacy", "terms", "cookies"].includes(parts[0])) main.innerHTML = legalPage(parts[0]);
  else main.innerHTML = notFound();
  updateHeadMeta(parts);
  document.body.classList.toggle("admin-view", parts[0] === "admin");
  setMenuExpanded(false);
  window.scrollTo(0, 0);
  const section = new URLSearchParams(query).get("section");
  if (section) document.getElementById(section)?.scrollIntoView();
  updateActiveNav(parts[0] || "home");
  if (parts[0] === "admin") {
    document.querySelectorAll(".admin-nav-link").forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", section ? href === `#/admin?section=${section}` : href === "#/admin");
    });
  }
  bindPageInteractions();
}

function pageTitle(parts) {
  if (!parts.length) return "Baobab Dental — Care that feels different";
  if (parts[0] === "services" && parts[1]) return `${services.find(service => service.slug === parts[1])?.name || "Treatment"} | Baobab Dental`;
  if (parts[0] === "clinics" && parts[1]) return `${branches.find(branch => branch.slug === parts[1])?.name || "Clinic"} | Baobab Dental`;
  if (parts[0] === "journal" && parts[1]) return `${articles.find(article => article.slug === parts[1])?.title || "Article"} | Baobab Dental`;
  const titles = { services: "Treatments", clinics: "Our clinics", team: "Our people", about: "Our story", patients: "Patient guide", journal: "The journal", contact: "Contact", privacy: "Privacy", terms: "Terms", cookies: "Cookies", admin: "Admin demo" };
  return `${titles[parts[0]] || "Baobab Dental"} | Baobab Dental`;
}

function pageDescription(parts) {
  const base = "Thoughtful, modern dental care for every generation in Perth, Australia. Explore Baobab Dental clinics, services and patient resources.";
  if (!parts.length) return base;
  if (parts[0] === "services" && parts[1]) { const item = services.find(s => s.slug === parts[1]); return item ? `${item.name} at Baobab Dental (demo). ${item.short}` : base; }
  if (parts[0] === "clinics" && parts[1]) { const branch = branches.find(b => b.slug === parts[1]); return branch ? `${branch.name} clinic details, hours and directions (illustrative demo). ${branch.neighborhood}.` : base; }
  if (parts[0] === "journal" && parts[1]) { const article = articles.find(a => a.slug === parts[1]); return article ? `${article.title} — general dental information from Baobab Dental (demo).` : base; }
  const map = { services: "Explore dental treatments and what to expect at Baobab Dental (demo).", clinics: "Find Baobab Dental clinic locations around Perth (illustrative demo).", team: "Meet the Baobab Dental team (illustrative demo profiles).", about: "Learn about the Baobab Dental approach and clinic concept (demo).", patients: "Patient guide, first visit information, payments and FAQs (demo).", journal: "Dental health articles and everyday guidance from Baobab Dental (demo).", contact: "Contact Baobab Dental clinics in Perth (illustrative demo details).", privacy: "Privacy information for the Baobab Dental demonstration website.", terms: "Terms and demo information for the Baobab Dental website concept.", cookies: "Cookie information for the Baobab Dental demonstration website.", admin: "Internal-style demo dashboard with synthetic data. Not for public indexing." };
  return map[parts[0]] || base;
}

function updateHeadMeta(parts) {
  const title = pageTitle(parts);
  const desc = pageDescription(parts);
  document.title = title;
  const setMeta = (selector, attr, value) => { const el = document.querySelector(selector); if (el) el.setAttribute(attr, value); };
  setMeta('meta[name="description"]','content',desc);
  setMeta('meta[property="og:title"]','content',title);
  setMeta('meta[property="og:description"]','content',desc);
  setMeta('meta[name="twitter:title"]','content',title);
  setMeta('meta[name="twitter:description"]','content',desc);
  setMeta('meta[name="robots"]','content', parts[0] === "admin" ? "noindex,nofollow,noarchive" : "index,follow,max-image-preview:large");
}

function updateActiveNav(page) {
  const active = page === "services" ? "Treatments" : page === "clinics" ? "Our clinics" : page === "team" ? "Our people" : page === "patients" ? "Patient guide" : page === "journal" ? "Journal" : "";
  document.querySelectorAll(".primary-nav a").forEach(link => {
    const isActive = link.textContent.trim() === active;
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function setMenuExpanded(expanded) {
  const toggle = document.querySelector(".menu-toggle");
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.querySelector(".sr-only").textContent = expanded ? "Close menu" : "Open menu";
  document.querySelector(".primary-nav").classList.toggle("nav-open", expanded);
}

function bindPageInteractions() {
  main.querySelectorAll("[data-book]").forEach(button => button.addEventListener("click", () => openBooking(button.dataset.service)));
  main.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    main.querySelectorAll("[data-filter]").forEach(pill => {
      const selected = pill === button;
      pill.classList.toggle("active", selected);
      pill.setAttribute("aria-pressed", String(selected));
    });
    const filter = button.dataset.filter;
    main.querySelectorAll("[data-service-category]").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.serviceCategory !== filter;
    });
  }));
  const adminSearch = document.querySelector("#admin-search");
  const adminBranchFilter = document.querySelector("#admin-branch-filter");
  const adminStatusFilter = document.querySelector("#admin-status-filter");
  if (adminSearch && adminBranchFilter && adminStatusFilter) {
    const updateAdminRows = () => {
      const search = adminSearch.value.trim().toLowerCase();
      const branch = adminBranchFilter.value;
      const status = adminStatusFilter.value;
      let visible = 0;
      main.querySelectorAll("[data-admin-row]").forEach(row => {
        const matches = row.dataset.id.includes(search)
          && (!branch || row.dataset.branch === branch)
          && (!status || row.dataset.status === status);
        row.hidden = !matches;
        if (matches) visible += 1;
      });
      document.querySelector("#admin-visible-count").textContent = String(visible);
      document.querySelector("#admin-empty").hidden = visible > 0;
    };
    adminSearch.addEventListener("input", updateAdminRows);
    adminBranchFilter.addEventListener("change", updateAdminRows);
    adminStatusFilter.addEventListener("change", updateAdminRows);
    main.querySelectorAll("[data-appointment-status]").forEach(select => select.addEventListener("change", () => {
      const appointment = demoAppointments.find(item => item.id === select.dataset.appointmentStatus);
      if (!appointment) {
        console.error("Could not find demo appointment:", select.dataset.appointmentStatus);
        return;
      }
      appointment.status = select.value;
      const row = select.closest("tr");
      row.dataset.status = appointment.status;
      select.className = `admin-status-select status-${appointment.status.toLowerCase()}`;
      document.querySelector("#admin-confirmed-count").textContent = String(demoAppointments.filter(item => item.status === "Confirmed").length);
      document.querySelector("#admin-awaiting-count").textContent = String(demoAppointments.filter(item => item.status === "Awaiting").length);
      updateAdminRows();
    }));
    document.querySelector("#admin-print").addEventListener("click", () => window.print());
  }
  const staffSearch = document.querySelector("#admin-staff-search");
  const staffBranchFilter = document.querySelector("#admin-staff-branch-filter");
  const staffStatusFilter = document.querySelector("#admin-staff-status-filter");
  const addStaffButton = document.querySelector("#admin-add-staff");
  if (staffSearch && staffBranchFilter && staffStatusFilter && addStaffButton) {
    const updateStaffRows = () => {
      const search = staffSearch.value.trim().toLowerCase();
      const branch = staffBranchFilter.value;
      const status = staffStatusFilter.value;
      const filtered = demoStaff.filter(member =>
        `${member.id} ${member.name} ${member.role}`.toLowerCase().includes(search)
        && (!branch || member.branch === branch)
        && (!status || member.status === status)
      );
      document.querySelector("#admin-staff-rows").innerHTML = staffRows(filtered);
      document.querySelector("#admin-staff-visible").textContent = String(filtered.length);
      document.querySelector("#admin-staff-empty").hidden = filtered.length > 0;
      document.querySelector("#admin-staff-total").textContent = String(demoStaff.length);
      document.querySelector("#admin-staff-on-shift").textContent = String(demoStaff.filter(member => member.status === "On shift").length);
      document.querySelector("#admin-staff-on-leave").textContent = String(demoStaff.filter(member => member.status === "On leave").length);
      document.querySelectorAll("[data-staff-clinic]").forEach(select => select.addEventListener("change", () => {
        const member = demoStaff.find(person => person.id === select.dataset.staffClinic);
        if (member) member.branch = select.value;
        updateStaffRows();
      }));
      document.querySelectorAll("[data-staff-status]").forEach(select => select.addEventListener("change", () => {
        const member = demoStaff.find(person => person.id === select.dataset.staffStatus);
        if (member) member.status = select.value;
        updateStaffRows();
      }));
    };
    staffSearch.addEventListener("input", updateStaffRows);
    staffBranchFilter.addEventListener("change", updateStaffRows);
    staffStatusFilter.addEventListener("change", updateStaffRows);
    addStaffButton.addEventListener("click", () => {
      const nextId = `STAFF-${String(demoStaff.length + 1).padStart(3, "0")}`;
      const nextName = additionalDemoStaffNames[demoStaff.length - 5] || `Demo teammate ${demoStaff.length + 1}`;
      demoStaff.push({ id: nextId, name: nextName, role: "Reception team", branch: branches[0].name, shift: "Not rostered", status: "Off shift" });
      updateStaffRows();
    });
    updateStaffRows();
  }
  const financePeriod = document.querySelector("#admin-finance-period");
  if (financePeriod) {
    const updateFinance = () => {
      if (!Object.prototype.hasOwnProperty.call(demoFinance, financePeriod.value)) {
        console.error("Unknown demo finance period:", financePeriod.value);
        return;
      }
      const snapshot = demoFinance[financePeriod.value];
      document.querySelector('[data-finance-field="collected"]').textContent = formatAdminCurrency(snapshot.collected);
      document.querySelector('[data-finance-field="outstanding"]').textContent = formatAdminCurrency(snapshot.outstanding);
      document.querySelector('[data-finance-field="expenses"]').textContent = formatAdminCurrency(snapshot.expenses);
      document.querySelector('[data-finance-field="surplus"]').textContent = formatAdminCurrency(snapshot.collected - snapshot.expenses);
      document.querySelector("#admin-finance-chart").innerHTML = financeChart(snapshot.series);
      document.querySelector("#admin-finance-payments").innerHTML = financeBreakdown(snapshot.payments, "payment-swatch");
      document.querySelector("#admin-finance-costs").innerHTML = financeBreakdown(snapshot.costs, "cost-swatch");
    };
    financePeriod.addEventListener("change", updateFinance);
    document.querySelector("#admin-finance-print").addEventListener("click", () => window.print());
  }
  const ledgerSearch = document.querySelector("#admin-ledger-search");
  const ledgerStatusFilter = document.querySelector("#admin-ledger-status-filter");
  if (ledgerSearch && ledgerStatusFilter) {
    const updateLedgerRows = () => {
      const search = ledgerSearch.value.trim().toLowerCase();
      const status = ledgerStatusFilter.value;
      const filtered = demoLedger.filter(entry =>
        `${entry.id} ${entry.description} ${entry.branch}`.toLowerCase().includes(search)
        && (!status || entry.status === status)
      );
      document.querySelector("#admin-ledger-rows").innerHTML = ledgerRows(filtered);
      document.querySelector("#admin-ledger-visible").textContent = String(filtered.length);
      document.querySelector("#admin-ledger-empty").hidden = filtered.length > 0;
      document.querySelectorAll("[data-ledger-status]").forEach(select => select.addEventListener("change", () => {
        const entry = demoLedger.find(item => item.id === select.dataset.ledgerStatus);
        if (!entry) {
          console.error("Could not find demo ledger entry:", select.dataset.ledgerStatus);
          return;
        }
        entry.status = select.value;
        updateLedgerRows();
      }));
    };
    ledgerSearch.addEventListener("input", updateLedgerRows);
    ledgerStatusFilter.addEventListener("change", updateLedgerRows);
    updateLedgerRows();
  }
}

function openBooking(serviceSlug = "") {
  bookingForm.hidden = false;
  bookingResult.hidden = true;
  bookingResult.innerHTML = "";
  document.querySelector("#booking-service").value = serviceSlug || "";
  if (typeof bookingDialog.showModal === "function") bookingDialog.showModal();
  else bookingDialog.setAttribute("open", "");
}

function setupBooking() {
  const branchSelect = document.querySelector("#booking-branch");
  const serviceSelect = document.querySelector("#booking-service");
  branchSelect.innerHTML = `<option value="" disabled selected>Select a clinic</option>${branches.map(branch => `<option value="${branch.slug}">${branch.name}</option>`).join("")}`;
  serviceSelect.innerHTML = `<option value="" disabled selected>Choose a treatment</option>${services.map(service => `<option value="${service.slug}">${service.name}</option>`).join("")}`;
  const perthDateParts = new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Perth", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const localToday = `${perthDateParts.find(part => part.type === "year").value}-${perthDateParts.find(part => part.type === "month").value}-${perthDateParts.find(part => part.type === "day").value}`;
  document.querySelector("#booking-date").min = localToday;
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(bookingForm);
    const branch = branches.find(item => item.slug === data.get("branch"));
    const service = services.find(item => item.slug === data.get("service"));
    const date = data.get("date");
    if (!branch || !service || !date) return;
    const prettyDate = new Date(`${date}T12:00:00+08:00`).toLocaleDateString("en-AU", { timeZone: "Australia/Perth", weekday: "long", day: "numeric", month: "long", year: "numeric" });
    bookingResult.innerHTML = `<div class="confirmation-icon">✓</div><span class="eyebrow">Preview only · Nothing has been booked</span><h3 tabindex="-1">Your next step, in ${branch.name}.</h3><p>You've explored a ${service.name.toLowerCase()} visit for ${prettyDate.toLowerCase()} (${data.get("time").toLowerCase()}). No appointment request was sent or saved.</p><button class="button button-dark" type="button" id="booking-reset">Explore another option</button>`;
    bookingForm.hidden = true;
    bookingResult.hidden = false;
    bookingResult.querySelector("h3").focus();
    document.querySelector("#booking-reset").addEventListener("click", () => openBooking());
  });
}

document.querySelector(".menu-toggle").addEventListener("click", event => {
  const toggle = event.currentTarget;
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  setMenuExpanded(!expanded);
});

document.querySelectorAll("[data-book]").forEach(button => button.addEventListener("click", () => openBooking()));
document.querySelector(".dialog-close").addEventListener("click", () => bookingDialog.close());
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && bookingDialog.open) {
    event.preventDefault();
    bookingDialog.close();
  }
});
bookingDialog.addEventListener("click", event => {
  const rect = bookingDialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) bookingDialog.close();
});
document.querySelector(".ribbon-close").addEventListener("click", () => document.querySelector(".demo-ribbon").hidden = true);
document.querySelector("#cookie-dismiss").addEventListener("click", () => document.querySelector("#cookie-note").hidden = true);
document.querySelector("#current-year").textContent = String(new Date().getFullYear());

setupBooking();
window.addEventListener("hashchange", render);
render();
