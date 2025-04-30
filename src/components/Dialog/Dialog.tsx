import { AlertDialog as AlertDialogTamagui, YStack } from 'tamagui'

import { Button } from '../Button'
import { GradientButton } from '../GradientButton'

type Props = {
  title: string
  description: string
  trigger: React.ReactNode
  onConfirm: () => void
}

export const Dialog = ({ title, description, trigger, onConfirm }: Props) => (
  <AlertDialogTamagui>
    <AlertDialogTamagui.Trigger asChild>{trigger}</AlertDialogTamagui.Trigger>
    <AlertDialogTamagui.Portal>
      <AlertDialogTamagui.Overlay
        bg="$overlay"
        key="overlay"
        animation="quick"
        o={0.5}
        enterStyle={{ o: 0 }}
        exitStyle={{ o: 0 }}
      />
      <AlertDialogTamagui.Content
        bordered
        elevation="$0.25"
        key="content"
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, o: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, o: 0, scale: 0.95 }}
        x={0}
        scale={1}
        o={1}
        y={0}
        m="$4"
      >
        <YStack gap="$3">
          <AlertDialogTamagui.Title fontSize="$7" fontWeight="$7" col="$primaryPurple100">
            {title}
          </AlertDialogTamagui.Title>
          <AlertDialogTamagui.Description fontSize="$3" fontWeight="$4" col="$primaryOrange100">
            {description}
          </AlertDialogTamagui.Description>
          <YStack gap="$3">
            <AlertDialogTamagui.Cancel asChild>
              <Button theme="primaryOrange">
                <Button.Text theme="primaryOrange">Cancelar</Button.Text>
              </Button>
            </AlertDialogTamagui.Cancel>
            <AlertDialogTamagui.Action asChild>
              <GradientButton title="Confirmar" onPress={onConfirm} />
            </AlertDialogTamagui.Action>
          </YStack>
        </YStack>
      </AlertDialogTamagui.Content>
    </AlertDialogTamagui.Portal>
  </AlertDialogTamagui>
)
