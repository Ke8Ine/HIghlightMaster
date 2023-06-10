chrome.contextMenus.create({
  id: "search",
  title: "Highlight Search",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId === "search") {
    chrome.storage.sync.get("highlightMasterData", (value) => {
      var results = [];
      if (value.highlightMasterData) {
        let searches = value.highlightMasterData.reference.split(
          data.selectionText
        );
        searches.shift();
        searches.forEach((z) => {
          let search = z.split(value.highlightMasterData.modifier || "\n>");
          if (search[1]) results.push(search[1].split("\n")[0]);
        });
      }
      chrome.notifications.create("Result", {
        type: "basic",
        iconUrl: "assets/icon48.png",
        title: results.length + " found.",
        message:
          results.length > 0
            ? results.map((z, i) => `${i + 1}:` + z).join("\n")
            : "No data was imported for reference.",
      });
      chrome.notifications.clear("Result");
    });
  }
});
