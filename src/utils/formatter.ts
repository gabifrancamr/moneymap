export const dateFormatter = new Intl.DateTimeFormat('en-US')

export const priceFromatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})