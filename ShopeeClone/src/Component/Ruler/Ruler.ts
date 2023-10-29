import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { type } from 'os'
type Rules = { [key in 'email' | 'password' | 'password_Confing']?: RegisterOptions }

export const getRules = (getValues: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  password_Confing: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate: (v) => v === getValues('password') || 'PASS không khớp'
  }
})

export const schema = yup.object({
  email: yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
  password: yup.string().required('password là bắt bộc').min(6, 'độ dài từ 6-12 ký tự').max(12, 'độ dài từ 6-12 ký tự'),
  password_Confing: yup
    .string()
    .required('nhập lại password là bắt bộc')
    .min(6, 'độ dài từ 6-12 ký tự ')
    .max(12, 'độ dài từ 6-12 ký tự')
    .oneOf([yup.ref('password')], 'password không khớp'), //ref tham chiếu đến value của password oneOf cho giá trị === value(password)

  name: yup.string().trim().required('tên sản phẩm là bắt buộc')
})

export const login = schema.omit(['password_Confing', 'name'])
export const _register = schema.omit(['name'])

export type LoginSchema = yup.InferType<typeof login>

export type RegisterSchema = yup.InferType<typeof _register>
export type Schema = yup.InferType<typeof schema>
