interface props {
    submit : string
    onClickfnx : () => void 
}

export default function Button({submit,onClickfnx} : props){
    return (
        <div className="flex flex-col justify-center items-center">
        <button className="bg-blue-700 font-light text-gray-400 my-4 h-12 w-24 rounded-xl p-2" onClick={()=>{
            onClickfnx();
        }} > {submit} </button>
        
        </div>
    )
}