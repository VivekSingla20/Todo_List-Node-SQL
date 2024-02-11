function findArrayLength(arr){
  let i=0;
  while(arr[i]!=undefined)
  {
    i++;
  }
    return i;
};

module.exports=findArrayLength;