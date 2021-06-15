import Notify from 'toastr'
import { trans } from '../i18n'

const options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  preventDuplicates: true,
  onclick: null,
  hideDuration: 0,
  showDuration: 300,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  tapToDismiss: false
}

Notify.options = options

const success = (msg, customOptions = {}) => {
  if (customOptions) Notify.options = Object.assign(options, customOptions)

  return Notify['success'](msg, trans('success'))
}

const error = (msg, customOptions = {}) => {
  if (customOptions) Notify.options = Object.assign(options, customOptions)

  return Notify['error'](msg, trans('failure'))
}

const warning = (msg, customOptions = {}) => {
  if (customOptions) Notify.options = Object.assign(options, customOptions)

  return Notify['warning'](msg, trans('warning'))
}

export { success, error, warning }
