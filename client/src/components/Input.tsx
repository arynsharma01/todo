interface props{
    label : string
    placeholder : string
    valueFnx : ()=>void 
}
export default function Input({label,placeholder,valueFnx}:props){
    return(

        <div className="flex flex-col pt-3 pl-5">
            <div className="text-3xl font-semibold py-2">
                {label}
            </div>
            <div >
                <input onChange={()=>{
                    valueFnx()
                }} className="w-[350px] h-12 bg-slate-300 p-2" type="text" placeholder={placeholder} />
            </div>
        </div>
    )
}