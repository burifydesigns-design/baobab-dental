(() => {
  const root = document.querySelector("#main");
  if (!root) return;
  let initializedFor = null;
  let currentAppointments = [];
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const isAdminRoute = () => location.hash.replace(/^#\/?/, "").split("?")[0].split("/")[0] === "admin";
  const api = async (url, options = {}) => {
    const response = await fetch(url, { credentials: "same-origin", headers: { "Content-Type": "application/json", ...(options.headers || {}) }, ...options });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || ("Request failed (" + response.status + ")."));
    return body;
  };
  function mountGate() {
    let gate = document.querySelector("#admin-auth-gate");
    if (gate) return gate;
    gate = document.createElement("section");
    gate.id = "admin-auth-gate";
    gate.className = "admin-auth-gate";
    gate.innerHTML = '<div class="admin-auth-card"><span class="admin-auth-kicker">BAOBAB DENTAL · PRIVATE WORKSPACE</span><h1>Admin sign in</h1><p>Sign in to view appointment requests submitted through this demonstration website.</p><form id="admin-login-form"><label for="admin-login-email">Email address</label><input id="admin-login-email" name="email" type="email" autocomplete="username" maxlength="254" required /><label for="admin-login-password">Password</label><input id="admin-login-password" name="password" type="password" autocomplete="current-password" required /><p class="admin-auth-error" id="admin-auth-error" role="alert" hidden></p><button class="button button-dark" type="submit" id="admin-login-submit">Sign in securely</button></form><p class="admin-auth-footnote">This demo workspace is not a real clinic system. Do not enter clinical notes or sensitive health information.</p></div>';
    root.prepend(gate);
    return gate;
  }
  function setDashboardVisible(visible) {
    const gate = document.querySelector("#admin-auth-gate");
    const topbar = root.querySelector(".admin-topbar");
    const shell = root.querySelector(".admin-shell");
    if (gate) gate.hidden = visible;
    if (topbar) topbar.hidden = !visible;
    if (shell) shell.hidden = !visible;
  }
  function addLogoutControl(email) {
    const actions = root.querySelector(".admin-top-actions");
    if (!actions || actions.querySelector("#admin-logout")) return;
    const badge = actions.querySelector(".admin-demo-badge");
    if (badge) badge.textContent = "Signed in · " + email;
    const button = document.createElement("button");
    button.type = "button";
    button.id = "admin-logout";
    button.className = "admin-logout";
    button.textContent = "Sign out";
    actions.prepend(button);
    button.addEventListener("click", async () => {
      button.disabled = true;
      try { await api("/api/admin/logout", { method: "POST", body: "{}" }); }
      catch (error) { console.error("Admin sign-out failed:", error.message); }
      location.hash = "#/";
    });
  }
  function formatDate(value) {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Perth" }).format(date) : "—";
  }
  function renderAppointments(rows) {
    currentAppointments = Array.isArray(rows) ? rows : [];
    const tbody = root.querySelector(".admin-table tbody");
    if (!tbody) return;
    const statuses = ["new", "contacted", "confirmed", "declined", "completed"];
    tbody.innerHTML = currentAppointments.map(item => {
      const id = escapeHtml(item._id);
      const status = statuses.includes(item.status) ? item.status : "new";
      const phone = item.phone ? '<br><a href="tel:' + escapeHtml(item.phone) + '">' + escapeHtml(item.phone) + '</a>' : "";
      const options = statuses.map(value => '<option value="' + value + '"' + (status === value ? " selected" : "") + ">" + value[0].toUpperCase() + value.slice(1) + "</option>").join("");
      return '<tr data-live-appointment data-id="' + id.toLowerCase() + '" data-branch="' + escapeHtml(item.branch) + '" data-status="' + status + '"><td class="admin-time">' + escapeHtml(formatDate(item.createdAt)) + '</td><td><span class="admin-appointment-id">' + id.slice(-8).toUpperCase() + '</span><span class="admin-row-subtitle">' + escapeHtml(item.name) + '</span><span class="admin-row-subtitle">' + escapeHtml(item.email) + phone + '</span></td><td>' + escapeHtml(item.service) + '</td><td>' + escapeHtml(item.branch) + '<span class="admin-row-subtitle">' + escapeHtml(item.preferredDate) + ' · ' + escapeHtml(item.preferredTime) + '</span></td><td><select class="admin-status-select status-' + status + '" data-live-status="' + id + '" aria-label="Update request status for ' + escapeHtml(item.name) + '">' + options + '</select></td></tr>';
    }).join("");
    const panel = root.querySelector("#admin-appointments");
    const search = root.querySelector("#admin-search");
    const branchFilter = root.querySelector("#admin-branch-filter");
    const statusFilter = root.querySelector("#admin-status-filter");
    if (search) { search.placeholder = "Search name, email or request ID"; search.setAttribute("aria-label", "Search appointment requests"); }
    if (statusFilter) statusFilter.innerHTML = '<option value="">All statuses</option>' + statuses.map(status => '<option value="' + status + '">' + status[0].toUpperCase() + status.slice(1) + "</option>").join("");
    if (branchFilter) {
      const branchNames = [...new Set(currentAppointments.map(item => item.branch).filter(Boolean))];
      branchFilter.innerHTML = '<option value="">All clinics</option>' + branchNames.map(branch => '<option value="' + escapeHtml(branch) + '">' + escapeHtml(branch) + "</option>").join("");
    }
    const applyFilters = () => {
      const term = (search?.value || "").trim().toLowerCase();
      const branch = branchFilter?.value || "";
      const status = statusFilter?.value || "";
      let visible = 0;
      tbody.querySelectorAll("[data-live-appointment]").forEach(row => {
        const item = currentAppointments.find(entry => entry._id.toLowerCase() === row.dataset.id);
        const haystack = item ? (item.name + " " + item.email + " " + (item.phone || "") + " " + item.service + " " + item.branch + " " + item._id).toLowerCase() : "";
        const match = haystack.includes(term) && (!branch || row.dataset.branch === branch) && (!status || row.dataset.status === status);
        row.hidden = !match;
        if (match) visible += 1;
      });
      const count = root.querySelector("#admin-visible-count");
      const empty = root.querySelector("#admin-empty");
      if (count) count.textContent = String(visible);
      if (empty) { empty.textContent = currentAppointments.length ? "No appointment requests match these filters." : "No appointment requests have been submitted yet."; empty.hidden = visible > 0; }
    };
    search?.addEventListener("input", applyFilters);
    branchFilter?.addEventListener("change", applyFilters);
    statusFilter?.addEventListener("change", applyFilters);
    applyFilters();
    const footer = panel?.querySelector(".admin-table-footer");
    if (footer) footer.innerHTML = '<span>Showing <strong id="admin-visible-count">' + currentAppointments.length + '</strong> appointment requests</span><span>Live MongoDB records · latest 100</span>';
    const navCount = root.querySelector('.admin-nav-link[href="#/admin?section=admin-appointments"] b');
    if (navCount) navCount.textContent = String(currentAppointments.length);
    const confirmed = currentAppointments.filter(item => item.status === "confirmed").length;
    const awaiting = currentAppointments.filter(item => item.status === "new" || item.status === "contacted").length;
    const metric = root.querySelectorAll(".admin-metric-card strong");
    if (metric[0]) metric[0].textContent = String(currentAppointments.length);
    const confirmedNode = root.querySelector("#admin-confirmed-count");
    const awaitingNode = root.querySelector("#admin-awaiting-count");
    if (confirmedNode) confirmedNode.textContent = String(confirmed);
    if (awaitingNode) awaitingNode.textContent = String(awaiting);
    const banner = root.querySelector(".admin-sample-banner");
    if (banner) banner.innerHTML = '<span>✳</span><p><strong>Live appointment requests</strong> · The appointment table below is connected to MongoDB. Staff, clinic, finance and content sections still contain illustrative demo data.</p><span class="admin-sample-tag">MIXED DATA</span>';
    const heading = panel?.querySelector("thead");
    if (heading) heading.innerHTML = "<tr><th>RECEIVED</th><th>REQUEST / PATIENT</th><th>SERVICE</th><th>CLINIC / PREFERENCE</th><th>STATUS</th></tr>";
    const kicker = panel?.querySelector(".admin-panel-kicker");
    if (kicker) kicker.textContent = "Latest submissions · Perth time";
    const note = root.querySelector(".admin-demo-note p");
    if (note) note.textContent = "Appointment requests are stored in MongoDB. Staff and finance panels remain illustrative sample data.";
  }
  async function loadAppointments() {
    const body = await api("/api/admin/appointments", { method: "GET" });
    renderAppointments(body.appointments || []);
  }
  async function activateDashboard(email) {
    setDashboardVisible(true);
    addLogoutControl(email);
    try { await loadAppointments(); }
    catch (error) {
      const banner = root.querySelector(".admin-sample-banner");
      if (banner) banner.innerHTML = '<span>!</span><p><strong>Appointment data unavailable</strong> · ' + escapeHtml(error.message) + ' The sample dashboard is not a substitute for live records.</p><span class="admin-sample-tag">OFFLINE</span>';
    }
    const tbody = root.querySelector(".admin-table tbody");
    if (tbody && !tbody.dataset.liveBound) {
      tbody.dataset.liveBound = "true";
      tbody.addEventListener("change", async event => {
        const select = event.target.closest("[data-live-status]");
        if (!select) return;
        const id = select.dataset.liveStatus;
        const previous = currentAppointments.find(item => item._id === id)?.status || "new";
        select.disabled = true;
        try {
          await api("/api/admin/appointments", { method: "PATCH", body: JSON.stringify({ id, status: select.value }) });
          const item = currentAppointments.find(entry => entry._id === id);
          if (item) item.status = select.value;
          const row = select.closest("tr");
          row.dataset.status = select.value;
          select.className = "admin-status-select status-" + select.value;
          const confirmed = currentAppointments.filter(item => item.status === "confirmed").length;
          const awaiting = currentAppointments.filter(item => item.status === "new" || item.status === "contacted").length;
          const confirmedNode = root.querySelector("#admin-confirmed-count");
          const awaitingNode = root.querySelector("#admin-awaiting-count");
          if (confirmedNode) confirmedNode.textContent = String(confirmed);
          if (awaitingNode) awaitingNode.textContent = String(awaiting);
        } catch (error) {
          select.value = previous;
          window.alert(error.message || "The status could not be saved.");
        } finally { select.disabled = false; }
      });
    }
  }
  async function initializeAdmin() {
    if (!isAdminRoute() || initializedFor === location.hash) return;
    initializedFor = location.hash;
    const gate = mountGate();
    setDashboardVisible(false);
    const form = gate.querySelector("#admin-login-form");
    const errorNode = gate.querySelector("#admin-auth-error");
    const showError = message => { errorNode.textContent = message; errorNode.hidden = false; };
    if (!form.dataset.bound) {
      form.dataset.bound = "true";
      form.addEventListener("submit", async event => {
        event.preventDefault();
        const button = form.querySelector("button[type=submit]");
        const data = new FormData(form);
        button.disabled = true;
        button.textContent = "Signing in…";
        errorNode.hidden = true;
        try {
          const result = await api("/api/admin/login", { method: "POST", body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) });
          await activateDashboard(result.email);
        } catch (error) { showError(error.message || "Sign-in failed. Please try again."); }
        finally { button.disabled = false; button.textContent = "Sign in securely"; form.querySelector('[name="password"]').value = ""; }
      });
    }
    try {
      const session = await api("/api/admin/session", { method: "GET" });
      if (session.authenticated) await activateDashboard(session.email);
    } catch { setDashboardVisible(false); }
  }
  if (isAdminRoute()) initializeAdmin();
  window.addEventListener("hashchange", () => {
    initializedFor = null;
    if (isAdminRoute()) initializeAdmin();
  });
})();