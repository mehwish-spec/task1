# VidTickets — React (v2)

A component-based React rebuild of the `vidtickets_2.html` landing page,
plus the FAQ, trust-badges, and site-footer sections added on top by request.
Built with [Vite](https://vitejs.dev/) and [React Router](https://reactrouter.com/).

Every section and element from the original `vidtickets_2.html` is preserved
as-is — including its original blue "Turn learning into dialogue." CTA
footer — with the FAQ accordion, trust badges, and a second linked footer
appended after it, rather than replacing anything.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run lint        # lint with oxlint
```

## Project structure

```
src/
  components/
    common/         BackButton (shared "← Back" control, added)
    app/            AppSidebar (shared sidebar for the /app/* pages, added)
    layout/         Navbar, Footer (original CTA), SiteFooter (logo + nav
                     links, added), PageLayout, SimpleHeader
    hero/            Hero section (nav, headline, wave, media placeholder)
    features/        "The loop your class loved" 4-up feature cards
    blueFeature/      "The engagement, without the grading backlog" panel
    pricing/          Pricing section with a live Monthly/Yearly toggle
    studentCards/    Floating photo-frame row + wave transition
    faq/               Accordion FAQ (added)
    trustBadges/     COPPA / GDPR / SOC2 compliance badges (added)
  context/            UserContext (shared teacher identity + subscription
                       status, added), TicketsContext (in-memory list of
                       created Vid Tickets, added)
  data/               Plain-data modules that feed each component
  pages/               Home, LoginSplit, SignupSplit, SignupTeacher,
                       Onboarding, Dashboard, VidTicketNew, VidTicketRecord,
                       VidTicketAssess, UpgradePlans, Login, Signup,
                       DataPrivacy, Contact, NotFound
  App.jsx              Route table (code-split with React.lazy/Suspense)
  main.jsx             Entry point — mounts <App/> inside <BrowserRouter/>,
                       wrapped in <UserProvider/>
  index.css            Global reset + shared `.page` wrapper
```

## Page order (top to bottom)

Hero → Features → BlueFeature → Pricing → StudentCards → **Faq** (added) →
Footer *(original CTA, unchanged)* → **TrustBadges** (added) →
**SiteFooter** (added, links to `/data-privacy`, `/contact`, `/login`,
`/signup`, and `#pricing`).

## Design notes

- Same component-per-section, data-driven, CSS-Modules-scoped approach used
  throughout: every section owns its own folder, styles, and (where
  applicable) data file.
- The nav's "Log in" link, and every SiteFooter link, route to real pages via
  `react-router-dom` (client-side, code-split with `React.lazy`/`Suspense`)
  instead of the static mockup's `#` placeholders.
- The pricing Monthly/Yearly toggle is wired to `useState` and actually
  recalculates the price.
- Body copy intentionally keeps the source's "VidTalk brings it back" line
  verbatim to match `vidtickets_2.html` exactly.
- `/login` and `/signup` render new split-screen pages (`LoginSplit.jsx`,
  `SignupSplit.jsx`) matching the provided reference designs. They were
  added as standalone components; the only change to any pre-existing file
  was swapping the two lazy-loaded route components in `App.jsx`. The
  original simple-form `Login.jsx`/`Signup.jsx` pages remain on disk,
  untouched, just no longer routed to. `SignupSplit` lets the visitor pick
  "I'm a teacher" / "I'm a student" (illustrated with simple original SVG
  icons, not photos) before continuing, and links back to `/login`; `LoginSplit`
  links forward to `/signup`.
- `/signup/teacher` is a new "Almost done…" onboarding step
  (`SignupTeacher.jsx`), also matching a provided reference design: teacher
  display name, school/org name, class name, a referral-source dropdown, and
  a required age/Terms-of-Use consent checkbox that gates the "Let's start!"
  button. `SignupSplit`'s role cards ("I'm a teacher" / "I'm a student") only
  select a role now — clicking either just toggles which one is highlighted,
  same as the student card already did. Reaching this page requires actually
  typing an email in the form below (the `required` input enforces that) and
  pressing Continue; picking "teacher" (the default role) and submitting
  routes here (the only change to that pre-existing file). The student role
  still shows a demo alert on submit, since there's no student flow/reference
  design yet.
- `/onboarding` (`Onboarding.jsx`) is a multi-step "How VidTickets Work" flow
  shown right after a teacher finishes signing up — submitting the
  `/signup/teacher` form routes here instead of just showing a demo alert
  (the only change to that pre-existing file). All 5 steps from the
  reference designs are built: (1) "You missed Flipgrid. We heard you.", (2)
  "Record a question. Define the rules." — a settings-panel mockup with an
  overlapping recording frame, (3) "See how they answer. Approve replies
  (optional)" — an expanded visibility dropdown over a reply-video card, (4)
  "Watch the fun discussions unfold!" — the same video-grid illustration as
  step 1, standalone, and (5) "Share VidTickets with your friends" — an
  email-invite compose mockup, whose footer swaps the usual "Continue" pill
  for a "Skip" link and a solid "Send Invites →" button (both finish the
  flow and land on `/app`, the new Dashboard — see below). Every step's copy
  lives in `src/data/onboardingSteps.js`; each step's illustration is
  registered in a small id-keyed lookup in `Onboarding.jsx`. All illustrated
  "photos" (the recording-frame preview, the reply-video thumbnail) are
  gradient placeholders, not real images, consistent with the rest of the
  project. Step 5's "To" field is a real, controlled input (everything else
  on that step stays a decorative mockup): if it's filled in when "Send
  Invites" is clicked, the button turns green, its label swaps to "Sent ✓",
  and after a beat it navigates to `/app`; if it's left empty, clicking
  either "Send Invites" or "Skip" goes straight to `/app`.
- `/app` (`Dashboard.jsx`) is the app's post-onboarding home screen, matching
  a provided reference design: a sidebar (logo, class selector, "Vid
  Tickets" nav, a "Go Pro-fessor" upgrade card, Class List/Referrals, and a
  profile row) plus the same video-grid illustration used throughout the
  site, a headline, "Watch a Tutorial", and "+ New Vid Ticket". `/app/new-ticket`
  (`VidTicketNew.jsx`) is the ticket-creation page from a second provided
  design, reached from that "+ New Vid Ticket" button: a question prompt
  with a live character counter, a feedback-mode picker ("Yes - Graded" /
  "No - Participation only"), a live reply-length stepper capped at 5
  minutes, and four live toggles (allow video replies, transcript view, AI
  summaries, hide until approved). Its "Record your question →" button now
  routes to `/app/new-ticket/record` (`VidTicketRecord.jsx`, from a third
  provided design) instead of just showing a demo alert — a fully
  interactive 3-stage recorder: idle ("Record your question. Students will
  watch this before replying.", with clickable mic/speaker/camera
  dropdowns and a flip-camera button that mirrors the preview), recording
  (the same record button now stops it, with a pulsing "REC" badge), and
  done ("Great vid ticket request!", with a clickable play button, a
  "Re-record" button that returns to idle, and a "Continue →" that's only
  enabled once a recording exists). All three pages share one sidebar
  component, `src/components/app/AppSidebar.jsx` (a `variant` prop covers
  the differences between the reference designs: a collapse icon vs. the
  profile avatar, the expanded ticket list, and the upgrade card only
  showing on the Dashboard). The camera "preview" throughout is a gradient
  placeholder, never a real photo. The only changes to pre-existing files
  for all of this were `Onboarding.jsx`'s Skip/Send Invites handlers
  navigating to `/app` instead of `/`, `VidTicketNew.jsx`'s Record button
  now navigating instead of alerting, and the three new lazy routes in
  `App.jsx`.
- `VidTicketRecord`'s camera "preview" is a real live feed, not just a
  gradient block — it uses [`react-webcam`](https://www.npmjs.com/package/react-webcam)
  (new dependency) to request the browser's actual camera via `getUserMedia`
  during the idle and recording stages, respecting the existing flip/mirror
  button. If the browser has no camera or the person denies permission, it
  falls back to the original gradient placeholder automatically (with a
  small "Camera unavailable" badge) instead of breaking the page, and the
  record button disables itself since there's nothing to record.
  `VidTicketRecord.jsx`'s "Continue →" button routes to
  `/app/new-ticket/assess` instead of straight back to `/app` (the only
  change to that pre-existing file for this part of the feature).
- Recording is genuine now, not just a UI stage toggle — `MediaRecorder`
  captures the live camera/mic stream, and the reply-length limit picked on
  the previous step (`VidTicketNew`'s stepper) is carried over as route
  state so the recording page knows its own time limit (falling back to 90
  seconds if reached directly, e.g. a refresh). While recording, the stage
  label and the "REC" badge both count down live ("Recording... 0:42 left"),
  and recording stops itself automatically the moment the limit is hit —
  same code path as clicking the record button again to stop early. The
  finished recording is saved right there on the page as a local blob URL
  (no backend — it's released again on re-record or when leaving the page)
  and is genuinely playable: the "done" stage swaps the gradient placeholder
  for a real `<video>` of what was just recorded, and the existing play
  button actually plays/pauses it instead of showing a demo alert.
- `/app/new-ticket/assess` (`VidTicketAssess.jsx`, new page) is the third and
  final step of the "create a Vid Ticket" wizard, matching a provided
  reference design: a progress bar with all three segments filled, and two
  mutually exclusive grading modes styled as clickable cards. "Areas to
  assess" (selected by default, with "Critical Thinking" pre-checked) expands
  to show a 2-column grid of six clickable criteria checkboxes (Critical
  Thinking, Communication Skills, Subject Knowledge, Creativity &
  Innovation, Research Skills, Problem Solving) plus a real, controlled "What
  does success look like?" textarea. "Teacher-Generated" is the collapsed
  alternative below it; clicking either card's header switches which mode is
  selected/expanded, and each keeps its own state so switching back and
  forth doesn't lose anything you typed or checked. A solid "Finish" button
  in the corner (the wizard's terminal action, replacing "Continue →" since
  this is the last step) shows a demo confirmation and returns to `/app`. It
  reuses `AppSidebar` with `variant="ticket"`, same as the other two wizard
  steps.
- `VidTicketAssess.jsx`'s "Finish" button no longer just shows a demo alert
  and returns to `/app` — it now adds a real entry to a new shared
  `TicketsContext` (`src/context/TicketsContext.jsx`, in-memory, no
  backend) and the Dashboard reads from it. As soon as at least one Vid
  Ticket exists, `/app` swaps its empty-state illustration for a real,
  titled list of ticket cards (`src/components/app/VidTicketCard.jsx`, new
  component) — each with a 🗑️ delete button that removes it (falling back to
  the original empty state once the list is empty again) and a share-link
  row. Deleting is instant and local to this session, same as everything
  else in this demo.
- Two hardcoded demo accounts on `/login` (any password) show what a paid
  vs. free Dashboard actually looks like: `subscribed@gmail.com` logs in as
  a subscribed teacher, `unsubscribed@gmail.com` (and every other email,
  matching the prior default) logs in as free/trial. `UserContext`'s user
  object gained a `subscribed` boolean for this. It currently drives two
  concrete differences — the sidebar's "Go Pro-fessor" upsell card only
  shows for unsubscribed users (already existed, just now conditional), and
  each Vid Ticket card's share link is fully working ("📋 Copy" that copies
  to the clipboard) for subscribed users but shown locked behind a "🔒
  Please upgrade" prompt for unsubscribed ones, with two small decorative
  avatar bubbles (gradient placeholders, not real photos, as always) — the
  rest of the app (login/signup/onboarding, the ticket-creation wizard) is
  identical for both account types, matching the reference design's intent
  that not every page needs to differ.
- `/app/upgrade` (`UpgradePlans.jsx`, new page) is the "Choose your plan"
  pricing screen from two more provided reference designs (a Yearly and a
  Monthly state of the same page). A segmented Yearly/Monthly toggle
  actually swaps both cards' prices and feature lists live — the two plans
  ("Vid Tickets" and "Vid Tickets + AI Grading", the latter badged "Best
  Value" yearly / "Recommended" monthly) each get cheaper on yearly billing
  and list more included hours the more you pay, matching the reference
  numbers exactly. It's reached from two places: the sidebar's "Go
  Pro-fessor" upsell card's "Upgrade" button (previously decorative, now
  wired) and a Vid Ticket card's locked "🔒 Please upgrade" prompt (which
  previously just showed a demo alert). Either plan's "Start a 7 Day Free
  Trial" button marks the demo account as subscribed — the same
  `UserContext.subscribed` flag the two hardcoded demo accounts set at
  login — and returns to the Dashboard, which immediately reflects the
  unlocked, subscribed experience (no more upsell card, no more locked
  share links). `AppSidebar` gained a third `variant="upgrade"` for this
  page's sidebar (collapse icon and ticket sub-list like the wizard pages,
  but keeps the upsell card like the Dashboard, matching its reference). The
  sidebar's "VidTickets" logo is also now a real button on every page/variant
  that returns to `/app` — a small, broadly-useful bit of navigation that
  isn't a new visual element, so it doesn't conflict with any reference
  design.
- The Login page's "Sign in with Google" button now goes straight to the
  Dashboard, same as the email/password form next to it — previously it just
  showed a demo alert with no navigation. It sets the default demo identity
  (`DEFAULT_USER` from `UserContext`) since there's no real Google account to
  read a name from.
- Fixed the Onboarding step 2 ("Record a question. Define the rules.")
  layout bug for real this time — it turned out to have two separate causes,
  and an earlier pass only fixed the first. (1) At narrow/mobile widths, its
  settings-panel + recording-frame mockup switches from an intentional
  absolute-position overlap (desktop) to stacked normal-flow content below
  ~860px; the CSS rules that made that switch work were incomplete (fixed:
  the outer visual box now grows with its stacked content instead of
  clipping/overflowing it, and the recording frame kept its own positioning
  context so its children stay correctly sized instead of ballooning to
  cover the settings panel behind them). (2) Separately, and more subtly: at
  desktop widths *between* the mobile breakpoint and where the two-column
  layout has full room to breathe, the text column can wrap onto extra
  lines, and `.content`'s vertical centering was pushing the whole
  illustration (recording frame included) further down the row than its
  nominal size accounted for — far enough, at some widths, to reach the
  Continue button below. And because the recording frame's `position`
  belongs to the same CSS stacking context as the Continue button (neither
  `.content` nor `.visual` establishes its own), *any* positioned element
  paints above *all* normal, non-positioned content in that context
  regardless of DOM order — so whenever the boxes did overlap, the frame
  visually buried the button instead of the later-in-markup button winning.
  Fixed both: the illustration no longer shifts with the text column's
  height, and the Continue button's container now has an explicit stacking
  position that guarantees it always paints on top, so this can't recur at
  some other width or zoom level. Verified with a sweep across the entire
  320px–1440px range in 10px steps — no overlap anywhere, at any width.
  Desktop's intentional overlapping design (frame over the settings panel
  itself) is untouched.
- Onboarding step 5's email-invite compose mockup ("Share VidTickets with
  your friends") is now fully editable — From, To, Subject, and the message
  body (labeled "Subject" twice in the reference design, but tracked as two
  separate values) are all real, controlled inputs now, not just "To" as
  before. Each starts pre-filled with the reference design's original copy.
- The sidebar's profile identity ("John Stephens PRO-fessor") is no longer
  hardcoded — it comes from `src/context/UserContext.jsx`, a small React
  context (new file) providing a default identity until someone actually
  logs in or signs up. Submitting the `/signup/teacher` form now also sets
  the user's name from what they typed under "What name do your students
  call you?"; submitting `/login` sets a name derived from the email
  address (e.g. `jane.doe@school.edu` → "Jane Doe") since the login form
  has no name field. Both are demo-only, like the rest of the auth in this
  project — there's no real backend behind them.
- Every page in the login/signup/onboarding flow now has a "← Back" control
  (`src/components/common/BackButton.jsx`, a small shared component so the
  behavior stays consistent — new file, not a change to an existing one),
  wired to mirror how each page was actually reached: `/login` and `/signup`
  back to `/`; `/signup/teacher` back to `/signup`; `/onboarding`'s first
  step back to `/signup/teacher`; and every later onboarding step (including
  the last, step 5) back to the previous step in place, without changing the
  URL. Each page only needed a one-line import and a `<BackButton />` call
  to wire this in.
