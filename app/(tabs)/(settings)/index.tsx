import Animated, { FadeInUp } from 'react-native-reanimated'

import { Trash } from '@tamagui/lucide-icons'
import { H3, ScrollView, Separator, Stack } from 'tamagui'

import { Button, Dialog } from '@/components'
import { useAppStore } from '@/store'

const AnimatedTitle = Animated.createAnimatedComponent(H3)

export default function Settings() {
  const { clearHistory } = useAppStore()

  return (
    <ScrollView
      fg={1}
      pt="$4"
      px="$4"
      pb="$12"
      bg="$background"
      showsVerticalScrollIndicator={false}
    >
      <AnimatedTitle
        pb="$4"
        entering={FadeInUp.delay(50).duration(150).springify()}
        col="$primaryPurple100"
      >
        Configurações
      </AnimatedTitle>
      <Stack gap="$2">
        <Dialog
          title="Exclusão"
          description="Você deseja excluir todo o histórico de medições?"
          onConfirm={clearHistory}
          trigger={
            <Button
              fd="row"
              jc="space-between"
              ai="center"
              bw={0}
              unstyled
              elevate={false}
              elevation={0}
              pressStyle={{ bw: 0 }}
            >
              <Button.Text>Apagar histórico de medidas</Button.Text>
              <Button.Icon>
                <Trash size="$1" col="$primaryOrange100" />
              </Button.Icon>
            </Button>
          }
        />
        <Separator />
      </Stack>
    </ScrollView>
  )
}
