type FormatNumber = (value: number, decimals?: number) => string

export const formatDecimals: FormatNumber = (value, decimals = 0) =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

export const formatCurrency = (val: any) =>
  Number(val).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

export const formatStature = (text: string) => {
  const regex = /^(\d{1,3})?(\,\d{1,2})?$/
  const match = text.match(regex)

  if (match) {
    const wholeNumber = match[1] || ''
    const decimal = match[2] || ''

    const wholeNumberDigits = wholeNumber.length
    const decimalDigits = decimal.length

    if (wholeNumberDigits > 3) {
      return
    }

    if (decimalDigits > 2) {
      return
    }

    return `${wholeNumber}${decimal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
