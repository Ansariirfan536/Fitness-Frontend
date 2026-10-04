let arrs=[1,2,3,4,5,6];
// let print=function(el){
//     console.log(el);

// }
// // print(arr);
// arr.forEach(print)

// let even=arrs.filter((el)=>(el%2==0))


// const students={
//     name:"irfan",
//     email:"irfan@gmail.com",
//     subject:"CSE"
// }
// let studentCopy={...students,id:"1234As5"}
// console.log(studentCopy);

// let names=["a","b","c","d"];
// let[first,seceond,...others]=names;
// console.log(store)


// let info={
//     name:"irfan",
//     roll:82,
//     pass:"123",
//     username:"ansari",
//     id:"1AsaScX"
// }
// let {username,id,name,pass}=info;
// console.log(username); // Output: "ansari"
// console.log(id); 
// console.log(name)



// h1=document.querySelector("h1")

// function changeColor(color,delay,nextColor){
//     setTimeout(()=>{
    
//             h1.style.color = color;
    
//     if(nextColor)nextColor()
//     },delay)
// }
// changeColor("red",1000,()=>{
//     changeColor("blue",1000,()=>{
//         changeColor("green",1000,()=>{
//             changeColor("pink",4000,()=>{
//                 changeColor("brown",1000)
//             })
//         })
//     })
// })




function saveToDB(data){
    return new Promise((resolve,rejected)=>{
        let internetSpeed=Math.floor(Math.random()*10)+1;
        if(internetSpeed>5){
            resolve("Saved to database")
        }else{
            rejected("Weak Connections")
        }
    })
}
saveToDB("apna college")
//////////Promise chainging hell

// .then(()=>{
//     console.log("Data1 saved:Request Accept")
//     saveToDB("Irfan")
//     .then(()=>{
//         console.log("Data2 saved:Request Accept")
//         saveToDB("IIMT DB")
//         .then(()=>{
//             console.log("Data3 saved:Request Accept")
//         })
//     })
    
// })
.then(()=>{
     console.log("Data1 saved:Request Accept")
  return   saveToDB("Irfan")
})
.then(()=>{
     console.log("Data2 saved:Request Accept")
  return   saveToDB("Apna college")
})
.then(()=>{
     console.log("Data3 saved:Request Accept")
  
})

.catch(()=>{
    console.log("Request rejected")
})