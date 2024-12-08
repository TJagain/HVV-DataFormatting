function clearSheet() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("CharacterBuildSheet");
  sheet.clear();
}
