import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Schema, schema } from 'src/Component/Ruler/Ruler'
import useQueryConfig from 'src/Contexts/useQueryConfig'
import path from 'src/const/path'

export default function useSeachProduct() {
  const queryConfig = useQueryConfig()

  type FormData = Pick<Schema, 'name'>
  const nameSchema = schema.pick(['name'])

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  const handleSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { handleSearch, register }
}
