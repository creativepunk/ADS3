/**
 * Semantic Color Tokens — Dark Theme
 * Sourced from Figma "Color" collection, Dark mode.
 *
 * ⚠️  Auto-generated — do NOT edit manually.
 *     Re-run `pnpm figma:sync && pnpm sd:build` to regenerate.
 *
 * These tokens reference base colors by alias and are the
 * canonical tokens to use in components.
 */
import { baseColors, hoverColors } from './base-colors.js';
export const semanticColorsDark = {
    // ─── text ────────────────────────────────────────────────────────────────
    text: {
        default: baseColors.gray[10],
        subtle: baseColors.gray[40],
        subtlest: baseColors.gray[70],
        inverse: baseColors.gray[140],
        disabled: baseColors.neutral['white-25'],
        success: baseColors.green[40],
        danger: baseColors.red[50],
        warning: baseColors.yellow[40],
        selected: baseColors.blue[50]
    },
    // ─── link ────────────────────────────────────────────────────────────────
    link: {
        default: baseColors.blue[40],
        defaultHover: baseColors.blue[30],
        secondary: baseColors.blue[30],
        inverse: baseColors.blue[60],
        inverseHover: baseColors.blue[70],
        inverseActive: baseColors.gray[140],
        visited: baseColors.purple[40],
        inverseVisited: baseColors.purple[60]
    },
    // ─── icon ────────────────────────────────────────────────────────────────
    icon: {
        default: baseColors.gray[10],
        subtle: baseColors.gray[40],
        subtlest: baseColors.gray[60],
        inverse: baseColors.gray[140],
        disabled: baseColors.neutral['white-25'],
        success: baseColors.green[40],
        danger: baseColors.red[50],
        warning: baseColors.yellow[40],
        selected: baseColors.blue[50]
    },
    // ─── border ──────────────────────────────────────────────────────────────
    border: {
        default: baseColors.neutral['white-8'],
        bold: baseColors.neutral['white-12'],
        bolder: baseColors.neutral['white-20'],
        inverse: baseColors.gray[10],
        brand: baseColors.blue[60],
        disabled: baseColors.neutral['white-5'],
        interactive: baseColors.blue[50],
        success: baseColors.green[40],
        danger: baseColors.red[50],
        warning: baseColors.yellow[40],
        selected: baseColors.blue[60],
        figma: baseColors.purple[50]
    },
    // ─── background ──────────────────────────────────────────────────────────
    background: {
        neutral: {
            default: baseColors.neutral['white-12'],
            hovered: baseColors.neutral['white-20'],
            pressed: baseColors.neutral['white-8'],
            subtle: {
                default: "rgba(255, 255, 255, 0)",
                hovered: baseColors.neutral['white-8'],
                pressed: baseColors.neutral['white-5']
            },
            bold: {
                default: baseColors.gray[20],
                hovered: baseColors.gray[40],
                pressed: baseColors.gray[10]
            }
        },
        disabled: baseColors.neutral['white-5'],
        input: {
            default: baseColors.neutral['white-5'],
            hovered: baseColors.neutral['white-8'],
            pressed: baseColors.neutral['white-3'],
            disabled: baseColors.neutral['white-3']
        },
        brand: {
            default: baseColors.blue[60],
            hovered: hoverColors.blue[60],
            pressed: baseColors.blue[80]
        },
        danger: {
            default: baseColors.red[60],
            hovered: hoverColors.red[60],
            pressed: baseColors.red[80]
        },
        success: {
            default: baseColors.green[40],
            hovered: hoverColors.green[40],
            pressed: baseColors.green[70]
        },
        warning: {
            default: baseColors.yellow[40],
            hovered: hoverColors.yellow[40],
            pressed: baseColors.yellow[70]
        },
        selected: {
            default: baseColors.neutral['white-8'],
            bold: {
                default: baseColors.blue[90],
                hovered: baseColors.blue[80],
                pressed: baseColors.blue[100]
            },
            hovered: baseColors.neutral['white-12'],
            pressed: baseColors.neutral['white-5'],
            bolder: {
                default: baseColors.blue[60],
                hovered: hoverColors.blue[50],
                pressed: baseColors.blue[40]
            }
        }
    },
    // ─── elevation ───────────────────────────────────────────────────────────
    elevation: {
        default: baseColors.gray[140],
        hovered: hoverColors.gray[130],
        pressed: baseColors.gray[140],
        surface: {
            raised: {
                default: baseColors.gray[130],
                hovered: hoverColors.gray[120],
                pressed: baseColors.gray[140]
            },
            'raised 2': {
                default: baseColors.gray[120],
                hovered: hoverColors.gray[110],
                pressed: baseColors.gray[130]
            },
            overlay: {
                default: baseColors.gray[110],
                hovered: baseColors.gray[100],
                pressed: baseColors.gray[120]
            },
            sunken: {
                default: baseColors.neutral['black']
            }
        }
    },
    // ─── focus ───────────────────────────────────────────────────────────────
    focus: {
        default: baseColors.neutral['white'],
        inset: baseColors.gray[100],
        inverse: baseColors.blue[60]
    },
    // ─── tag ─────────────────────────────────────────────────────────────────
    tag: {
        Blue: {
            background: baseColors.blue[70],
            color: baseColors.blue[20],
            icon: baseColors.blue[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Cyan: {
            background: baseColors.cyan[70],
            color: baseColors.cyan[20],
            icon: baseColors.cyan[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Teal: {
            background: baseColors.teal[70],
            color: baseColors.teal[20],
            icon: baseColors.teal[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Green: {
            background: baseColors.green[70],
            color: baseColors.green[20],
            icon: baseColors.green[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Purple: {
            background: baseColors.purple[70],
            color: baseColors.purple[20],
            icon: baseColors.purple[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Magenta: {
            background: baseColors.magenta[70],
            color: baseColors.magenta[20],
            icon: baseColors.magenta[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Red: {
            background: baseColors.red[70],
            color: baseColors.red[20],
            icon: baseColors.red[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Orange: {
            background: baseColors.orange[70],
            color: baseColors.orange[20],
            icon: baseColors.orange[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Yellow: {
            background: baseColors.yellow[70],
            color: baseColors.yellow[20],
            icon: baseColors.yellow[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Gray: {
            background: baseColors.gray[90],
            color: baseColors.gray[20],
            icon: baseColors.gray[20],
            backgroundDisabled: baseColors.gray[90]
        },
        Selectable: {
            backgroundEnabled: "{background.neutral.default}",
            backgroundSelected: "{background.selected.bold.default}",
            colorEnabled: "{text.text-subtle}",
            colorSelected: "{text.text-default}",
            hover: "{background.neutral.hovered}",
            icon: "{icon.icon-default}",
            backgroundDisabled: "{background.disabled}",
            border: "{border.border-default}",
            borderSelected: "{border.border-selected}",
            focus: "{focus.focus}",
            borderDisabled: "{border.border-disabled}"
        }
    }
};
//# sourceMappingURL=semantic-colors.js.map