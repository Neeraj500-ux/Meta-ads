export const LEAD_SCORING_CONFIG = {
  answers: {
    budget: {
      "Below ₹15,000": 0,
      "₹15,000–₹30,000": 1,
      "₹30,000–₹50,000": 2,
      "Above ₹50,000": 3,
      "I need help deciding": 1,
    },
    start: {
      "Within the next 2 weeks": 3,
      "Within 30 days": 2,
      "Within 1–3 months": 1,
      "Just exploring for now": 0,
    },
    role: {
      "Owner / Founder": 3,
      "Director / Institute Head": 3,
      "Marketing / Admissions Team": 1,
      Other: 0,
    },
    challenge: {
      "Not getting enough enquiries": 2,
      "Getting enquiries from the wrong locations": 1,
      "Enquiries are not relevant to our courses": 2,
      "Students enquire but don’t take admission": 3,
      "Planning our first paid campaign": 1,
    },
  },
  valueByScore: {
    1: 100,
    2: 300,
    3: 600,
    4: 1000,
    5: 1500,
  },
} as const;

export type LeadAnswers = {
  budget?: string;
  start?: string;
  role?: string;
  challenge?: string;
};

export type LeadTemperature = "cold" | "warm" | "hot";

export function getAnswerPoints(
  questionId: keyof typeof LEAD_SCORING_CONFIG.answers,
  answer: string
): number {
  return LEAD_SCORING_CONFIG.answers[questionId][
    answer as keyof (typeof LEAD_SCORING_CONFIG.answers)[typeof questionId]
  ] ?? 0;
}

export function calculateLeadScore(answers: LeadAnswers): {
  score: 1 | 2 | 3 | 4 | 5;
  temperature: LeadTemperature;
  totalPoints: number;
} {
  const totalPoints = (Object.keys(LEAD_SCORING_CONFIG.answers) as Array<
    keyof typeof LEAD_SCORING_CONFIG.answers
  >).reduce(
    (total, questionId) =>
      total + getAnswerPoints(questionId, answers[questionId] ?? ""),
    0
  );
  const maxPoints = Object.values(LEAD_SCORING_CONFIG.answers).reduce(
    (total, question) => total + Math.max(...Object.values(question)),
    0
  );
  const score = Math.max(
    1,
    Math.min(5, Math.round(1 + (totalPoints / maxPoints) * 4))
  ) as 1 | 2 | 3 | 4 | 5;
  const temperature: LeadTemperature =
    score <= 2 ? "cold" : score === 3 ? "warm" : "hot";

  return { score, temperature, totalPoints };
}
