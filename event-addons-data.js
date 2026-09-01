// event-addons-data.js
//
// The 4 general add-on packages from pricing.html, used by book.html to let people
// select what they want during booking. Priced at their published starting rate --
// Griffin confirms the real total after reviewing the request.
//
// Keep this in sync with the bundle cards on pricing.html.
//
// (This file used to also hold EVENT_ADDONS -- a per-event optional add-on list
// mirroring each event card on events.html. Removed 2026-08-31: both events.html's
// cards and this booking form now point everyone to the same published packages
// below instead of a different unpriced wishlist per event.)

var GENERAL_ADDON_PACKAGES = [
  { name: "Décor Refresh", price: "$295", detail: "5 ft organic balloon garland, custom full-color welcome sign" },
  { name: "Photo Corner", price: "$420", detail: "Premium photo backdrop, custom welcome sign" },
  { name: "Sweet Social", price: "$395", detail: "Ice cream social (50 servings), one lawn game set" },
  { name: "Game Day", price: "$550", detail: "Snow cone cart (50 servings), two lawn game sets, 5 ft balloon garland" }
];
