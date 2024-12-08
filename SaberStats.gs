function convertSaberData() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("WeaponStats");
  var inputRange = sheet.getRange(1, 11);
  var inputValues = inputRange.getValues();
  var rawData = inputValues[0][0];
  const columnOffset = 11;//because saber stats are shown 8 columns to the right
  const normalDamage = "L";
  const comboDamage = "M";
  const swing1Speed = "N";
  const swing1Length = "O";
  const swing2Speed = "P";
  const swing2Length = "Q";
  const swing3Speed = "R";
  const swing3Length = "S";
  const dps = "T";

  var dataSets = rawData.split("/");
  for (index = 0; index < dataSets.length - 1; index++){
    var dataSet = dataSets[index].split(",");
    var currentRow = index + 3;//3 because data starts being written after row 2 and index starts at 0 so 2 + 1
    var dataRange = sheet.getRange(currentRow, columnOffset, 1, dataSet.length);
    dataRange.setValues([dataSet]);
    
    //var column = columnToLetter(dataSet.length + 1)//get column of DPS cell
    var cell = sheet.getRange(dps + currentRow);//column letter + row # = cell
    cell.setFormula("=ROUND(DIVIDE(SUM(MULTIPLY("+ normalDamage+currentRow +",2),"+ comboDamage+currentRow +"), SUM(DIVIDE(" + swing1Speed+currentRow + "," + swing1Length+currentRow + "), DIVIDE(" + swing2Speed+currentRow + "," + swing2Length+currentRow + "), DIVIDE(" + swing3Speed+currentRow + "," + swing3Length+currentRow + "))))");
  }
  //=DIVIDE(SUM(MULTIPLY(B7, 2), C7), SUM(MULTIPLY(D7, E7), MULTIPLY(F7, G7), MULTIPLY(H7, I7)))
}
