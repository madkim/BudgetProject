import { Plugins, HapticsImpactStyle } from "@capacitor/core";

const { Haptics } = Plugins;

export function useHaptics() {
  const impact = (style = HapticsImpactStyle.Heavy) => {
    Haptics.impact({ style: style });
  };

  const impactMedium = () => {
    impact(HapticsImpactStyle.Medium);
  };

  const impactLight = () => {
    impact(HapticsImpactStyle.Light);
  };

  const vibrate = () => {
    Haptics.vibrate();
  };

  return {
    impact,
    vibrate,
    impactMedium,
    impactLight,
  };
}
