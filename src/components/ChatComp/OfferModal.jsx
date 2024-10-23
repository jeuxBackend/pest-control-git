import React, { useState } from 'react'
import { useMyContext } from '../../Context/Context';

function AddInspectorModal() {
    const { openOffer, setOpenOfferModal} = useMyContext();

    
    return (
        <div className='bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins'>
            <div className="flex items-center justify-center py-10 w-full min-h-screen ">
                <div className='bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2'>
                    <h1 className='xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] font-medium'>Create Order</h1>
                    <form  className='w-full p-6 flex flex-col gap-3'>
                        <div className='flex gap-3 lg:gap-8 lg:flex-row flex-col'>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>To</p>
                                <input type="text" placeholder='' className='w-full py-3 px-4 rounded-xl border shadow-sm'  />
                            </div>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>From</p>
                                <input type="text" placeholder='' className='w-full py-3 px-4 rounded-xl border shadow-sm'  />
                            </div>
                        </div>
                        <div className='flex gap-3 lg:gap-8 lg:flex-row flex-col'>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>Pest Type</p>
                                <select name="" id="" className='w-full py-3 px-4 rounded-xl border shadow-sm'>
                                    <option value="">Ants</option>
                                </select>
                            </div>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>Treatment Type</p>
                                <select name="" id="" className='w-full py-3 px-4 rounded-xl border shadow-sm'>
                                    <option value="">Pest Prevention</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex gap-3 lg:gap-8 lg:flex-row flex-col'>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>Required Session</p>
                                <select name="" id="" className='w-full py-3 px-4 rounded-xl border shadow-sm'>
                                    <option value="">4</option>
                                </select>
                            </div>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>Location</p>
                                <input type="text" placeholder='Enter Location' className='w-full py-3 px-4 rounded-xl border shadow-sm'  />
                            </div>
                        </div>
                        <div className='flex gap-3 lg:gap-8 lg:flex-row flex-col'>
                        <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>Time</p>
                                <input type="time" placeholder='' className='w-full py-3 px-4 rounded-xl border shadow-sm'  />
                            </div>
                            <div className='lg:w-[50%] w-[100%]'>
                                <p className='mb-1 font-medium'>Inspector</p>
                                <select name="" id="" className='w-full py-3 px-4 rounded-xl border shadow-sm'>
                                    <option value="">Esther Howard</option>
                                </select>
                            </div>
                        </div>
                        <div className='font-medium flex items-center justify-center gap-3 mt-3'>
                            <button type="reset" onClick={()=>setOpenOfferModal(false)} className='w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black'>
                                Cancel
                            </button>
                            <button  className='w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white'>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddInspectorModal