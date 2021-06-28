LANGUAGE USED: JavaScript with Node.js and Express

Explanations for specific lines of code are given in server.js as commented lines.

1. NO PARAMETERS PROVIDED:

- If no parameters are provided (if BY is undefined), data will be sorted by default parameters(by=id, order=asc, max=50)
  default endpoint https://mdliveqa.herokuapp.com/apps
- I filtered sortedById array by index of elements less than 50, which gives respond with array according to default params

2. BY PARAM IS REQUIRED:

- The previous response will appear until we pass by value of two permitted options 'id' or 'name' for by param, then we will get data sorted by name or by id
  endpoint        https://mdliveqa.herokuapp.com/apps?by=name
                  https://mdliveqa.herokuapp.com/apps?by=id
- Since by param is required, this is going to be response if we pass other params without by value
  endpoint        https://mdliveqa.herokuapp.com/apps?start=20 
            (it won't return array starting with 20 id or index, but default array, because by is required and only values permitted are 'id' and 'name')

3.  PAGINATION BY NAME or ID:

3.1 IF BOTH, START AND END PARAMS ARE PASSED
- I sliced sortedByName array defining startIndex as index of element which name is equal to start parameter and endIndex as index of element which name is equal to end parameter + 1(to include that last element)
  endpoint        https://mdliveqa.herokuapp.com/apps?by=name&start=my-app-003&end=my-app-010 
 (This endpoint will return data starting from 3rd element till the 10th, paginating by name)

- For pagination by id I used a bit different approach, since ids are numbers. Instead of slicing and using indexes of elements, I used filter() and filter array by ids being less or equal than start param and greater or equal with end values params provided.
endpoint                  https://mdliveqa.herokuapp.com/apps?by=id&start=3&end=10

        (This endpoint will return data starting from 3rd element till the 10th, paginating by id)

3.2 IF BOTH, START AND END PARAMS ARE OMITTED
- If, however, start is omitted, startIndex will be equal to first elements index(which is 0)
endpoint       https://mdliveqa.herokuapp.com/apps?by=id

3.3   IF END IS OMITTED
- In this case end is going to be equal to end of data, but it still returns results for max param(if not passed it is 50)
endpoint      https://mdliveqa.herokuapp.com/apps?by=id&start=3   
          (it returns data starting with 3rd element and default max of 50)
              https://mdliveqa.herokuapp.com/apps?by=id&start=3&max=20
          (if max is passed with start, it will return data from start value and only 20 results) 

3.4   THE MAX PAGE
- Final array is filtered by this param, so it returns this number of results
endpoing     https://mdliveqa.herokuapp.com/apps?by=id&start=3&max=20

- In case end extends beyond maximum passed, array will have only 20 elements
endpoint       https://mdliveqa.herokuapp.com/apps?by=id&start=3&end=50&max=20

- If start or end values are not passed, the array will have as many elements as we pass in max param, starting with first elem
endpoint        https://mdliveqa.herokuapp.com/apps?by=id&max=36

3.5 THE ORDER OF DATA
- If we want response to be asc or desc order, i sorted filteredArrays dependint on value of order.

endpoint      https://mdliveqa.herokuapp.com/apps?by=name&order=desc
            (if just order with no other params are passed, it will give us data orderd asc or desc depenting on id or name)

              https://mdliveqa.herokuapp.com/apps?by=id&start=3&order=desc
              (if start is passed it will give us data starting from that element but in the last place, bc we requested descending order)


