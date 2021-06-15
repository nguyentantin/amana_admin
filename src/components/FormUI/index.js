import { Input, Radio, Select, Checkbox, DatePicker, Switch } from 'antd'
import makeField from './makeField'

const RadioGroup = Radio.Group
const {TextArea} = Input
const {RangePicker} = DatePicker

const AInput = makeField(Input)
const ASwitch = makeField(Switch)
const ARadioGroup = makeField(RadioGroup)
const ASelect = makeField(Select)
const ACheckbox = makeField(Checkbox)
const ATextarea = makeField(TextArea)
const ARangePicker = makeField(RangePicker)
const ADatePicker = makeField(DatePicker)

export {
  AInput,
  ASwitch,
  ARadioGroup,
  ASelect,
  ACheckbox,
  ATextarea,
  ARangePicker,
  ADatePicker,
}
