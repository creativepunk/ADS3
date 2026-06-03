declare const tokens: {
    readonly base: {
        readonly colors: {
            readonly neutral: {
                readonly white: "#ffffff";
                readonly 'white-3': "rgba(255, 255, 255, 0.03)";
                readonly 'white-5': "rgba(255, 255, 255, 0.05)";
                readonly 'white-8': "rgba(255, 255, 255, 0.08)";
                readonly 'white-12': "rgba(255, 255, 255, 0.12)";
                readonly 'white-20': "rgba(255, 255, 255, 0.2)";
                readonly 'white-25': "rgba(255, 255, 255, 0.25)";
                readonly black: "#000000";
                readonly 'black-3': "rgba(0, 0, 0, 0.03)";
                readonly 'black-5': "rgba(0, 0, 0, 0.05)";
                readonly 'black-8': "rgba(0, 0, 0, 0.08)";
                readonly 'black-12': "rgba(0, 0, 0, 0.12)";
                readonly 'black-20': "rgba(0, 0, 0, 0.2)";
                readonly 'black-25': "rgba(0, 0, 0, 0.25)";
            };
            readonly blue: {
                readonly 10: "#ebfdff";
                readonly 20: "#d1edff";
                readonly 30: "#a8d4ff";
                readonly 40: "#7cb4fe";
                readonly 50: "#5799ef";
                readonly 60: "#0168de";
                readonly 70: "#0055bd";
                readonly 80: "#00398f";
                readonly 90: "#00235c";
                readonly 100: "#001433";
            };
            readonly gray: {
                readonly 10: "#f0f0f0";
                readonly 20: "#d0d0d0";
                readonly 30: "#c1c1c1";
                readonly 40: "#acacac";
                readonly 50: "#9a9a9a";
                readonly 60: "#838383";
                readonly 70: "#676767";
                readonly 80: "#4e4e4e";
                readonly 90: "#404040";
                readonly 100: "#323232";
                readonly 110: "#2d2d2d";
                readonly 120: "#262626";
                readonly 130: "#202020";
                readonly 140: "#161616";
            };
            readonly cyan: {
                readonly 10: "#e5f6ff";
                readonly 20: "#bae6ff";
                readonly 30: "#82cfff";
                readonly 40: "#33b1ff";
                readonly 50: "#1192e8";
                readonly 60: "#0072c3";
                readonly 70: "#00539a";
                readonly 80: "#003a6d";
                readonly 90: "#012749";
                readonly 100: "#061727";
            };
            readonly green: {
                readonly 10: "#defbe6";
                readonly 20: "#a7f0ba";
                readonly 30: "#6fdc8c";
                readonly 40: "#42be65";
                readonly 50: "#24a148";
                readonly 60: "#198038";
                readonly 70: "#0e6027";
                readonly 80: "#044317";
                readonly 90: "#022d0d";
                readonly 100: "#071908";
            };
            readonly magenta: {
                readonly 10: "#fff0f7";
                readonly 20: "#ffd6e8";
                readonly 30: "#ffafd2";
                readonly 40: "#ff7eb6";
                readonly 50: "#ee5396";
                readonly 60: "#d02670";
                readonly 70: "#9f1853";
                readonly 80: "#740937";
                readonly 90: "#510224";
                readonly 100: "#2a0a18";
            };
            readonly purple: {
                readonly 10: "#f6f2ff";
                readonly 20: "#e8daff";
                readonly 30: "#d4bbff";
                readonly 40: "#be95ff";
                readonly 50: "#a56eff";
                readonly 60: "#8a3ffc";
                readonly 70: "#6929c4";
                readonly 80: "#491d8b";
                readonly 90: "#31135e";
                readonly 100: "#1c0f30";
            };
            readonly red: {
                readonly 10: "#fff1f1";
                readonly 20: "#ffd7d9";
                readonly 30: "#ffb3b8";
                readonly 40: "#ff8389";
                readonly 50: "#fa4d56";
                readonly 60: "#da1e28";
                readonly 70: "#a2191f";
                readonly 80: "#750e13";
                readonly 90: "#520408";
                readonly 100: "#2d0709";
            };
            readonly teal: {
                readonly 10: "#d9fbfb";
                readonly 20: "#9ef0f0";
                readonly 30: "#3ddbd9";
                readonly 40: "#08bdba";
                readonly 50: "#009d9a";
                readonly 60: "#007d79";
                readonly 70: "#005d5d";
                readonly 80: "#004144";
                readonly 90: "#022b30";
                readonly 100: "#081a1c";
            };
            readonly yellow: {
                readonly 10: "#fcf4d6";
                readonly 20: "#fddc69";
                readonly 30: "#f1c21b";
                readonly 40: "#d2a106";
                readonly 50: "#b28600";
                readonly 60: "#8e6a00";
                readonly 70: "#684e00";
                readonly 80: "#483700";
                readonly 90: "#302400";
                readonly 100: "#1c1500";
            };
            readonly orange: {
                readonly 10: "#fff2e8";
                readonly 20: "#ffd9be";
                readonly 30: "#ffb784";
                readonly 40: "#ff832b";
                readonly 50: "#eb6200";
                readonly 60: "#ba4e00";
                readonly 70: "#8a3800";
                readonly 80: "#5e2900";
                readonly 90: "#3e1a00";
                readonly 100: "#231000";
            };
        };
        readonly spacing: {
            readonly 'spacing-00': 0;
            readonly 'spacing-01': 2;
            readonly 'spacing-02': 4;
            readonly 'spacing-03': 6;
            readonly 'spacing-04': 8;
            readonly 'spacing-05': 12;
            readonly 'spacing-06': 16;
            readonly 'spacing-07': 20;
            readonly 'spacing-08': 24;
            readonly 'spacing-09': 32;
            readonly 'spacing-10': 40;
            readonly 'spacing-11': 48;
            readonly 'spacing-12': 64;
            readonly 'spacing-13': 80;
            readonly 'spacing-14': 96;
            readonly 'spacing-15': 160;
        };
        readonly radius: {
            readonly 'radius-none': 0;
            readonly 'radius-pill': 9999;
            readonly 'radius-xs': 2;
            readonly 'radius-sm': 4;
            readonly 'radius-md': 6;
            readonly 'radius-lg': 8;
            readonly 'radius-xl': 12;
            readonly 'radius-focus-xs': 4;
            readonly 'radius-focus-sm': 6;
            readonly 'radius-focus-md': 8;
            readonly 'radius-focus-lg': 10;
            readonly 'radius-focus-xl': 14;
        };
        readonly typeScale: {
            readonly 'scale-0': 12;
            readonly 'scale-1': 14;
            readonly 'scale-2': 16;
            readonly 'scale-3': 20;
            readonly 'scale-4': 24;
            readonly 'scale-5': 28;
            readonly 'scale-6': 32;
            readonly 'scale-7': 40;
            readonly 'scale-8': 48;
            readonly 'scale-9': 56;
        };
        readonly fontFamily: {
            readonly normal: "Inter, sans-serif";
            readonly mono: "\"IBM Plex Mono\", monospace";
        };
        readonly fontWeight: {
            readonly thin: 100;
            readonly extralight: 200;
            readonly light: 300;
            readonly regular: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly typography: {
            readonly 'body-sm': {
                readonly fontSize: 14;
                readonly fontWeight: 400;
                readonly lineHeight: 16;
                readonly letterSpacing: 0.16;
            };
            readonly 'body-md': {
                readonly fontSize: 16;
                readonly fontWeight: 400;
                readonly lineHeight: 20;
                readonly letterSpacing: 0.16;
            };
            readonly 'body-lg': {
                readonly fontSize: 20;
                readonly fontWeight: 400;
                readonly lineHeight: 24;
                readonly letterSpacing: 0.16;
            };
            readonly 'mono-body-sm': {
                readonly fontFamily: "mono";
                readonly fontSize: 14;
                readonly fontWeight: 400;
                readonly lineHeight: 16;
                readonly letterSpacing: 0.16;
            };
            readonly 'mono-body-md': {
                readonly fontFamily: "mono";
                readonly fontSize: 16;
                readonly fontWeight: 400;
                readonly lineHeight: 20;
                readonly letterSpacing: 0.16;
            };
            readonly 'mono-body-lg': {
                readonly fontFamily: "mono";
                readonly fontSize: 20;
                readonly fontWeight: 400;
                readonly lineHeight: 24;
                readonly letterSpacing: 0.16;
            };
            readonly code: {
                readonly fontFamily: "mono";
                readonly fontSize: 12;
                readonly fontWeight: 400;
                readonly lineHeight: 16;
                readonly letterSpacing: 0.32;
            };
            readonly helper: {
                readonly fontSize: 12;
                readonly fontWeight: 400;
                readonly lineHeight: 16;
                readonly letterSpacing: 0.32;
            };
            readonly 'heading-xxs': {
                readonly fontSize: 14;
                readonly fontWeight: 600;
                readonly lineHeight: 16;
                readonly letterSpacing: 0.16;
            };
            readonly 'heading-xs': {
                readonly fontSize: 16;
                readonly fontWeight: 600;
                readonly lineHeight: 20;
                readonly letterSpacing: 0.16;
            };
            readonly 'heading-sm': {
                readonly fontSize: 20;
                readonly fontWeight: 500;
                readonly lineHeight: 24;
                readonly letterSpacing: 0;
            };
            readonly 'heading-md': {
                readonly fontSize: 24;
                readonly fontWeight: 400;
                readonly lineHeight: 28;
                readonly letterSpacing: 0;
            };
            readonly 'heading-lg': {
                readonly fontSize: 28;
                readonly fontWeight: 400;
                readonly lineHeight: 32;
                readonly letterSpacing: -0.2;
            };
            readonly 'heading-xl': {
                readonly fontSize: 32;
                readonly fontWeight: 300;
                readonly lineHeight: 36;
                readonly letterSpacing: 0;
            };
            readonly 'heading-xxl': {
                readonly fontSize: 40;
                readonly fontWeight: 300;
                readonly lineHeight: 48;
                readonly letterSpacing: 0;
            };
            readonly 'metric-xxs': {
                readonly fontFamily: "mono";
                readonly fontSize: 14;
                readonly fontWeight: 600;
                readonly lineHeight: 16;
                readonly letterSpacing: 0.16;
            };
            readonly 'metric-xs': {
                readonly fontFamily: "mono";
                readonly fontSize: 16;
                readonly fontWeight: 600;
                readonly lineHeight: 20;
                readonly letterSpacing: 0.16;
            };
            readonly 'metric-sm': {
                readonly fontFamily: "mono";
                readonly fontSize: 20;
                readonly fontWeight: 500;
                readonly lineHeight: 24;
                readonly letterSpacing: 0;
            };
            readonly 'metric-md': {
                readonly fontFamily: "mono";
                readonly fontSize: 24;
                readonly fontWeight: 400;
                readonly lineHeight: 28;
                readonly letterSpacing: 0;
            };
            readonly 'metric-lg': {
                readonly fontFamily: "mono";
                readonly fontSize: 28;
                readonly fontWeight: 400;
                readonly lineHeight: 32;
                readonly letterSpacing: 0;
            };
            readonly 'metric-xl': {
                readonly fontFamily: "mono";
                readonly fontSize: 32;
                readonly fontWeight: 300;
                readonly lineHeight: 36;
                readonly letterSpacing: 0;
            };
            readonly 'metric-xxl': {
                readonly fontFamily: "mono";
                readonly fontSize: 40;
                readonly fontWeight: 300;
                readonly lineHeight: 48;
                readonly letterSpacing: 0;
            };
        };
    };
    readonly semantic: {
        readonly dark: {
            readonly text: {
                readonly default: "#f0f0f0";
                readonly subtle: "#acacac";
                readonly subtlest: "#676767";
                readonly inverse: "#161616";
                readonly disabled: "rgba(255, 255, 255, 0.25)";
                readonly success: "#42be65";
                readonly danger: "#fa4d56";
                readonly warning: "#d2a106";
                readonly selected: "#5799ef";
            };
            readonly link: {
                readonly default: "#7cb4fe";
                readonly defaultHover: "#a8d4ff";
                readonly secondary: "#a8d4ff";
                readonly inverse: "#0168de";
                readonly inverseHover: "#0055bd";
                readonly inverseActive: "#161616";
                readonly visited: "#be95ff";
                readonly inverseVisited: "#8a3ffc";
            };
            readonly icon: {
                readonly default: "#f0f0f0";
                readonly subtle: "#acacac";
                readonly subtlest: "#838383";
                readonly inverse: "#161616";
                readonly disabled: "rgba(255, 255, 255, 0.25)";
                readonly success: "#42be65";
                readonly danger: "#fa4d56";
                readonly warning: "#d2a106";
                readonly selected: "#5799ef";
            };
            readonly border: {
                readonly default: "rgba(255, 255, 255, 0.08)";
                readonly bold: "rgba(255, 255, 255, 0.12)";
                readonly bolder: "rgba(255, 255, 255, 0.2)";
                readonly inverse: "#f0f0f0";
                readonly brand: "#0168de";
                readonly disabled: "rgba(255, 255, 255, 0.05)";
                readonly interactive: "#5799ef";
                readonly success: "#42be65";
                readonly danger: "#fa4d56";
                readonly warning: "#d2a106";
                readonly selected: "#0168de";
                readonly figma: "#a56eff";
            };
            readonly background: {
                readonly neutral: {
                    readonly default: "rgba(255, 255, 255, 0.12)";
                    readonly hovered: "rgba(255, 255, 255, 0.2)";
                    readonly pressed: "rgba(255, 255, 255, 0.08)";
                    readonly subtle: {
                        readonly default: "rgba(255, 255, 255, 0)";
                        readonly hovered: "rgba(255, 255, 255, 0.08)";
                        readonly pressed: "rgba(255, 255, 255, 0.05)";
                    };
                    readonly bold: {
                        readonly default: "#d0d0d0";
                        readonly hovered: "#acacac";
                        readonly pressed: "#f0f0f0";
                    };
                };
                readonly disabled: "rgba(255, 255, 255, 0.05)";
                readonly input: {
                    readonly default: "rgba(255, 255, 255, 0.05)";
                    readonly hovered: "rgba(255, 255, 255, 0.08)";
                    readonly pressed: "rgba(255, 255, 255, 0.03)";
                    readonly disabled: "rgba(255, 255, 255, 0.03)";
                };
                readonly brand: {
                    readonly default: "#0168de";
                    readonly hovered: "#0156b7";
                    readonly pressed: "#00398f";
                };
                readonly danger: {
                    readonly default: "#da1e28";
                    readonly hovered: "#b81922";
                    readonly pressed: "#750e13";
                };
                readonly success: {
                    readonly default: "#42be65";
                    readonly hovered: "#3bab5a";
                    readonly pressed: "#0e6027";
                };
                readonly warning: {
                    readonly default: "#d2a106";
                    readonly hovered: "#bc9005";
                    readonly pressed: "#684e00";
                };
                readonly selected: {
                    readonly default: "rgba(255, 255, 255, 0.08)";
                    readonly bold: {
                        readonly default: "#00235c";
                        readonly hovered: "#00398f";
                        readonly pressed: "#001433";
                    };
                    readonly hovered: "rgba(255, 255, 255, 0.12)";
                    readonly pressed: "rgba(255, 255, 255, 0.05)";
                    readonly bolder: {
                        readonly default: "#0168de";
                        readonly hovered: "#3283eb";
                        readonly pressed: "#7cb4fe";
                    };
                };
            };
            readonly elevation: {
                readonly default: "#161616";
                readonly hovered: "#303030";
                readonly pressed: "#161616";
                readonly surface: {
                    readonly raised: {
                        readonly default: "#202020";
                        readonly hovered: "#363636";
                        readonly pressed: "#161616";
                    };
                    readonly 'raised 2': {
                        readonly default: "#262626";
                        readonly hovered: "#404040";
                        readonly pressed: "#202020";
                    };
                    readonly overlay: {
                        readonly default: "#2d2d2d";
                        readonly hovered: "#323232";
                        readonly pressed: "#262626";
                    };
                    readonly sunken: {
                        readonly default: "#000000";
                    };
                };
            };
            readonly focus: {
                readonly default: "#ffffff";
                readonly inset: "#323232";
                readonly inverse: "#0168de";
            };
            readonly tag: {
                readonly Blue: {
                    readonly background: "#0055bd";
                    readonly color: "#d1edff";
                    readonly icon: "#d1edff";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Cyan: {
                    readonly background: "#00539a";
                    readonly color: "#bae6ff";
                    readonly icon: "#bae6ff";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Teal: {
                    readonly background: "#005d5d";
                    readonly color: "#9ef0f0";
                    readonly icon: "#9ef0f0";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Green: {
                    readonly background: "#0e6027";
                    readonly color: "#a7f0ba";
                    readonly icon: "#a7f0ba";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Purple: {
                    readonly background: "#6929c4";
                    readonly color: "#e8daff";
                    readonly icon: "#e8daff";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Magenta: {
                    readonly background: "#9f1853";
                    readonly color: "#ffd6e8";
                    readonly icon: "#ffd6e8";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Red: {
                    readonly background: "#a2191f";
                    readonly color: "#ffd7d9";
                    readonly icon: "#ffd7d9";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Orange: {
                    readonly background: "#8a3800";
                    readonly color: "#ffd9be";
                    readonly icon: "#ffd9be";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Yellow: {
                    readonly background: "#684e00";
                    readonly color: "#fddc69";
                    readonly icon: "#fddc69";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Gray: {
                    readonly background: "#404040";
                    readonly color: "#d0d0d0";
                    readonly icon: "#d0d0d0";
                    readonly backgroundDisabled: "#404040";
                };
                readonly Selectable: {
                    readonly backgroundEnabled: "{background.neutral.default}";
                    readonly backgroundSelected: "{background.selected.bold.default}";
                    readonly colorEnabled: "{text.text-subtle}";
                    readonly colorSelected: "{text.text-default}";
                    readonly hover: "{background.neutral.hovered}";
                    readonly icon: "{icon.icon-default}";
                    readonly backgroundDisabled: "{background.disabled}";
                    readonly border: "{border.border-default}";
                    readonly borderSelected: "{border.border-selected}";
                    readonly focus: "{focus.focus}";
                    readonly borderDisabled: "{border.border-disabled}";
                };
            };
        };
    };
};
export default tokens;
export type Tokens = typeof tokens;
//# sourceMappingURL=tokens.d.ts.map