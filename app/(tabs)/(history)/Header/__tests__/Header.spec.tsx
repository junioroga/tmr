import { fireEvent, render } from '@/test/test-utils'

import { format } from 'date-fns/format'
import { View as MockView } from 'react-native'
import Header from '../index'

jest.mock('../../../../../components', () => ({
  ...jest.requireActual('../../../../../components'),
  DatePicker: () => <MockView testID="date-picker-modal">Mock-View</MockView>,
}))

describe('Header', () => {
  const setup = () => {
    return render(<Header />)
  }

  it('renders title and date', () => {
    const { getByText } = setup()

    expect(getByText('Histórico')).toBeTruthy()
    expect(getByText(format(new Date(), 'dd/MM/yyyy'))).toBeTruthy()
  })

  it('press on date picker button and confirm a selected date', () => {
    const { getByTestId, getByText } = setup()
    const confirmedDate = new Date(new Date().getDate() + 1)

    const datePickerButton = getByTestId('date-picker-button')
    const datePickerModal = getByTestId('date-picker-modal')

    fireEvent.press(datePickerButton)
    fireEvent(datePickerModal, 'onConfirm', confirmedDate)

    expect(getByText(format(confirmedDate, 'dd/MM/yyyy'))).toBeTruthy()
    expect(datePickerButton).toBeTruthy()
    expect(datePickerModal).toBeTruthy()
  })

  it('press on date picker button and confirm without a date', () => {
    const { getByTestId, getByText } = setup()
    const todayDate = format(new Date(), 'dd/MM/yyyy')

    const datePickerButton = getByTestId('date-picker-button')
    const datePickerModal = getByTestId('date-picker-modal')

    fireEvent.press(datePickerButton)
    fireEvent(datePickerModal, 'onConfirm', new Date())

    expect(getByText(todayDate)).toBeTruthy()
    expect(datePickerButton).toBeTruthy()
    expect(datePickerModal).toBeTruthy()
  })
})
