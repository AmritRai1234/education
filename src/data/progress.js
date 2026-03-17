// Progress tracking using localStorage with gamification
const STORAGE_KEY = 'codepath_progress';

// XP required for each level
const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000
];

function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : createDefaultStore();
  } catch {
    return createDefaultStore();
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function createDefaultStore() {
  return {
    completedSteps: {},   // { lessonId: [stepIndex, ...] }
    completedLessons: [], // [lessonId, ...]
    streak: { count: 0, lastDate: null },
    xp: 0,
    level: 1,
    badges: [],
    lastActivity: null,
  };
}

export function getProgress() {
  return getStore();
}

export function getLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXPForNextLevel(xp) {
  const level = getLevel(xp);
  if (level >= LEVEL_THRESHOLDS.length) return null;
  return LEVEL_THRESHOLDS[level];
}

export function getLevelProgress(xp) {
  const level = getLevel(xp);
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevelXP = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpInLevel = xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  return Math.round((xpInLevel / xpNeeded) * 100);
}

export function completeStep(lessonId, stepIndex) {
  const store = getStore();
  const prevXP = store.xp;
  const prevLevel = getLevel(prevXP);
  
  if (!store.completedSteps[lessonId]) {
    store.completedSteps[lessonId] = [];
  }
  
  let xpGained = 0;
  if (!store.completedSteps[lessonId].includes(stepIndex)) {
    store.completedSteps[lessonId].push(stepIndex);
    xpGained = 10;
    store.xp += xpGained;
  }
  
  const newLevel = getLevel(store.xp);
  const leveledUp = newLevel > prevLevel;
  
  const streakResult = updateStreak(store);
  saveStore(store);
  
  return {
    xpGained,
    newXP: store.xp,
    leveledUp,
    newLevel,
    streakIncreased: streakResult.increased,
    newStreak: streakResult.count,
  };
}

export function completeLesson(lessonId) {
  const store = getStore();
  const prevXP = store.xp;
  const prevLevel = getLevel(prevXP);
  
  let xpGained = 0;
  if (!store.completedLessons.includes(lessonId)) {
    store.completedLessons.push(lessonId);
    xpGained = 50;
    store.xp += xpGained;
    
    // Check for badges
    checkBadges(store);
  }
  
  const newLevel = getLevel(store.xp);
  const leveledUp = newLevel > prevLevel;
  
  const streakResult = updateStreak(store);
  saveStore(store);
  
  return {
    xpGained,
    newXP: store.xp,
    leveledUp,
    newLevel,
    streakIncreased: streakResult.increased,
    newStreak: streakResult.count,
    totalLessons: store.completedLessons.length,
  };
}

function checkBadges(store) {
  const badges = store.badges || [];
  
  // First lesson badge
  if (store.completedLessons.length === 1 && !badges.includes('first_lesson')) {
    badges.push('first_lesson');
  }
  
  // 5 lessons badge
  if (store.completedLessons.length === 5 && !badges.includes('five_lessons')) {
    badges.push('five_lessons');
  }
  
  // 10 lessons badge
  if (store.completedLessons.length === 10 && !badges.includes('ten_lessons')) {
    badges.push('ten_lessons');
  }
  
  // Week streak badge
  if (store.streak.count >= 7 && !badges.includes('week_streak')) {
    badges.push('week_streak');
  }
  
  store.badges = badges;
}

export function isLessonComplete(lessonId) {
  const store = getStore();
  return store.completedLessons.includes(lessonId);
}

export function getLessonProgress(lessonId, totalSteps) {
  const store = getStore();
  const steps = store.completedSteps[lessonId] || [];
  return totalSteps > 0 ? Math.round((steps.length / totalSteps) * 100) : 0;
}

export function getTrackProgress(trackId, lessons) {
  const store = getStore();
  const completed = lessons.filter(l => store.completedLessons.includes(l.id)).length;
  return lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0;
}

function updateStreak(store) {
  const today = new Date().toISOString().split('T')[0];
  let increased = false;
  
  if (store.streak.lastDate === today) {
    return { increased: false, count: store.streak.count };
  }
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (store.streak.lastDate === yesterday) {
    store.streak.count += 1;
    increased = true;
  } else if (store.streak.lastDate !== today) {
    store.streak.count = 1;
    increased = store.streak.lastDate !== null;
  }
  
  store.streak.lastDate = today;
  store.lastActivity = today;
  
  return { increased, count: store.streak.count };
}

export function getStreak() {
  const store = getStore();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (store.streak.lastDate === today || store.streak.lastDate === yesterday) {
    return store.streak.count;
  }
  return 0;
}

export function getXP() {
  return getStore().xp;
}

export function getBadges() {
  return getStore().badges || [];
}

export function getTotalLessonsCompleted() {
  return getStore().completedLessons.length;
}

// Badge definitions
export const BADGES = {
  first_lesson: {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'star',
    color: 'yellow',
  },
  five_lessons: {
    id: 'five_lessons',
    name: 'Getting Started',
    description: 'Complete 5 lessons',
    icon: 'trending-up',
    color: 'blue',
  },
  ten_lessons: {
    id: 'ten_lessons',
    name: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: 'trophy',
    color: 'purple',
  },
  week_streak: {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Maintain a 7 day streak',
    icon: 'flame',
    color: 'orange',
  },
};
