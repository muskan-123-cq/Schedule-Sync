let arr=[1,2,3, 4, 5, 6];
let arr2=[];
function customMap(arr,fun){
for(let i=0;i<arr.length;i++){
   arr2[i] = fun(arr[i]);
}
return arr2;
}



function fun(item){
return (item*item);
}
let final=[];
final=customMap(arr,fun);
// console.log(final);
console.log(final);
console.log(arr);