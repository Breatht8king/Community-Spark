// event-addons-data.js
//
// Per-event optional add-on lists (matches each event card on events.html) and the
// 4 general add-on packages from pricing.html. Used by book.html to let people select
// what they want during booking. These are informational only, not priced automatically
// (except the general packages, which show their published starting rate) -- Griffin
// quotes the real total after reviewing the request.
//
// Keep EVENT_ADDONS keys in sync with book.html's <option value="..."> values and
// events.html's data-name attributes. Keep GENERAL_ADDON_PACKAGES in sync with the
// bundle cards on pricing.html.

var EVENT_ADDONS = {
  "trivia night": ["Professional trivia host", "Premium prize package", "Themed decorations", "Catered food as a vendor pass-through", "DJ or upgraded sound", "Event photographer"],
  "national bagel day bar": ["Hot coffee station", "Fresh juice service", "Pastry assortment", "Premium floral décor", "Custom branded cups", "Event photographer"],
  "valentines bouquet bar": ["Premium vase upgrade", "Chocolate or dessert station", "Photo backdrop", "Balloon installation", "Live acoustic musician", "Event photographer"],
  "march madness watch party": ["Basketball-themed photo backdrop", "Team-themed décor package", "Premium winner prizes", "Catered game-day food as a vendor pass-through", "Sports photographer", "Additional game stations"],
  "build-your-own waffle bar": ["Additional waffle maker", "Coffee or hot cocoa station", "Savory waffle toppings", "Fresh juice bar", "Premium tabletop décor", "Event attendant"],
  "pi day pizza party": ["Gluten-free pizza options", "Dessert pies", "Soda and beverage station", "Pi Day trivia", "Additional raffle prizes", "Catered pizza as a vendor pass-through"],
  "dog adoption pet appreciation day": ["Local shelter or rescue coordination", "Pet photographer", "Dog treat vendor", "Pet costume contest", "Custom bandanas", "Mobile grooming or training partner"],
  "patio decorating contest": ["Printed voting materials", "Online resident voting setup", "Winner photography", "Seasonal welcome signs", "Additional honorable-mention prizes", "Closing resident social"],
  "resident fitness session": ["Second trainer or extended session", "Yoga mats", "Healthy snack station", "Smoothie or juice vendor", "Wellness giveaway bags", "Fitness photographer"],
  "community farmers market": ["Local vendor sourcing", "Live acoustic music", "Coffee or food truck", "Additional tents and tables", "Branded market signage", "Event photographer"],
  "national donut day": ["Specialty donut flavors", "Mobile coffee cart", "Custom branded napkins", "Fruit and yogurt options", "Balloon décor", "Resident giveaway"],
  "community pool party": ["Professional DJ", "Pool games and competitions", "Photo booth", "Premium décor", "Event photographer", "Additional catering as a vendor pass-through"],
  "national ice cream day": ["Ice cream cart", "Dairy-free options", "Sundae competition", "Custom cups and spoons", "Balloon décor", "Photo backdrop"],
  "back-to-school supply event": ["Additional backpacks", "Notebooks and folders", "Snack station", "School-themed décor", "Local sponsor support", "Family photo area"],
  "fall festival": ["Pumpkin decorating station", "Live acoustic music", "Hay-bale photo area", "Coffee or cocoa bar", "Kids activity station", "Event photographer"],
  "national coffee day": ["Mobile barista service", "Pastry assortment", "Alternative milks", "Custom branded cups", "Seasonal décor", "Resident coffee giveaway"],
  "halloween costume contest photo area": ["Professional photographer", "DJ and dance area", "Additional costume categories", "Fog or lighting effects", "Catered desserts as a vendor pass-through", "Premium balloon installation"],
  "pumpkin decorating fall hangout": ["Additional pumpkins", "Premium craft supplies", "Fall photo backdrop", "Coffee or cocoa station", "Resident prize package", "Event photographer"],
  "halloween dessert bar": ["Hot cocoa or coffee bar", "Custom dessert signage", "Premium backdrop", "Balloon installation", "Additional bakery items as a vendor pass-through", "Event photographer"],
  "hot cocoa bar": ["S'mores kit", "Hot cocoa bombs", "Cookie pairing bar", "Take-home mugs", "Seasonal photo backdrop", "Event attendant"]
};

var GENERAL_ADDON_PACKAGES = [
  { name: "Décor Refresh", price: "$295", detail: "5 ft organic balloon garland, custom full-color welcome sign" },
  { name: "Photo Corner", price: "$420", detail: "Premium photo backdrop, custom welcome sign" },
  { name: "Sweet Social", price: "$395", detail: "Ice cream social (50 servings), one lawn game set" },
  { name: "Game Day", price: "$550", detail: "Snow cone cart (50 servings), two lawn game sets, 5 ft balloon garland" }
];
