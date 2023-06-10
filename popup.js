const submitButton = document.getElementById("importData");
const dataField = document.getElementById("dataField");
const modifierField = document.getElementById("modifier");

chrome.storage.sync.get("highlightMasterData").then((val) => {
  if (val.highlightMasterData) {
    dataField.value = val.highlightMasterData.reference;
    modifierField.value = val.highlightMasterData.modifier;
  }
});

document.getElementById("importData").onclick = importData;
function importData() {
  if (dataField && modifierField) {
    chrome.storage.sync
      .set({
        highlightMasterData: {
          reference: dataField.value,
          modifier: modifierField.value,
        },
      })
      .then(() => alert("Data has been imported."))
      .catch(() => alert("Error while trying to import the data."));
  }
}
