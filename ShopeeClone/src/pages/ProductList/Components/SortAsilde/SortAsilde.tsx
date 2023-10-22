export default function SortAsilde() {
  return (
    <div className='bg-gray-400/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button className='bg-orange text-white text-center h-8 px-4 capitalizes hover:bg-orange/70 hover:text-black'>
            Phổ biến
          </button>
          <button className='bg-white text-black text-center h-8 px-4 capitalizes hover:bg-slate-100'>Mới nhất</button>
          <button className='bg-white text-black text-center h-8 px-4 capitalizes hover:bg-slate-100'>Bán chạy</button>
          <select className='h-8 px-4 bg-white text-black  hover:bg-slate-100 text-left outline-none' defaultValue=''>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cáo</option>
            <option value='price:desc'>Giá: Cáo đến thấp</option>
          </select>
        </div>
        <div className='flex item-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm  rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
