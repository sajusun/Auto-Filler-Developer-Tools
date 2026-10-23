chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "devfill-fill-all",
    title: "⚡ DevFill: Fill Entire Form (Alt+Shift+F)",
    contexts: ["editable", "page"]
  }), chrome.contextMenus.create({
    id: "devfill-separator",
    type: "separator",
    contexts: ["editable"]
  });
  const l = [
    { id: "devfill-single-name", category: "full_name", title: "👤 Fill with Full Name" },
    { id: "devfill-single-email", category: "email", title: "✉️ Fill with Test Email" },
    { id: "devfill-single-phone", category: "phone", title: "📞 Fill with Phone Number" },
    { id: "devfill-single-password", category: "password", title: "🔑 Fill with Test Password" },
    { id: "devfill-single-company", category: "company", title: "🏢 Fill with Company" },
    { id: "devfill-single-address", category: "address", title: "📍 Fill with Street Address" },
    { id: "devfill-single-uuid", category: "uuid", title: "🏷️ Fill with UUID / Token" }
  ];
  for (const e of l)
    chrome.contextMenus.create({
      id: e.id,
      title: e.title,
      contexts: ["editable"]
    });
  chrome.contextMenus.create({
    id: "devfill-clear-all",
    title: "🧹 DevFill: Clear Form (Alt+Shift+C)",
    contexts: ["editable", "page"]
  });
});
chrome.contextMenus.onClicked.addListener((l, e) => {
  if (!e || !e.id) return;
  if (l.menuItemId === "devfill-fill-all") {
    chrome.tabs.sendMessage(e.id, { type: "FILL_ALL" });
    return;
  }
  if (l.menuItemId === "devfill-clear-all") {
    chrome.tabs.sendMessage(e.id, { type: "CLEAR_ALL" });
    return;
  }
  const i = {
    "devfill-single-name": "full_name",
    "devfill-single-email": "email",
    "devfill-single-phone": "phone",
    "devfill-single-password": "password",
    "devfill-single-company": "company",
    "devfill-single-address": "address",
    "devfill-single-uuid": "uuid"
  }[l.menuItemId];
  i && chrome.tabs.sendMessage(e.id, {
    type: "FILL_SINGLE",
    category: i
  });
});
chrome.commands.onCommand.addListener((l, e) => {
  !e || !e.id || (l === "fill_form" ? chrome.tabs.sendMessage(e.id, { type: "FILL_ALL" }) : l === "clear_form" && chrome.tabs.sendMessage(e.id, { type: "CLEAR_ALL" }));
});
