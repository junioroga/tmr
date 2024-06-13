import React from 'react'

import { Text } from '../Text'

type TabLabelProps = {
  label: string
  color: string
}

export const TabBarLabel = ({ label, color }: TabLabelProps) => {
  return (
    <Text col={color} fos="$1" fow="$6">
      {label}
    </Text>
  )
}
