import { YStack } from 'tamagui'
import { UserX } from '@tamagui/lucide-icons'

import { Button, Dialog } from '@/components'
import { useAppStore } from '@/store'

export default function Settings() {
  const { clearHistory } = useAppStore()

  return (
    <YStack f={1} p="$4">
      <Dialog
        title="Exclusão"
        description="Você deseja excluir todo o histórico de medições?"
        onConfirm={clearHistory}
        trigger={
          <Button fd="row" bw={0}>
            <Button.Icon>
              <UserX size="$1" col="$primaryOrange100" />
            </Button.Icon>
            <Button.Text>Apagar histórico de medidas</Button.Text>
          </Button>
        }
      />
    </YStack>
  )
}
