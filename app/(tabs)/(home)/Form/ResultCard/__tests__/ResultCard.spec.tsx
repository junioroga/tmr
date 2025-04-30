import { act, render } from '~/test/test-utils'

import ResultCard, { ResultCardProps } from '../index'

describe('ResultCard', () => {
  const setup = ({ result }: ResultCardProps) => {
    return render(<ResultCard result={result} />)
  }

  it('renders TMR value and NAF value', async () => {
    const { getByText } = setup({ result: { TMR: 10, NAF: 20 } })

    await act(async () => {
      expect(getByText('10,00')).toBeTruthy()
      expect(getByText('20,00')).toBeTruthy()
    })
  })
})
