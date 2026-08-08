// bookings-data.js
//
// Confirmed bookings only. This is NOT a database — it's a plain list you edit by hand
// each time you confirm a booking request by reply, then commit + redeploy the site.
// The booking form on index.html reads this list to grey out conflicting date/time slots
// for future visitors. It does not enforce anything on its own — you're still the one
// who confirms every request.
//
// Add ONE object per confirmed event:
//   event:          exact event name (must match the event card's title)
//   date:           "YYYY-MM-DD"
//   time:           "HH:MM" in 24-hour time (omit for all-day events)
//   durationHours:  use the SAME upper-bound rule as the event's catalog duration text —
//                   "Up to 1 hour" / "1 hour" -> 1, "1–2 hours" -> 2, "2–3 hours" -> 3
//                   (omit for all-day events)
//   allDay:         true for the one multi-day event (Patio Decorating Contest) instead of
//                   time/durationHours — blocks the whole day
//
// Example (do not leave real placeholder bookings in the live list):
//   { event: "Trivia Night", date: "2026-09-12", time: "18:00", durationHours: 2 },
//   { event: "Patio Decorating Contest", date: "2026-09-20", allDay: true }

var CONFIRMED_BOOKINGS = [
];
