// Progress tracking using localStorage
const STORAGE_KEY = 'codepath_progress';

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
  };
}

export function getProgress() {
  return getStore();
}

export function completeStep(lessonId, stepIndex) {
  const store = getStore();
  if (!store.completedSteps[lessonId]) {
    store.completedSteps[lessonId] = [];
  }
  if (!store.completedSteps[lessonId].includes(stepIndex)) {
    store.completedSteps[lessonId].push(stepIndex);
    store.xp += 10;
  }
  updateStreak(store);
  saveStore(store);
  return store;
}

export function completeLesson(lessonId) {
  const store = getStore();
  if (!store.completedLessons.includes(lessonId)) {
    store.completedLessons.push(lessonId);
    store.xp += 50;
  }
  updateStreak(store);
  saveStore(store);
  return store;
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
  if (store.streak.lastDate === today) return;
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (store.streak.lastDate === yesterday) {
    store.streak.count += 1;
  } else if (store.streak.lastDate !== today) {
    store.streak.count = 1;
  }
  store.streak.lastDate = today;
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
