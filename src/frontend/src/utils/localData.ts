// Timetable
export interface TimetableEntry {
  id: string;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
  venue: string;
  color: string;
}

export function getTimetable(): TimetableEntry[] {
  try {
    return JSON.parse(localStorage.getItem("ssp_timetable") || "[]");
  } catch {
    return [];
  }
}
export function saveTimetable(data: TimetableEntry[]) {
  localStorage.setItem("ssp_timetable", JSON.stringify(data));
}

// Books
export interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  status: "reading" | "completed" | "wishlist";
  color: string;
}

export function getBooks(): Book[] {
  try {
    return JSON.parse(localStorage.getItem("ssp_books") || "[]");
  } catch {
    return [];
  }
}
export function saveBooks(data: Book[]) {
  localStorage.setItem("ssp_books", JSON.stringify(data));
}

// Coding Languages
export interface CodingTopic {
  id: string;
  name: string;
  completed: boolean;
}
export interface CodingLanguage {
  id: string;
  name: string;
  color: string;
  topics: CodingTopic[];
}

export function getLanguages(): CodingLanguage[] {
  try {
    return JSON.parse(localStorage.getItem("ssp_coding") || "[]");
  } catch {
    return [];
  }
}
export function saveLanguages(data: CodingLanguage[]) {
  localStorage.setItem("ssp_coding", JSON.stringify(data));
}
