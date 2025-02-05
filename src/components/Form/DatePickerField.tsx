import React from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'


const DatePickerField = (props: any) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props)

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val:any) => {
        setFieldValue(field.name, val)
      }}
    />
  )
}


export default DatePickerField