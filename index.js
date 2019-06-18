import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send('property pro lite');
})

app.listen(PORT,()=>console.log(`listening on port ${PORT}...`))