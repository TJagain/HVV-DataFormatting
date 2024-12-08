function setCellData(sheet, rowIndex, columnIndex, data){
  var dataRange = sheet.getRange(rowIndex, columnIndex, 1, 1);
  var convertedData = [[data]];
  dataRange.setValues(convertedData);
}

function columnToLetter(columnIndex){
  var temp, letter = '';
  while (columnIndex > 0){
    temp = (columnIndex - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    columnIndex = (columnIndex - temp - 1) / 26;
  }
  return letter;
}

function getTableCount(table){
  var count = 0;
  
  for (var key in table){
    if (table.hasOwnProperty(key)){
      count++;
    }
  }  
  
  return count;
}

function convertCharacterData() {
 // const characterOffset = 8;
  const equipOffset = 3;
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("CharacterBuildSheet");
  var inputRange = sheet.getRange(1, 1);
  var inputValues = inputRange.getValues();
  var rawData = inputValues[0][0];
  var data = JSON.parse(rawData);
  
  var isFirstTeam = true;
  var equipTotal = 0;
  var rowOffset = 0;
  var maxEquipCount = 0;
  for (var team in data){
    if (data.hasOwnProperty(team)){
      if (isFirstTeam){
        setCellData(sheet, 2, 1, team);
      }else {
        rowOffset = maxEquipCount + 4;
        setCellData(sheet, rowOffset + 2, 1, team);
      }
      
      var teamData = data[team];
      for (var character in teamData){
        if (teamData.hasOwnProperty(character)){
          setCellData(sheet, rowOffset + 3, (equipTotal * equipOffset) + 1, character);
          
          var equipData = teamData[character];
          for (var equipType in equipData){
            if (equipData.hasOwnProperty(equipType)){
              var equipCount = 0;
              var columnIndex = (equipTotal * equipOffset) + 1;
              var column = columnToLetter(columnIndex + 1);
              var ratesColumn = columnToLetter(columnIndex + 2);
              setCellData(sheet, rowOffset + 4, columnIndex, equipType);
              
              var equipList = equipData[equipType];
              var totalEquipCount = getTableCount(equipList);
              var finalRow = totalEquipCount + rowOffset + 5;
              for (var equipName in equipList){
                if (equipList.hasOwnProperty(equipName)){
                  var equipAmount = equipList[equipName];
                  var currentRow = rowOffset + 5 + equipCount;
                  var equipRange = sheet.getRange(currentRow, columnIndex, 1, 2);
                  var equipValues = [[equipName, equipAmount]];
                  equipRange.setValues(equipValues);
                  
                  var cell = sheet.getRange(ratesColumn + currentRow);
                  cell.setFormula("=ROUND(DIVIDE(" + column + currentRow + ", " + column + finalRow + "), 2)");//CONCATENATE(, \"%\")
                  equipCount++;
                }
              }
              if (equipCount > maxEquipCount){
                maxEquipCount = equipCount;
              }
              equipTotal++;
              
              var dataRange = sheet.getRange(finalRow, columnIndex, 1, 2);
              var finalValues = [["Total", 0]];
              dataRange.setValues(finalValues);
              var cell = sheet.getRange(column + finalRow);
              cell.setFormula("=SUM(" + column + (rowOffset + 5) + ":" + column + (finalRow - 1) + ")");
            }
          }
        }
      }
      isFirstTeam = false;
      equipTotal = 0;
    }
  }
  

  /*var dataTypes = rawData.split("/");
  for (index = 0; index < dataTypes.length - 1; index++){
    
  }*/
  
}
