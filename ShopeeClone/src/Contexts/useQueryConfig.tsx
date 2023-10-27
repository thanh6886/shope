import { isUndefined, omitBy } from 'lodash'
import React from 'react'
import useQueryParams from 'src/hooks/useQueryParams'
import { QueryConfig } from 'src/types/product.type'

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      sort_by: queryParams.sort_by,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category,
      exclude: queryParams.exclude
    },
    isUndefined
  )
  return queryConfig
}
