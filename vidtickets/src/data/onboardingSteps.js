// Content for the multi-step "How VidTickets Work" onboarding flow shown
// right after a teacher finishes signing up. TOTAL_ONBOARDING_STEPS reflects
// the full flow length shown in the "x of N" progress label; `steps` holds
// the content for whichever steps have been built so far — append the next
// step's data here (and register its visual in Onboarding.jsx) as new
// reference designs come in, no other file needs to change.
export const TOTAL_ONBOARDING_STEPS = 5;

export const onboardingSteps = [
  {
    id: 'missed-flipgrid',
    category: 'How VidTickets Work',
    headlineLines: ['You missed Flipgrid.', 'We heard you.'],
    // Only this step's headline uses the two-tone treatment: a colored
    // trailing period on the first line, and the whole second line colored.
    accentLineIndex: 1,
    highlightTrailingPeriod: true,
    body: 'Turn any topic into a video discussion to make learning engaging, fun, & empowering.',
  },
  {
    id: 'record-question',
    category: 'How VidTickets Work',
    headlineLines: ['Record a question.', 'Define the rules.'],
    accentLineIndex: null,
    body: "You can even have AI provide personalized grading + feedback. Just share the link with students, and they'll be added to your class list when they sign up.",
  },
  {
    id: 'approve-replies',
    category: 'How VidTickets Work',
    headlineLines: ['See how they answer.', 'Approve replies (optional)'],
    accentLineIndex: null,
    body: "You can watch and approve replies before they're visible to others.",
  },
  {
    id: 'watch-discussions',
    category: 'How VidTickets Work',
    headlineLines: ['Watch the fun', 'discussions unfold!'],
    accentLineIndex: null,
    body: 'You and students can reply to videos. Enjoy stimulating discussions and debates.',
  },
  {
    id: 'share-invites',
    category: 'How VidTickets Work',
    headlineLines: ['Share VidTickets', 'with your friends'],
    accentLineIndex: null,
    body: 'Invite 5+ educator friends to use Vid Tickets and get instant access to Premium for 30 days!',
    bodyBoldPhrase: 'instant access to Premium for 30 days!',
    // The last step swaps the single "Continue" button for a "Skip" link
    // plus a solid "Send Invites →" action.
    isFinalStep: true,
  },
];
