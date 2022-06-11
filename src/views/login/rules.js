import i18n from '@/i18n'

export const validatePassword = () => {
  return (rule, value, callback) => {
    console.log(value)
    if (value.length < 6) {
      callback(new Error(i18n.global.t('message.login.passwordRule')))
    } else {
      callback()
    }
  }
}
