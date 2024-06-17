export enum FieldType {
  LETTERS = 'letters',
  NUMBERS = 'numbers',
  CEP = 'cep',
  CPF = 'cpf',
  CNPJ = 'cnpj',
  CELLPHONE = 'cellphone',
  LANDLINE = 'landline',
  CORPORATE_NAME = 'corporateName',
  CONTACT_NAME = 'contactName',
  EMAIL = 'email',
  DECIMAL = 'decimal',
  LATLONG = 'latlong',
}

const maskLatLong = (value: string) =>
  value
    .replace(/[^-0-9.,]+/g, '')
    .replace(/,/g, '.')
    .replace(/\./g, (char, index, text) => (text.indexOf(char) === index ? char : ''))
    .replace(/-/g, (char, index) => (index === 0 ? char : ''))

const maskOnlyLetters = (value: string) => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '')
}

const maskOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, '')
}

const maskCep = (value: string) => value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2')

const maskCPF = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

const maskCNPJ = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

const maskCellPhone = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1')

const maskLandline = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1')

export const maskDecimal = (value: string) => {
  value = value.replace(/\D/g, '')

  return value.replace(/(\d*)(\d{2})/g, value.length > 2 ? '$1,$2' : '$2')
}

export const maskDecimal3 = (value: string) => {
  value = value.replace(/\D/g, '')

  return value.replace(/(\d*)(\d{3})/g, value.length > 3 ? '$1,$2' : '$2')
}

export const unmaskDecimal = (value: string) =>
  Number(value.replace(/([.])+/g, '').replace(',', '.'))

// toLowerCase() and toUpperCase() removed due to the fact that each onChange was sending cursor to end of input, now we use textTransform in style and format when sending to backend instead

const maskCorporateName = (value: string) =>
  value.replace(/[!@#¨$%^&*<>:?)(+=/\\,;"\][|}{_-]+/g, '')

const maskName = (value: string) => value.replace(/[0-9!@#¨$%^&*<>:?)(+=/\\,;"\][|}{._-]+/g, '')

const maskEmail = (value: string) => value.replace(/(@)(?=.*\1)|[^a-zA-Z0-9@._-]/g, '')

interface handlerInterface {
  fieldType: FieldType
  value: string
}

export const maskParticipation = (value: string) => {
  let v = value.replace(/\D/g, '')
  v = (Number(v) / 10 ** 2).toFixed(2) + ''
  v = v.replace('.', ',')
  v = v.replace(/\d(?=(\d{3})+,)/g, '$&.')

  return v as string
}

export const maskPercentageArea = (value: string) => {
  let v = value.replace(/\D/g, '')
  v = (Number(v) / 10).toFixed(1) + ''
  v = v.replace('.', ',')
  v = v.replace(/\d(?=(\d{3})+,)/g, '$&.')

  return v as string
}

export const maskQuantityAllowingAComma = (value?: string, precision?: number) => {
  const parts = value!.split(',')
  const onlyDigits = (value: string = '') => value.replace(/\D/g, '')
  const thousandsPart = Number(onlyDigits(parts[0] || '')) + ''
  const decimalsPart = onlyDigits(parts[1] || '')
  let maskedValue = parts ? thousandsPart : ''
  // includes points of thousands, millions, etc.
  maskedValue = maskedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (parts && parts.length > 1) {
    maskedValue = maskedValue + ',' + decimalsPart.substring(0, precision)
  }
  return maskedValue ? [maskedValue] : ['']
}

export const maskValueFixed3V2 = (limit: number, value?: string) => {
  const unmaskedValue = value?.replace(/\D+/g, '').slice(0, limit)
  if (unmaskedValue) {
    return [
      (+unmaskedValue / 1000).toLocaleString('pt-BR', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }),
    ]
  }
  return ['']
}

export const maskHandler = ({ fieldType, value }: handlerInterface): string => {
  const masks = {
    [FieldType.LETTERS]: maskOnlyLetters,
    [FieldType.NUMBERS]: maskOnlyNumbers,
    [FieldType.CEP]: maskCep,
    [FieldType.CPF]: maskCPF,
    [FieldType.CNPJ]: maskCNPJ,
    [FieldType.CELLPHONE]: maskCellPhone,
    [FieldType.LANDLINE]: maskLandline,
    [FieldType.CORPORATE_NAME]: maskCorporateName,
    [FieldType.CONTACT_NAME]: maskName,
    [FieldType.EMAIL]: maskEmail,
    [FieldType.DECIMAL]: maskDecimal,
    [FieldType.LATLONG]: maskLatLong,
  }
  return masks[fieldType](value)
}
