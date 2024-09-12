import { act, render } from '@/test/test-utils'

import { Condition, Genres, LevelOfPhysicalActivity } from '@/utils/options'
import Card, { CardProps } from '../index'
import { mockAllValues, mockOnlyRequiredValues } from './mocks'

describe('Card', () => {
  const setup = (props: CardProps) => {
    return render(<Card {...props} />)
  }

  it('renders with all values', async () => {
    const { getByText } = setup({
      item: mockAllValues,
      onRemove: () => null,
    })

    await act(async () => {
      expect(getByText('Test all filled values')).toBeTruthy()
      expect(getByText(Genres.Feminino)).toBeTruthy()
      expect(getByText('1,23 kg')).toBeTruthy()
      expect(getByText('4,56 cm')).toBeTruthy()
      expect(getByText('12')).toBeTruthy()
      expect(getByText('10,00')).toBeTruthy()
      expect(getByText('20,00')).toBeTruthy()
      expect(getByText(new Date().toDateString())).toBeTruthy()
      expect(getByText(LevelOfPhysicalActivity.Athletic)).toBeTruthy()
      expect(getByText(Condition.Eutrophic)).toBeTruthy()
      expect(getByText('6,78 kg')).toBeTruthy()
    })
  })

  it('renders only required values', async () => {
    const { getByText } = setup({
      item: mockOnlyRequiredValues,
      onRemove: () => null,
    })

    await act(async () => {
      expect(getByText('Test only required values')).toBeTruthy()
      expect(getByText('10,00')).toBeTruthy()
      expect(getByText('20,00')).toBeTruthy()
      expect(getByText(new Date().toDateString())).toBeTruthy()
      expect(getByText(Condition.Athletic)).toBeTruthy()
    })
  })
})
