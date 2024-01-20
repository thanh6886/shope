import { map, range } from 'lodash'
import React, { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessenger?: string
}

export default function DateSelect({ onChange, value, errorMessenger }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const hanldeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate), onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }
  return (
    <div className='mt-2 flex flex-wrap'>
      <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
      <div className='w-[80%] pl-5 '>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] rounded-sm border border-black cursor-pointer hover:border-orange'
            onChange={hanldeChange}
            name='day'
            value={value?.getDate() || date.day}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((index) => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              )
            })}
          </select>
          <select
            className='h-10 w-[32%] rounded-sm border border-black cursor-pointer hover:border-orange'
            onChange={hanldeChange}
            name='month'
            value={value?.getMonth() || date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 11).map((index) => {
              return (
                <option key={index} value={index}>
                  {index + 1}
                </option>
              )
            })}
          </select>
          <select
            className='h-10 w-[32%] rounded-sm border border-black cursor-pointer hover:border-orange'
            onChange={hanldeChange}
            name='year'
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Năm</option>
            {range(1990, 2025).map((index) => {
              return (
                <option key={index} value={index}>
                  {index}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
}
