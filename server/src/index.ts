import  express  from 'express';
import { user } from './Routes/User';



const app = express()

app.use('/user',user)

app.listen(3000,()=>{
    console.log("listening at 3000");
    
})