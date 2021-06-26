const e = require('express');
const { query } = require('express');
const express = require('express');
const app = express();

const data = require('./data')





app.get('/apps', (req, res) => {
  let {by, start, end, max, order} = req.query

//to establish value of by as only permited values 'id' and 'name', and as required and default value is 'id' if no by value is passed
  by = (typeof by!== 'undefined' && by!=="" && (by==='id' || by === 'name')) ?  by : 'id'

//to establish orders only possible values and default value if no value is passed
  order =(order ==='asc' || order==='desc')? order: 'asc'

//to determine pagination on 'id' or 'name'




 const range ={
     by:by,
     start:start,
     end:end, 
     max:parseInt(max), //maximum length of array
     order:order
 }


if(!max){
    range.max=50
}else range.max



let sortedByName = [...data].sort((a,b)=>a.name.localeCompare(b.name))
let sortedById = [...data].sort((a,b)=>a.id-b.id)


//to render sorted array if no params are passed by default value of by

if(!start && !end && !max){
    if(range.by==='name'){
        return res.json(sortedByName.filter((e,i)=>i<range.max))
    }else return res.json(sortedById.filter((e,i)=>i<range.max))
     
}else {
   let filteredArray;
   let finalArray
 

//pagination by name
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
        }else finalArray = filteredArray.filter((e,i)=>i<range.max)

//paginagion by id
    } else {
        //if start is omitted
        if(!range.start){
            range.start = 0
        } else range.start = range.start

        //if end is omitted
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

app.listen(3000)