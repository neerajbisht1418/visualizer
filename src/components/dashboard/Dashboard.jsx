import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";



const DashboardComponent = () => {
    const dashboardData = [{
        title: "Uploaded Fabrics",
        icon: "/dashboard_upload.png",
        value: 20
    },
    {
        title: "Generated Images",
        icon: "/dashboard_images.png",
        value: 15
    },
    {
        title: "Purchased credits",
        icon: "/dashboard_purchase.png",
        value: 10
    },
    {
        title: "Remaining credits",
        icon: "/dashboard_time.png",
        value: 10
    }]
    return (
        <div className=''>
            <div className='px-[1rem] md:px-[3.125rem] pt-[2rem] md:pt-[3.125rem] flex flex-col gap-[2rem] md:gap-[3.125rem]'>
                <h1 className='text-secondary text-[2rem] font-[600]'>Dashboard</h1>
                <div className='flex flex-wrap gap-[1.5rem] w-full'>
                    {
                        dashboardData.map((item, i) => (
                            <div className='w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.15rem)] bg-[white] rounded-[0.5rem] p-[1rem_1.875rem] border border-[#E1D9E9] shadow-md'>
                                <div className='flex flex-col gap-[0.625rem]'>
                                    <p className='text-[1rem] text-primary font-[500] leading-[1.2rem]'>{item.title}</p>
                                    <div className='flex gap-[1.125rem] items-center'>
                                        <div className='h-[4.5rem] w-[4.5rem] rounded-full bg-[#92278F4D] flex justify-center items-center'>
                                            <img className={i === 0 || i === 2 ? "h-[3rem] w-[3rem]" : 'h-[2.5rem] w-[2.5rem]'} src={item.icon} />
                                        </div>
                                        <p className='text-[3rem] text-secondary font-[700] leading-[3.45rem]'>
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className='w-full lg:w-[calc(50%-0.75rem)] bg-[white] rounded-[0.5rem] p-[1.563rem_1.875rem] shadow-md'>
                        <div className='flex flex-col gap-[1.5rem]'>
                            <h1 className='text-secondary text-[2rem] leading-[2.4rem] font-[600]'>Uploaded Fabric</h1>
                            <div className='w-full flex gap-[1rem] flex-wrap'>
                                {Array.from(Array(10).keys()).map((item) => (
                                    <div className='w-[calc(50%-0.8rem)] sm:w-[calc((100%/3)-0.8rem)] md:w-[calc(25%-0.8rem)] lg:w-[calc(20%-0.8rem)] relative border border-[#E1D9E9]'>
                                        <img className='h-[10rem] sm:h-[10rem] md:h-[6rem] lg:h-[7rem] w-full object-cover' src='/shirt_textures/2.jpg' />
                                        <button className='absolute top-[0.5rem] right-[0.5rem] h-[1.5rem] w-[1.5rem] bg-primary rounded-full flex justify-center items-center'>
                                            <HiOutlineDotsVertical size={17} color='white' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center'>
                                <button className='btn-outline font-[500] border-[0.063rem] rounded-[0.5rem]'>Show More</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[calc(50%-0.75rem)] bg-[white] rounded-[0.5rem] p-[1.563rem_1.875rem] shadow-md'>
                        <div className='flex flex-col gap-[1.5rem]'>
                            <h1 className='text-secondary text-[2rem] leading-[2.4rem] font-[600]'>Generated Image</h1>
                            <div className='w-full flex gap-[1rem] flex-wrap'>
                                {Array.from(Array(10).keys()).map((item) => (
                                    <div className='w-[calc(50%-0.8rem)] sm:w-[calc((100%/3)-0.8rem)] md:w-[calc(25%-0.8rem)] lg:w-[calc(20%-0.8rem)] relative border border-[#E1D9E9]'>
                                        <img className='h-[10rem] sm:h-[10rem] md:h-[6rem] lg:h-[7rem] w-full object-cover' src='/shirt_textures/3.jpg' />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center'>
                                <button className='btn-outline font-[500] border-[0.063rem] rounded-[0.5rem]'>Show More</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border-[0.125rem] border-[white] rounded-[1.25rem] bg-[url("/dashboard_last_section_bg.png")] h-full bg-cover shadow-[0rem_0rem_0.313rem_0rem_#8C2A8D80]'>
                        <div className='flex  justify-between'>
                            <div className='flex flex-col items-center md:items-start gap-[2.25rem] p-[3.125rem] pb-[3.625rem] w-full'>
                                <p className='text-center md:text-start text-white text-[2.5rem] leading-[2.75rem] font-[700]'>Visualize Your Fabric Now</p>
                                <button className='p-[0.75rem_1.375rem] bg-primary border border-[white] w-fit rounded-[0.5rem] text-[white] text-[1rem] font-[700] leading-[1.2rem]'>Visualizer Now</button>
                            </div>
                            <div className='hidden md:flex mr-[3.125rem]'>
                                <img className='h-full w-full object-cover' src="/dashboard_last_section_right.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent