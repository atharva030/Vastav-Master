const express=require('express')
var cors=require('cors')
const mongoose=require('mongoose');
const mongoURI="mongodb+srv://atharva030:P06ISmtPtJ9CCI13@vastavcluster.byz1aqf.mongodb.net/?retryWrites=true&w=majority"

const app = express()
const port = 5000 
const connectionParams={
  useNewUrlParser:true,
  useUnifiedTopology:true
}
app.use(cors())
app.use(express.json());
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
  
mongoose.connect(mongoURI,connectionParams).then(()=>{
    console.info("connected")
}).catch((error)=>{
    console.log("Error: ",error)
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})