export type ItemRegistrationRequest = {
  title: string
  quantity?: number
  unit?: string
  category?: string
  state?: string
  place?: string
  etc?: string
  group_tag?: string
  user_group?: string
  code?: string
  item_image?: string
  stocktake_attributes?: {
    checked_at?: string
  }
  optional_attributes?: [name?: string, value?: string]
  quantity_management_attributes?: {
    order_point_quantity?: number
  }
  inventory_history?: {
    memo?: string
  }
  is_quantity_auto_conversion_by_unit?: string
  quantity_auto_conversion_by_unit_name?: string
  quantity_auto_conversion_by_unit_factor?: string
}
