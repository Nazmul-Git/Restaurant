import React from 'react'

export default function BannerMain() {
  return (
    <div className='h-[964px] w-[1920px] bg-[#880808] relative overflow-hidden'>
        <div className='bg-[#A52A2A] border-0 rounded-full w-[1079px] h-[1079px] absolute left-[-156.98px] top-[-360px] rotate-[-14.55]'></div>
        <div className='bg-[#A52A2A] border-0 rounded-full w-[1312.52px] h-[1282.4px] left-[1534.2px] top-[300.96px] absolute rotate-[-52]'></div>
        <div className='flex'>
            <div className='w-[211px] h-[48px] top-[51px] left-[65px] absolute text-white'>Restaurant</div>
        <div>
            <input type="search" placeholder='Search...' className='w-[821px] h-[61px] top-[50px] left-[1039px] bg-[#FFFFFF] absolute rounded-b-md'/>
        </div>
        </div>
    </div>
  )
}
