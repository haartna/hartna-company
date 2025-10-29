export function cva(base: string, config?: any) {
  return (props?: any) => {
    let classes = base
    if (config?.variants && props) {
      Object.entries(config.variants).forEach(([key, variants]: [string, any]) => {
        if (props[key] && variants[props[key]]) {
          classes += " " + variants[props[key]]
        }
      })
    }
    return classes
  }
}

export type VariantProps<T> = T extends (...args: any[]) => any ? Parameters<T>[0] : never
