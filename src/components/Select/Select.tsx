import { Adapt, Select as TSelect, SelectProps, Sheet } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'

interface Item {
  name: string
  value: string
}

type SelectCustomProps = SelectProps & {
  value: string
  onValueChange: (val: string) => void
  items: Item[]
  title?: string
  placeholder?: string
  error?: string
}

export const Select = ({
  value,
  onValueChange,
  items,
  title = 'Selecione',
  placeholder = 'Selecione',
  error,
  ...rest
}: SelectCustomProps) => {
  return (
    <TSelect value={value} onValueChange={onValueChange} disablePreventBodyScroll {...rest}>
      <TSelect.Trigger
        width="100%"
        size="$5"
        bw="$1"
        br="$3"
        bc="$primaryPurple70"
        px="$3"
        py={0}
        pressStyle={{ bc: '$primaryOrange100' }}
      >
        <TSelect.Value
          col={value ? '$primaryPurple100' : '$primaryOrange100'}
          size="$5"
          fow="$4"
          placeholder={placeholder}
        />
      </TSelect.Trigger>

      <Adapt>
        <Sheet modal dismissOnSnapToBottom animation="fast">
          <Sheet.Frame br="$3">
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay enterStyle={{ o: 0 }} exitStyle={{ o: 0 }} bg="$overlay" />
        </Sheet>
      </Adapt>

      <TSelect.Content zIndex={200000}>
        <TSelect.Viewport miw={200}>
          <TSelect.Group py="$4">
            <TSelect.Label color="$primaryPurple100">{title}</TSelect.Label>
            {items.map((item, i) => (
              <TSelect.Item index={i} key={item.name} value={item.value}>
                <TSelect.ItemText col="$primaryOrange100" fos="$4" fow="$5">
                  {item.name}
                </TSelect.ItemText>
                <TSelect.ItemIndicator marginLeft="auto">
                  <Check size={20} col="$primaryPurple100" />
                </TSelect.ItemIndicator>
              </TSelect.Item>
            ))}
          </TSelect.Group>
        </TSelect.Viewport>
      </TSelect.Content>
    </TSelect>
  )
}
