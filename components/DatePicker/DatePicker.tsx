import React from 'react'
import { Platform } from 'react-native'

import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker'

import { useTheme } from 'tamagui'

export const DatePicker = ({
  onConfirm,
  mode = 'date',
  locale = 'pt_BR',
  maximumDate = new Date(),
  display = Platform.OS === 'ios' ? 'inline' : 'default',
  ...rest
}: ReactNativeModalDateTimePickerProps) => {
  const theme = useTheme()
  return (
    <DateTimePickerModal
      display={display}
      mode={mode}
      onConfirm={onConfirm}
      maximumDate={maximumDate}
      locale={locale}
      buttonTextColorIOS={theme.primaryPurple100.val}
      textColor={theme.primaryOrange100.val}
      accessibilityIgnoresInvertColors
      confirmTextIOS="Confirmar"
      cancelTextIOS="Cancelar"
      backdropStyleIOS={{
        backgroundColor: theme.primaryPurple20.val,
      }}
      positiveButton={{
        label: 'Confirmar',
        textColor: theme.primaryPurple100.val,
      }}
      negativeButton={{
        label: 'Cancelar',
        textColor: theme.primaryPurple100.val,
      }}
      accentColor={theme.primaryPurple100.val}
      {...rest}
    />
  )
}

export default React.memo(DatePicker)
