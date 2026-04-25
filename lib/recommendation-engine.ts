type RecommendationType = "product" | "plan" | "habit";

export type UserProfile = {
  age: number;
  gender: string;
  bmi: number;
  goal: string;
  activity_level: string;
  diet_type: string;
  conditions: string[];
  preferences: {
    budget?: string;
    product_types?: string[];
  };
};

export type Product = {
  name: string;
  category: string;
  health_benefits: string[];
  target_conditions: string[];
  suitable_for: {
    activity_levels: string[];
    diet_types: string[];
  };
  contraindications: string[];
  price: number;
};

export type RecommendationItem = {
  type: RecommendationType;
  name: string;
  score: number;
  reason: string;
  details: string;
};

export type RecommendationOutput = {
  summary: string;
  recommendations: RecommendationItem[];
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "Magnesium Complex",
    category: "supplements",
    health_benefits: ["better_sleep", "stress_reduction", "muscle_recovery"],
    target_conditions: ["stress", "sleep_issues", "vitamin_deficiency"],
    suitable_for: {
      activity_levels: ["low", "moderate", "high"],
      diet_types: ["healthy", "balanced", "vegetarian"],
    },
    contraindications: ["kidney_disease"],
    price: 32,
  },
  {
    name: "Whey Protein Isolate",
    category: "supplements",
    health_benefits: ["muscle_gain", "recovery", "satiety"],
    target_conditions: ["low_protein_intake"],
    suitable_for: {
      activity_levels: ["moderate", "high"],
      diet_types: ["balanced", "healthy"],
    },
    contraindications: ["lactose_intolerance"],
    price: 48,
  },
  {
    name: "Plant Protein Blend",
    category: "supplements",
    health_benefits: ["muscle_gain", "satiety", "weight_loss"],
    target_conditions: ["low_protein_intake"],
    suitable_for: {
      activity_levels: ["low", "moderate", "high"],
      diet_types: ["vegetarian", "healthy", "balanced"],
    },
    contraindications: [],
    price: 44,
  },
  {
    name: "Omega-3 Softgels",
    category: "supplements",
    health_benefits: ["stress_reduction", "heart_support", "recovery"],
    target_conditions: ["blood_pressure", "inflammation"],
    suitable_for: {
      activity_levels: ["low", "moderate", "high"],
      diet_types: ["healthy", "balanced"],
    },
    contraindications: ["fish_allergy"],
    price: 28,
  },
  {
    name: "Sleep Hygiene Coaching",
    category: "services",
    health_benefits: ["better_sleep", "stress_reduction"],
    target_conditions: ["sleep_issues", "stress"],
    suitable_for: {
      activity_levels: ["low", "moderate", "high"],
      diet_types: ["healthy", "balanced", "junk", "vegetarian"],
    },
    contraindications: [],
    price: 65,
  },
  {
    name: "12-Week Fat Loss Program",
    category: "programs",
    health_benefits: ["weight_loss", "habit_building", "fitness"],
    target_conditions: ["overweight", "prediabetes"],
    suitable_for: {
      activity_levels: ["low", "moderate"],
      diet_types: ["healthy", "balanced", "vegetarian"],
    },
    contraindications: [],
    price: 85,
  },
];

function normalizeGoal(goal: string): string {
  const value = goal.trim().toLowerCase();
  const map: Record<string, string> = {
    "weight-loss": "weight_loss",
    "weight loss": "weight_loss",
    "muscle-gain": "muscle_gain",
    "muscle gain": "muscle_gain",
    sleep: "better_sleep",
    stress: "stress_reduction",
  };

  return map[value] ?? value;
}

function normalizeCondition(condition: string): string {
  const value = condition.trim().toLowerCase();
  const map: Record<string, string> = {
    "blood-pressure": "blood_pressure",
    "vitamin-deficiency": "vitamin_deficiency",
    none: "none",
  };

  return map[value] ?? value;
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function budgetFitScore(price: number, budget: string): number {
  if (budget === "low") {
    return price <= 40 ? 15 : price <= 60 ? 8 : 0;
  }

  if (budget === "medium") {
    return price <= 80 ? 12 : price <= 110 ? 7 : 3;
  }

  if (budget === "high") {
    return price <= 160 ? 10 : 7;
  }

  return 6;
}

function scoreProduct(product: Product, profile: UserProfile): RecommendationItem | null {
  const goal = normalizeGoal(profile.goal);
  const conditions = (profile.conditions ?? []).map(normalizeCondition).filter((c) => c !== "none");
  const budget = (profile.preferences?.budget ?? "").toLowerCase();
  const preferredTypes = (profile.preferences?.product_types ?? []).map((t) => t.toLowerCase());
  const reasons: string[] = [];

  if (conditions.some((condition) => product.contraindications.includes(condition))) {
    return null;
  }

  let score = 0;

  if (product.health_benefits.includes(goal)) {
    score += 35;
    reasons.push(`strong goal match for ${goal.replace("_", " ")}`);
  } else {
    score += 8;
  }

  const matchingConditionCount = conditions.filter((condition) =>
    product.target_conditions.includes(condition)
  ).length;

  if (conditions.length === 0) {
    score += 12;
  } else {
    score += (matchingConditionCount / conditions.length) * 30;
    if (matchingConditionCount > 0) {
      reasons.push("aligned with reported health conditions");
    }
  }

  if (product.suitable_for.activity_levels.includes(profile.activity_level)) {
    score += 10;
    reasons.push("fits activity level");
  }

  if (product.suitable_for.diet_types.includes(profile.diet_type)) {
    score += 10;
    reasons.push("compatible with diet type");
  }

  if (preferredTypes.length > 0 && preferredTypes.includes(product.category.toLowerCase())) {
    score += 10;
    reasons.push("matches preferred product type");
  }

  score += budgetFitScore(product.price, budget);

  if (profile.bmi >= 30 && goal === "weight_loss" && product.health_benefits.includes("satiety")) {
    score += 8;
    reasons.push("supports appetite control for current BMI");
  }

  if (profile.activity_level === "high" && product.health_benefits.includes("recovery")) {
    score += 6;
    reasons.push("supports high-activity recovery");
  }

  const reason = reasons.length > 0 ? reasons.slice(0, 3).join(", ") : "general lifestyle compatibility";

  return {
    type: "product",
    name: product.name,
    score: clampScore(score),
    reason,
    details: `${product.category} at $${product.price} with benefits: ${product.health_benefits.join(", ")}`,
  };
}

function buildPlanRecommendation(profile: UserProfile): RecommendationItem {
  const goal = normalizeGoal(profile.goal);
  const planByGoal: Record<string, { name: string; details: string }> = {
    weight_loss: {
      name: "Calorie-Aware Fat Loss Plan",
      details: "8-12 weeks with progressive activity targets, protein-forward meals, and weekly weight trend checks.",
    },
    muscle_gain: {
      name: "Progressive Muscle Gain Plan",
      details: "3-5 resistance sessions/week, protein timing, and gradual overload with recovery days.",
    },
    better_sleep: {
      name: "Sleep Restoration Plan",
      details: "Fixed sleep window, evening light hygiene, and stimulant cut-off protocol.",
    },
    stress_reduction: {
      name: "Stress Reset Plan",
      details: "Daily breathwork, short mindfulness blocks, and workload pacing habits.",
    },
  };

  const selected = planByGoal[goal] ?? {
    name: "Balanced Wellness Plan",
    details: "A mixed plan across nutrition, movement, stress management, and sleep consistency.",
  };

  const score = clampScore(
    70 +
      (profile.activity_level === "moderate" || profile.activity_level === "high" ? 8 : 2) +
      (profile.diet_type === "healthy" || profile.diet_type === "balanced" ? 6 : 2)
  );

  return {
    type: "plan",
    name: selected.name,
    score,
    reason: "directly aligned with primary goal and current lifestyle baseline",
    details: selected.details,
  };
}

function buildHabitRecommendation(profile: UserProfile): RecommendationItem {
  const sleepDriven = profile.goal === "better_sleep" || profile.conditions.includes("stress");

  if (sleepDriven) {
    return {
      type: "habit",
      name: "Night Routine Anchor",
      score: 82,
      reason: "sleep and stress pattern indicates high benefit from routine consistency",
      details: "Set a fixed wind-down alarm 60 minutes before bed, avoid screens, and keep wake time stable.",
    };
  }

  return {
    type: "habit",
    name: "Daily Movement + Protein Habit",
    score: 79,
    reason: "supports body composition and metabolic stability goals",
    details: "Add a 20-minute walk after one meal and hit a protein target at each main meal.",
  };
}

function buildSummary(profile: UserProfile): string {
  const goal = normalizeGoal(profile.goal).replace("_", " ");
  const conditionPart = profile.conditions.length > 0 && !profile.conditions.includes("none")
    ? `with focus on ${profile.conditions.join(", ")}`
    : "with no major condition flags";

  return `Profile indicates a ${profile.activity_level} activity baseline and ${profile.diet_type} diet pattern, targeting ${goal} ${conditionPart}.`;
}

export function normalizeQuizProfile(quizProfile: Record<string, unknown>): UserProfile {
  const goals = Array.isArray(quizProfile.goals) ? quizProfile.goals : [];
  const conditions = Array.isArray(quizProfile.conditions) ? quizProfile.conditions : [];
  const productTypes = Array.isArray(quizProfile.productTypes) ? quizProfile.productTypes : [];

  return {
    age: Number(quizProfile.age ?? 0),
    gender: String(quizProfile.gender ?? "unknown"),
    bmi: Number(quizProfile.bmi ?? 0),
    goal: String(goals[0] ?? "better_sleep"),
    activity_level: String(quizProfile.activity ?? "moderate"),
    diet_type: String(quizProfile.eating ?? "balanced"),
    conditions: conditions.map((item) => String(item)),
    preferences: {
      budget: String(quizProfile.budget ?? "medium"),
      product_types: productTypes.map((item) => String(item)),
    },
  };
}

export function generateRecommendations(
  userProfile: UserProfile,
  availableProducts: Product[] = DEFAULT_PRODUCTS
): RecommendationOutput {
  const scoredProducts = availableProducts
    .map((product) => scoreProduct(product, userProfile))
    .filter((item): item is RecommendationItem => item !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const plan = buildPlanRecommendation(userProfile);
  const habit = buildHabitRecommendation(userProfile);

  const recommendations = [...scoredProducts, plan, habit]
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return {
    summary: buildSummary(userProfile),
    recommendations,
  };
}
