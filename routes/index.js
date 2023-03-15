var express = require('express');
var router = express.Router();
const axios = require('axios');

const client = axios.create({
  headers: {
    'Authorization': 'Bearer ' + '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'
  }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json( { title: 'Express' });
});

router.post('/textCompletion',async (req,res)=>{
  try {
    const {body}= req
    
    let result=await callOpenAi(body.content)
    res.status(200).json({message:result.choices[0].text})
  } catch (error) {
    console.log(error,"error");
  }



})

router.post('/grammerCheck',async (req,res)=>{
  try {
    const {body}= req
    console.log(body.content,"bodyyyyy");
    let str= `Correct this to standard English:\n\n`
    
    let result=await callOpenAi(`${str}${body.content}`)
    console.log(result.choices[0].text,"result");
    res.status(200).json({message:result.choices[0].text})
  } catch (error) {
    console.log(error,"error");
  }



})

router.post('/textContentBetter',async (req,res)=>{
  try {
    const {body}= req
    console.log(body.content,"bodyyyyy content better");
    let str1= `Can you reword this for a post with emoji and all:\n\n`
    
    let result=await callOpenAi(`${str1}${body.content}`)
    console.log(result.choices[0].text,"result");
    res.status(200).json({message:result.choices[0].text})
  } catch (error) {
    console.log(error,"error");
  }



})

async function callOpenAi(body) {
  try {
    const params = {
      "prompt": body||"Human" ,
      "max_tokens": 100
    }
    
   let query= await client.post('https://api.openai.com/v1/engines/text-davinci-003/completions', params)
   return query.data
  } catch (error) {
    console.log(error,"error");
  }


  
}

module.exports = router;
