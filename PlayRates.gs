function columnToLetter(columnIndex){
  var temp, letter = '';
  while (columnIndex > 0){
    temp = (columnIndex - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    columnIndex = (columnIndex - temp - 1) / 26;
  }
  return letter;
}

function convertRateData() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("PlayRateSheet");
  var inputRange = sheet.getRange(1, 1);
  var inputValues = inputRange.getValues();
  var rawData = inputValues[0][0];
  
  var dataTypes = rawData.split("/");
  for (index = 0; index < dataTypes.length - 1; index++){
    var dataSets = dataTypes[index].split(",");
    var columnIndex = (index * 3) + 1;
    var column = columnToLetter(columnIndex + 1);
    var ratesColumn = columnToLetter(columnIndex + 2);
    var finalRow = dataSets.length + 2;
    for (index2 = 0; index2 < dataSets.length - 1; index2++){
      var dataSet = dataSets[index2].split(":");
      var currentRow = index2 + 3;//3 because data starts being written after row 2 and index2 starts at 0 so 2 + 1
      var dataRange = sheet.getRange(currentRow, columnIndex, 1, 2);
      dataRange.setValues([dataSet]);
      
      var cell = sheet.getRange(ratesColumn + currentRow);
      cell.setFormula("=ROUND(DIVIDE(" + column + currentRow + ", " + column + finalRow + "), 2)");//CONCATENATE(, \"%\")
    }
    //finalRow += 1;
    //sheet.sort(columnIndex);
    //var formatRange = sheet.getRange(finalRow, columnIndex, 1, 1);
    //var bold = SpreadsheetApp.newTextStyle().setBold(true);
    //formatRange.setTextStyle(bold);
    var dataRange = sheet.getRange(finalRow, columnIndex, 1, 2);
    var finalValues = [["Total", 0]];
    dataRange.setValues(finalValues);
    var cell = sheet.getRange(column + finalRow);
    cell.setFormula("=SUM(" + column + "3:" + column + (finalRow - 1) + ")");
    
    //var rates = sheet.getRange(3, columnIndex + 2, finalRow - 1, 1);
    //rate.setFormula("=DIVIDE(" + column + finalRow + ", " + column + ")");
  }
}
