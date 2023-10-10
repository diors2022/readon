import { useColorScheme } from '.'

export const useColorSchemeColors = ({
  sepia,
  dark,
  light,
}: {
  sepia: string
  dark: string
  light: string
}) => {
  const { scheme } = useColorScheme()
  return scheme === 'dark' ? dark : scheme === 'sepia' ? sepia : light
}

export const useTextColors = () => {
  return useColorSchemeColors({
    sepia: 'text-text-sepia',
    dark: 'text-text-dark',
    light: 'text-text-light',
  })
}

export const useBgColors = () => {
  return useColorSchemeColors({
    sepia: 'bg-background-sepia',
    dark: 'bg-background-dark',
    light: 'bg-background-light',
  })
}

export const useIconColors = () => {
  return useColorSchemeColors({
    sepia: 'fill-border-sepia',
    dark: 'fill-border-dark',
    light: 'fill-border-light',
  })
}

export const useHighlightTextColors = () => {
  return useColorSchemeColors({
    sepia: 'text-border-sepia',
    dark: 'text-border-dark',
    light: 'text-border-light',
  })
}

export const usePageTurnColors = () => {
  return useColorSchemeColors({
    sepia: 'bg-pageTurning-sepia',
    dark: 'bg-pageTurning-dark',
    light: 'bg-pageTurning-light',
  })
}

export const useSettingsButtonColors = () => {
  return useColorSchemeColors({
    sepia: 'ring-border-sepia hover:bg-border-sepia/20',
    dark: 'ring-border-dark hover:bg-border-dark/20',
    light: 'ring-border-light hover:bg-border-light/20',
  })
}

export const useSettingsButtonDisabledColors = () => {
  return useColorSchemeColors({
    sepia: 'ring-border-sepia/30 hover:bg-transparent',
    dark: 'ring-border-dark/30 hover:bg-transparent',
    light: 'ring-border-light/30 hover:bg-transparent',
  })
}

export const useTextPresentationHighlightRing = () => {
  return useColorSchemeColors({
    sepia: 'ring-border-sepia',
    dark: 'ring-border-dark',
    light: 'ring-border-light',
  })
}

