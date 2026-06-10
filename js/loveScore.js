/**
 * loveScore.js
 * ------------
 * Love compatibility score checker module.
 * Calculate romantic compatibility between two people based on names,
 * personality traits, zodiac signs, and love languages.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const LOVE_LEVELS = [
  { min: 90, label: "💍 Soulmates",         emoji: "💍", message: "You were made for each other! This is a once-in-a-lifetime connection." },
  { min: 75, label: "❤️  Perfect Match",     emoji: "❤️",  message: "Amazing chemistry! You two have a deep and powerful bond." },
  { min: 60, label: "💛 Great Potential",    emoji: "💛", message: "Strong connection with room to grow. Nurture this relationship!" },
  { min: 45, label: "💚 Good Compatibility", emoji: "💚", message: "You have a solid foundation. Communication is key!" },
  { min: 30, label: "💙 Moderate Match",     emoji: "💙", message: "Some differences exist, but love can conquer all with effort." },
  { min: 15, label: "💜 Needs Work",         emoji: "💜", message: "Challenging but not impossible. Understanding each other is crucial." },
  { min: 0,  label: "🖤 Unlikely Match",     emoji: "🖤", message: "Very different personalities. Opposites sometimes attract though!" },
];

const ZODIAC_COMPATIBILITY = {
  Aries:       { best: ["Leo", "Sagittarius", "Gemini"],       worst: ["Cancer", "Capricorn"] },
  Taurus:      { best: ["Virgo", "Capricorn", "Cancer"],       worst: ["Leo", "Aquarius"] },
  Gemini:      { best: ["Libra", "Aquarius", "Aries"],         worst: ["Virgo", "Pisces"] },
  Cancer:      { best: ["Scorpio", "Pisces", "Taurus"],        worst: ["Aries", "Libra"] },
  Leo:         { best: ["Aries", "Sagittarius", "Gemini"],     worst: ["Taurus", "Scorpio"] },
  Virgo:       { best: ["Taurus", "Capricorn", "Cancer"],      worst: ["Gemini", "Sagittarius"] },
  Libra:       { best: ["Gemini", "Aquarius", "Leo"],          worst: ["Cancer", "Capricorn"] },
  Scorpio:     { best: ["Cancer", "Pisces", "Virgo"],          worst: ["Leo", "Aquarius"] },
  Sagittarius: { best: ["Aries", "Leo", "Aquarius"],           worst: ["Virgo", "Pisces"] },
  Capricorn:   { best: ["Taurus", "Virgo", "Scorpio"],         worst: ["Aries", "Libra"] },
  Aquarius:    { best: ["Gemini", "Libra", "Sagittarius"],     worst: ["Taurus", "Scorpio"] },
  Pisces:      { best: ["Cancer", "Scorpio", "Capricorn"],     worst: ["Gemini", "Sagittarius"] },
};

const LOVE_LANGUAGES = ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"];

const PERSONALITY_TRAITS = ["Adventurous", "Caring", "Funny", "Loyal", "Ambitious", "Creative", "Romantic", "Honest", "Patient", "Passionate"];


// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Calculates a numeric hash from a string.
 * @param {string} str
 * @returns {number}
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
}

/**
 * Gets the love level object based on a score.
 * @param {number} score
 * @returns {Object}
 */
function getLoveLevel(score) {
  return LOVE_LEVELS.find((level) => score >= level.min);
}

/**
 * Clamps a number between min and max.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


// ─── Core Score by Names ──────────────────────────────────────────────────────

/**
 * Calculates a fun love score based on two names.
 *
 * @param {string} name1 - First person's name.
 * @param {string} name2 - Second person's name.
 * @returns {{
 *   score:   number,
 *   level:   string,
 *   emoji:   string,
 *   message: string
 * }}
 *
 * @example
 * calculateLoveByName("Alice", "Bob");
 */
function calculateLoveByName(name1, name2) {
  if (!name1?.trim() || !name2?.trim()) {
    throw new Error("Both names are required.");
  }

  const combined = (name1.trim() + name2.trim()).toLowerCase();
  const hash     = hashString(combined);
  const score    = clamp((hash % 91) + 10, 1, 100); // Range: 10–100
  const level    = getLoveLevel(score);

  console.log(`\n💕 Love Score: ${name1} & ${name2}`);
  console.log(`   Score   : ${score}%`);
  console.log(`   Level   : ${level.label}`);
  console.log(`   Message : ${level.message}`);

  return {
    name1:   name1.trim(),
    name2:   name2.trim(),
    score,
    level:   level.label,
    emoji:   level.emoji,
    message: level.message,
  };
}


// ─── Score by Zodiac Signs ────────────────────────────────────────────────────

/**
 * Calculates compatibility based on zodiac signs.
 *
 * @param {string} sign1 - First person's zodiac sign.
 * @param {string} sign2 - Second person's zodiac sign.
 * @returns {{
 *   sign1:          string,
 *   sign2:          string,
 *   score:          number,
 *   compatibility:  string,
 *   level:          string,
 *   message:        string
 * }}
 *
 * @example
 * calculateLoveByZodiac("Aries", "Leo");
 */
function calculateLoveByZodiac(sign1, sign2) {
  const validSigns = Object.keys(ZODIAC_COMPATIBILITY);

  const s1 = sign1.trim();
  const s2 = sign2.trim();

  if (!validSigns.includes(s1) || !validSigns.includes(s2)) {
    throw new Error(`Invalid zodiac sign. Valid signs: ${validSigns.join(", ")}`);
  }

  const compat = ZODIAC_COMPATIBILITY[s1];
  let score;
  let compatibility;

  if (compat.best.includes(s2)) {
    score         = clamp(80 + (hashString(s1 + s2) % 20), 80, 100);
    compatibility = "Highly Compatible ⭐⭐⭐⭐⭐";
  } else if (compat.worst.includes(s2)) {
    score         = clamp(10 + (hashString(s1 + s2) % 25), 10, 35);
    compatibility = "Challenging ⭐";
  } else {
    score         = clamp(40 + (hashString(s1 + s2) % 35), 40, 75);
    compatibility = "Moderately Compatible ⭐⭐⭐";
  }

  const level = getLoveLevel(score);

  console.log(`\n♈ Zodiac Compatibility: ${s1} & ${s2}`);
  console.log(`   Compatibility : ${compatibility}`);
  console.log(`   Score         : ${score}%`);
  console.log(`   Level         : ${level.label}`);

  return {
    sign1:         s1,
    sign2:         s2,
    score,
    compatibility,
    level:         level.label,
    emoji:         level.emoji,
    message:       level.message,
  };
}


// ─── Score by Love Language ───────────────────────────────────────────────────

/**
 * Calculates compatibility based on love languages.
 *
 * @param {string} language1 - First person's love language.
 * @param {string} language2 - Second person's love language.
 * @returns {Object}
 *
 * @example
 * calculateLoveByLanguage("Quality Time", "Quality Time");
 */
function calculateLoveByLanguage(language1, language2) {
  if (!LOVE_LANGUAGES.includes(language1) || !LOVE_LANGUAGES.includes(language2)) {
    throw new Error(`Invalid love language. Options: ${LOVE_LANGUAGES.join(", ")}`);
  }

  let score;
  let note;

  if (language1 === language2) {
    score = clamp(85 + (hashString(language1) % 15), 85, 100);
    note  = "Same love language — instant deep connection! 💞";
  } else {
    const diff = Math.abs(LOVE_LANGUAGES.indexOf(language1) - LOVE_LANGUAGES.indexOf(language2));
    score = clamp(50 + (5 - diff) * 8 + (hashString(language1 + language2) % 10), 30, 84);
    note  = "Different love languages — learning each other's style strengthens the bond. 🌱";
  }

  const level = getLoveLevel(score);

  console.log(`\n💬 Love Language Compatibility`);
  console.log(`   Person 1 : ${language1}`);
  console.log(`   Person 2 : ${language2}`);
  console.log(`   Score    : ${score}%`);
  console.log(`   Note     : ${note}`);

  return {
    language1,
    language2,
    score,
    note,
    level:   level.label,
    emoji:   level.emoji,
    message: level.message,
  };
}


// ─── Score by Personality Traits ─────────────────────────────────────────────

/**
 * Calculates compatibility based on personality traits.
 *
 * @param {string[]} traits1 - First person's traits (from PERSONALITY_TRAITS list).
 * @param {string[]} traits2 - Second person's traits.
 * @returns {Object}
 *
 * @example
 * calculateLoveByTraits(["Funny", "Loyal"], ["Funny", "Caring"]);
 */
function calculateLoveByTraits(traits1, traits2) {
  if (!Array.isArray(traits1) || !Array.isArray(traits2)) {
    throw new Error("Traits must be arrays.");
  }
  if (traits1.length === 0 || traits2.length === 0) {
    throw new Error("Each person must have at least one trait.");
  }

  const shared       = traits1.filter((t) => traits2.includes(t));
  const total        = new Set([...traits1, ...traits2]).size;
  const overlapRatio = shared.length / total;
  const score        = clamp(Math.round(overlapRatio * 60 + 30 + (hashString(traits1.join() + traits2.join()) % 15)), 1, 100);
  const level        = getLoveLevel(score);

  console.log(`\n🌟 Personality Compatibility`);
  console.log(`   Shared Traits : ${shared.length > 0 ? shared.join(", ") : "None"}`);
  console.log(`   Score         : ${score}%`);
  console.log(`   Level         : ${level.label}`);

  return {
    traits1,
    traits2,
    sharedTraits: shared,
    score,
    level:        level.label,
    emoji:        level.emoji,
    message:      level.message,
  };
}


// ─── Full Love Report ─────────────────────────────────────────────────────────

/**
 * Generates a complete love compatibility report combining all factors.
 *
 * @param {Object} person1
 * @param {string}   person1.name         - Full name.
 * @param {string}   person1.zodiac       - Zodiac sign.
 * @param {string}   person1.loveLanguage - Love language.
 * @param {string[]} person1.traits       - Personality traits.
 *
 * @param {Object} person2
 * @param {string}   person2.name
 * @param {string}   person2.zodiac
 * @param {string}   person2.loveLanguage
 * @param {string[]} person2.traits
 *
 * @returns {Object} Full compatibility report.
 *
 * @example
 * getLoveReport(
 *   { name: "Alice", zodiac: "Aries",  loveLanguage: "Quality Time", traits: ["Funny", "Loyal"] },
 *   { name: "Bob",   zodiac: "Leo",    loveLanguage: "Quality Time", traits: ["Funny", "Ambitious"] }
 * );
 */
function getLoveReport(person1, person2) {
  const nameScore     = calculateLoveByName(person1.name, person2.name);
  const zodiacScore   = calculateLoveByZodiac(person1.zodiac, person2.zodiac);
  const languageScore = calculateLoveByLanguage(person1.loveLanguage, person2.loveLanguage);
  const traitScore    = calculateLoveByTraits(person1.traits, person2.traits);

  // Weighted average: traits 30%, zodiac 25%, language 25%, name 20%
  const overallScore = Math.round(
    traitScore.score    * 0.30 +
    zodiacScore.score   * 0.25 +
    languageScore.score * 0.25 +
    nameScore.score     * 0.20
  );

  const overallLevel = getLoveLevel(overallScore);

  const report = {
    couple: `${person1.name} & ${person2.name}`,
    scores: {
      byName:     nameScore.score,
      byZodiac:   zodiacScore.score,
      byLanguage: languageScore.score,
      byTraits:   traitScore.score,
      overall:    overallScore,
    },
    overall: {
      score:   overallScore,
      level:   overallLevel.label,
      emoji:   overallLevel.emoji,
      message: overallLevel.message,
    },
    details: {
      sharedTraits:   traitScore.sharedTraits,
      zodiacCompat:   zodiacScore.compatibility,
      languageNote:   languageScore.note,
    },
    generatedAt: new Date().toISOString(),
  };

  console.log(`\n${"═".repeat(45)}`);
  console.log(`  💖 FULL LOVE REPORT: ${report.couple}`);
  console.log(`${"═".repeat(45)}`);
  console.log(`  Name Score     : ${report.scores.byName}%`);
  console.log(`  Zodiac Score   : ${report.scores.byZodiac}%`);
  console.log(`  Language Score : ${report.scores.byLanguage}%`);
  console.log(`  Traits Score   : ${report.scores.byTraits}%`);
  console.log(`${"─".repeat(45)}`);
  console.log(`  ⭐ OVERALL     : ${overallScore}% — ${overallLevel.label}`);
  console.log(`  ${overallLevel.message}`);
  console.log(`${"═".repeat(45)}\n`);

  return report;
}


// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  calculateLoveByName,
  calculateLoveByZodiac,
  calculateLoveByLanguage,
  calculateLoveByTraits,
  getLoveReport,
  LOVE_LANGUAGES,
  PERSONALITY_TRAITS,
  ZODIAC_COMPATIBILITY,
};


// ─── Quick Demo (remove in production) ───────────────────────────────────────

/*
const love = require("./loveScore");

// By name
love.calculateLoveByName("Alice", "Bob");

// By zodiac
love.calculateLoveByZodiac("Aries", "Leo");

// By love language
love.calculateLoveByLanguage("Quality Time", "Quality Time");

// By personality traits
love.calculateLoveByTraits(["Funny", "Loyal", "Romantic"], ["Funny", "Caring", "Honest"]);

// Full report
love.getLoveReport(
  { name: "Alice", zodiac: "Aries",  loveLanguage: "Quality Time",        traits: ["Funny", "Loyal", "Romantic"] },
  { name: "Bob",   zodiac: "Leo",    loveLanguage: "Words of Affirmation", traits: ["Funny", "Ambitious", "Honest"] }
);
*/
