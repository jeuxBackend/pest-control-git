import React from 'react'
import { useMyContext } from '../../Context/Context'

function CreateInvoice() {
    const{invoice, setInvoice}=useMyContext()
  return (
    <div className='absolute z-40 bg-black/50 w-full backdrop-blur-sm min-h-[100vh]'>
    <div className='bg-[#f6f0e4] rounded-xl w-[80%] sm:w-[35rem] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-6 flex flex-col items-center justify-center gap-2'>
        <div className='flex  flex-col w-full'>
           <p className='text-[1.1rem] font-medium'>Name</p>
           <input type="text" name="" id="" className='border-2 p-2
        3 rounded-2xl' placeholder='Enter Name..'/>
        </div>
       
        <div className='flex  flex-col w-full'>
           <p className='text-[1.1rem] font-medium'>Amount</p>
           <input type="text" name="" id="" className='border-2 p-2
        3 rounded-2xl' placeholder='Enter Amount..'/>
        </div>
        <div className='flex  flex-col w-full'>
           <p className='text-[1.1rem] font-medium'>Description</p>
           <textarea rows={5} type="text" name="" id="" className='border-2 p-2
        3 rounded-2xl' placeholder='Enter Description..'/>
        </div>
        
        

        <div className='font-medium flex items-center justify-center gap-3 w-full flex-wrap'>
            <button onClick={()=>setInvoice(false)} className='w-[11rem] py-3 rounded-full bg-white'>Cancel</button>
            <button to='/' onClick={()=>setInvoice(false)} className='px-3 py-3 text-center rounded-full bg-[#642329] text-white w-[11rem]'>Submit</button>
        </div>


    </div>
</div>
  )
}

export default CreateInvoice