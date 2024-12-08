function convertBlasterData() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("WeaponStats");
  var inputRange = sheet.getRange(1, 1);
  var inputValues = inputRange.getValues();
  var rawData = inputValues[0][0];
  const damage = "B";
  const ammo = "C";
  const rateOfFire = "D";
  const reload = "E";
  const burst = "F";
  const burstRate = "G";
  const explosiveDamage = "H";
  const dps = "I";

  var dataSets = rawData.split("/");
  for (index = 0; index < dataSets.length - 1; index++){
    var dataSet = dataSets[index].split(",");
    var currentRow = index + 3;//3 because data starts being written after row 2 and index starts at 0 so 2 + 1
    var dataRange = sheet.getRange(currentRow, 1, 1, dataSet.length);
    dataRange.setValues([dataSet]);
    
    //var column = columnToLetter(dataSet.length + 1)//get column of DPS cell
    var cell = sheet.getRange(dps + currentRow);//column letter + row # = cell
    cell.setFormula("=ROUND(DIVIDE(SUM(MULTIPLY(" + damage+currentRow + "," + ammo+currentRow + "),MULTIPLY(" + explosiveDamage+currentRow + "," + ammo+currentRow + ")),SUM(MULTIPLY(DIVIDE(" + ammo+currentRow + "," + burst+currentRow + ")," + rateOfFire+currentRow + "),MULTIPLY(" + burstRate+currentRow + "," + ammo+currentRow +  ")," + reload+currentRow + ")))");
  }
}
