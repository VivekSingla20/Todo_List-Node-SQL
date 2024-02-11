function findArrayLength(arr){
  let i=0;
  while(arr[i]!=undefined)
  {
    i++;
  }
    return i;
};

function parseDbObject(resultArray){
  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i].isCompleted === 0) resultArray[i].isCompleted = false;
    else resultArray[i].isCompleted = true;
  }
  return resultArray;
}

module.exports={
  findArrayLength:findArrayLength,
  parseDbObject:parseDbObject
};