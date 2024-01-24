import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { type } from 'os'
type Rules = { [key in 'email' | 'password' | 'password_Confing']?: RegisterOptions }

const checkPassWord = (refString: string) => {
  return yup
    .string()
    .required('nhập lại password là bắt bộc')
    .min(6, 'độ dài từ 6-12 ký tự ')
    .max(12, 'độ dài từ 6-12 ký tự')
    .oneOf([yup.ref(refString)], 'nhập lại password không khớp')
  //ref tham chiếu đến value của password oneOf cho giá trị === value(password))
}

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
  password_Confing: checkPassWord('password'),

  name: yup.string().trim().required('tên sản phẩm là bắt buộc')
})

export const schemaUser = yup.object({
  name: yup.string().max(160, 'độ dài tối đa 160 ký tự'),
  phone: yup.string().max(20, 'độ  dài tối da 20 ký tự'),
  address: yup.string().max(160, 'độ dài tối đa 160 ký tự'),
  avatar: yup.string().max(1000),
  date_of_birth: yup.date().max(new Date(), 'chọn ngày tháng năm'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  password_Confing: checkPassWord('new_password') as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>
})

export const login = schema.omit(['password_Confing', 'name'])
export const _register = schema.omit(['name'])
export const profileShema = schemaUser.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
export const newPasswordSchema = schemaUser.pick(['password', 'new_password', 'password_Confing'])
export type LoginSchema = yup.InferType<typeof login>

export type RegisterSchema = yup.InferType<typeof _register>
export type Schema = yup.InferType<typeof schema>

export type Schema_User = yup.InferType<typeof schemaUser>
