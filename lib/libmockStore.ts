// lib/mockStore.ts
export type Booking = {
  teacherId: string;
  day: number;      // 0..6
  time: string;     // e.g. "08:00"
  studentId?: string;
  createdAt?: string;
};

const bookings: Booking[] = [
  // 範例：預設一個被預約的時段，方便測試
  { teacherId: "t-001", day: 1, time: "08:00", studentId: "s-001", createdAt: new Date().toISOString() }
];

// 讀取某位老師的所有 booking
export function getTeacherBookings(teacherId?: string) {
  if (!teacherId) return bookings.slice();
  return bookings.filter((b) => b.teacherId === teacherId);
}

// 檢查某時段是否已有預約 (teacherId 必填)
export function hasBooking(teacherId: string, day: number, time: string) {
  return bookings.some((b) => b.teacherId === teacherId && b.day === day && b.time === time);
}

// 新增預約
export function addBooking(b: Booking) {
  bookings.push({ ...b, createdAt: new Date().toISOString() });
  return true;
}

// 刪除預約（可選）
export function removeBooking(teacherId: string, day: number, time: string) {
  const idx = bookings.findIndex((b) => b.teacherId === teacherId && b.day === day && b.time === time);
  if (idx >= 0) {
    bookings.splice(idx, 1);
    return true;
  }
  return false;
}

// 清空（測試用）
export function clearBookings() {
  bookings.length = 0;
}
