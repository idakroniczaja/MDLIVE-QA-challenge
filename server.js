const e = require('express');
const { query } = require('express');
const express = require('express');
const app = express();

const data = require('./data')

app.get('/', (req, res) => {
res.redirect('/apps')
})

app.get('/apps', (req, res) => {
//destructuring req.query
  let {by, start, end, max, order} = req.query

//creating object with previously destructured query values 
 const range ={
     by:by,
     start:start,
     end:end, 
     max:parseInt(max), //originaly, it is string, in order to use it as number, I turned it in to No
     order:order
 }

//if max is omitted, it will be 50 by default
if(!max){
    range.max=50
}else range.max



let sortedByName = [...data].sort((a,b)=>a.name.localeCompare(b.name))
let sortedById = [...data].sort((a,b)=>a.id-b.id)


//to render sorted array on default parameters if no params are passed and to make by required, so if we pass other values from range object,
// the result will be always default array until we pass by param as id or name
if(typeof by==='undefined'){
    return res.json(sortedById.filter((e,i)=>i<50));
}else {
   let filteredArray;
   let finalArray

//pagination by name, if we pass by param as name
    if(range.by==='name'){
        //if start is omitted, start index is first elem in data
        if(!range.start){
            startIndex = 0 ;
         }else startIndex=sortedByName.findIndex(elem=>elem.name===range.start)
         //if end is omitted, end index is last elem in data 
    if(!range.end){
        endIndex = sortedByName.length-1;
    }else endIndex=sortedByName.findIndex(elem=>elem.name===range.end)
        filteredArray = sortedByName.slice(startIndex, endIndex+1)
        if(range.order==='desc'){
            finalArray = filteredArray.filter((e,i)=>i<range.max).sort((a,b)=>b.name.localeCompare(a.name))
            //this provides us with maximum results per search and if END value is outreaching MAX value, it will return results accounting max range
        }else finalArray = filteredArray.filter((e,i)=>i<range.max)

//paginagion by id, if we pass by param as id. Since id is number, we can directly apply filtering conditions on those
    } else {
        //if start is omitted, it will start with elem with id of 1
        if(!range.start){
            range.start = 1
        } else range.start = range.start

        //if end is omitted, it will go to the end of data
        if(!range.end){
            range.end = sortedById.length
        }else range.end === range.end

        filteredArray = [...sortedById].filter(app=>app.id >= parseInt(range.start) && app.id <= parseInt(range.end))

        if(range.order==='desc'){
            finalArray = filteredArray.filter((e,i)=>i<range.max).sort((a,b)=>b.id-a.id)
        }else finalArray = filteredArray.filter((e,i)=>i<range.max)
    }

    return  res.json(finalArray)
}

})

app.listen(process.env.PORT || 3000)