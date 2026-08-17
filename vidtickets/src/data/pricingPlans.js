export const pricingPlans = [
  {
    id: 'standard',
    name: 'VidTickets',
    monthlyPrice: 9.99,
    popular: false,
    features: [
      'Up to 10 hours worth of VidTickets each month',
      '1:1 conversational practice for every student',
      'Up to two classes',
    ],
  },
  {
    id: 'ai-grading',
    name: 'VidTickets + AI Grading',
    monthlyPrice: 14.99,
    popular: true,
    features: [
      'Up to 15 hours worth of VidTickets each month',
      'Personalized feedback + grading based on your rubrics',
      'Prioritized customer support',
      'Unlimited classes',
      'AI transcripts + summaries',
    ],
  },
];

export const YEARLY_DISCOUNT = 0.3;
