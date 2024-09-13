import  express  from 'express';
import { user } from './Routes/User';
import { todoRouter } from './Routes/Todo';



const app = express()

app.use('/user',user)
app.use('/todo',todoRouter)

app.listen(3000,()=>{
    console.log("listening at 3000");
    
})
