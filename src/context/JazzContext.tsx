"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, readJson, removeKey, writeJson } from "@/lib/storage";

type RecentlyPlayed = { trackId: string; playedAt: string };

type CourseProgress = Record<string, string[]>; // courseId -> 완료한 step keys

/** 감상 기록 — guideline.MD §6 템플릿 기반 */
export type ListeningNote = {
  instrument: string; // 가장 인상적인 악기
  mood: string; // 전체 분위기
  moment: string; // 기억에 남은 순간
  rating: number; // 1~5 (다시 듣고 싶은 정도)
  line: string; // 한 줄 감상
  updatedAt: string;
};

type NoteMap = Record<string, ListeningNote>; // key: `${guideId}:${trackId}`

type JazzState = {
  favorites: string[];
  completed: string[];
  recent: RecentlyPlayed[];
  courses: CourseProgress;
  searches: string[];
  notes: NoteMap;
};

type JazzContextValue = JazzState & {
  hydrated: boolean;
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  toggleCompleted: (trackId: string) => void;
  isCompleted: (trackId: string) => boolean;
  addRecent: (trackId: string) => void;
  toggleCourseStep: (courseId: string, stepKey: string) => void;
  isCourseStepDone: (courseId: string, stepKey: string) => boolean;
  addSearch: (query: string) => void;
  clearSearches: () => void;
  saveNote: (key: string, note: Omit<ListeningNote, "updatedAt">) => void;
  deleteNote: (key: string) => void;
  resetAll: () => void;
};

const EMPTY: JazzState = { favorites: [], completed: [], recent: [], courses: {}, searches: [], notes: {} };

const JazzContext = createContext<JazzContextValue | null>(null);

const RECENT_LIMIT = 20;
const SEARCH_LIMIT = 8;

export function JazzProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<JazzState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  // 클라이언트 마운트 후 저장 상태 복원 (hydration 오류 방지)
  useEffect(() => {
    setState({
      favorites: readJson<string[]>(STORAGE_KEYS.favorites, []),
      completed: readJson<string[]>(STORAGE_KEYS.completed, []),
      recent: readJson<RecentlyPlayed[]>(STORAGE_KEYS.recent, []),
      courses: readJson<CourseProgress>(STORAGE_KEYS.courses, {}),
      searches: readJson<string[]>(STORAGE_KEYS.searches, []),
      notes: readJson<NoteMap>(STORAGE_KEYS.notes, {}),
    });
    setHydrated(true);
  }, []);

  const toggleFavorite = useCallback((trackId: string) => {
    setState((prev) => {
      const favorites = prev.favorites.includes(trackId)
        ? prev.favorites.filter((id) => id !== trackId)
        : [trackId, ...prev.favorites];
      writeJson(STORAGE_KEYS.favorites, favorites);
      return { ...prev, favorites };
    });
  }, []);

  const toggleCompleted = useCallback((trackId: string) => {
    setState((prev) => {
      const completed = prev.completed.includes(trackId)
        ? prev.completed.filter((id) => id !== trackId)
        : [trackId, ...prev.completed];
      writeJson(STORAGE_KEYS.completed, completed);
      return { ...prev, completed };
    });
  }, []);

  const addRecent = useCallback((trackId: string) => {
    setState((prev) => {
      const rest = prev.recent.filter((r) => r.trackId !== trackId);
      const recent = [{ trackId, playedAt: new Date().toISOString() }, ...rest].slice(0, RECENT_LIMIT);
      writeJson(STORAGE_KEYS.recent, recent);
      return { ...prev, recent };
    });
  }, []);

  const toggleCourseStep = useCallback((courseId: string, stepKey: string) => {
    setState((prev) => {
      const done = prev.courses[courseId] ?? [];
      const next = done.includes(stepKey) ? done.filter((k) => k !== stepKey) : [...done, stepKey];
      const courses = { ...prev.courses, [courseId]: next };
      writeJson(STORAGE_KEYS.courses, courses);
      return { ...prev, courses };
    });
  }, []);

  const addSearch = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    setState((prev) => {
      const searches = [q, ...prev.searches.filter((s) => s !== q)].slice(0, SEARCH_LIMIT);
      writeJson(STORAGE_KEYS.searches, searches);
      return { ...prev, searches };
    });
  }, []);

  const clearSearches = useCallback(() => {
    setState((prev) => {
      removeKey(STORAGE_KEYS.searches);
      return { ...prev, searches: [] };
    });
  }, []);

  const saveNote = useCallback((key: string, note: Omit<ListeningNote, "updatedAt">) => {
    setState((prev) => {
      const notes = { ...prev.notes, [key]: { ...note, updatedAt: new Date().toISOString() } };
      writeJson(STORAGE_KEYS.notes, notes);
      return { ...prev, notes };
    });
  }, []);

  const deleteNote = useCallback((key: string) => {
    setState((prev) => {
      const notes = { ...prev.notes };
      delete notes[key];
      writeJson(STORAGE_KEYS.notes, notes);
      return { ...prev, notes };
    });
  }, []);

  const resetAll = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (key !== STORAGE_KEYS.theme) removeKey(key);
    });
    setState(EMPTY);
  }, []);

  const value = useMemo<JazzContextValue>(
    () => ({
      ...state,
      hydrated,
      toggleFavorite,
      isFavorite: (id) => state.favorites.includes(id),
      toggleCompleted,
      isCompleted: (id) => state.completed.includes(id),
      addRecent,
      toggleCourseStep,
      isCourseStepDone: (courseId, key) => (state.courses[courseId] ?? []).includes(key),
      addSearch,
      clearSearches,
      saveNote,
      deleteNote,
      resetAll,
    }),
    [state, hydrated, toggleFavorite, toggleCompleted, addRecent, toggleCourseStep, addSearch, clearSearches, saveNote, deleteNote, resetAll],
  );

  return <JazzContext.Provider value={value}>{children}</JazzContext.Provider>;
}

export function useJazz(): JazzContextValue {
  const ctx = useContext(JazzContext);
  if (!ctx) throw new Error("useJazz must be used within JazzProvider");
  return ctx;
}
