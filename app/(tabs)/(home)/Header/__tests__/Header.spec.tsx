import { render } from '@/test/test-utils'

import Header from '../index'

describe('Header', () => {
  const setup = () => {
    return render(<Header />)
  }

  it('renders title and logo', () => {
    const { getByText, getByTestId } = setup()

    expect(getByText('TMR')).toBeTruthy()
    expect(getByTestId('image-logo')).toBeTruthy()
  })
})
