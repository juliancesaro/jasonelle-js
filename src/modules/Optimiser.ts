import isEmpty from 'lodash/isEmpty'

export function optimiseStyle(data: any) {
  /**
   * For extracting single styles that are similar and creating classes
   * eg. Two components with the same margin and padding join two classes
   * which add that margin and padding
   */
  if (data.style) {
    let styleMap = new Map<string, Array<string>>()

    data.style.classes = {}

    for (const styleObj in data.style) {
      Object.entries(data.style[styleObj]).forEach(([attr, val]) => {
        let newArr = styleMap.get(`${attr}:${val}`)
        if (!newArr) {
          styleMap.set(`${attr}:${val}`, [styleObj])
        } else {
          newArr.push(styleObj)
        }
      })
    }

    styleMap.forEach((value: Array<string>, key: string) => {
      if (value.length < 2) {
        styleMap.delete(key)
      } else {
        let className = createClassName(key)
        value.forEach((id) => {
          let property = key.split(':')[0]
          if (data.style[id][property]) {
            delete data.style[id][property]
          }
          if (isEmpty(data.style[id])) {
            delete data.style[id]
          }
          if (data.style['classes'][id]) {
            let newClassName = data.style['classes'][id] + ' ' + className
            data.style['classes'][id] = newClassName
          } else {
            data.style['classes'] = {
              ...data.style['classes'],
              [id]: className,
            }
          }
          let component = findComponent(data, id)
          if (component) {
            if (component.class) {
              component.class += ' ' + className
            } else {
              component.class = className
            }
          }
        })
        let style = key.split(':')
        data.style[`class-${className}`] = { [style[0]]: [style[1]] }
      }
    })

    /**
     * For extracting entire blocks of style that are similar and creating classes
     */
    //   let styleMap = new Map<string, Array<string>>()

    //   for (const styleObj in data.style) {
    //     let arr = styleMap.get(JSON.stringify(data.style[styleObj]))
    //     if (!arr) {
    //       styleMap.set(JSON.stringify(data.style[styleObj]), [styleObj])
    //     } else {
    //       arr.push(styleObj)
    //     }
    //   }

    //   let i = 0
    //   styleMap.forEach((value: Array<string>, key: string) => {
    //     if (value.length < 2) {
    //       styleMap.delete(key)
    //     } else {
    //       value.forEach((id) => {
    //         delete data.style[id]
    //         data.style['classes'] = { ...data.style['classes'], [id]: `class-${i}` }
    //       })
    //       let style = JSON.parse(key)
    //       data.style[`class-${i}`] = style
    //       i++
    //     }
    //   })

    //   let styleMap = new Map<string, Array<string>>()

    //   // Map each block of style to it's id
    //   for (const styleObj in data.style) {
    //     let arr = styleMap.get(JSON.stringify(data.style[styleObj]))
    //     if (!arr) {
    //       styleMap.set(JSON.stringify(data.style[styleObj]), [styleObj])
    //     } else {
    //       arr.push(styleObj)
    //     }
    //   }

    // To delete old id style and create the new classes
    // Also adds class property to each component of a class
    //   let i = 0
    //   styleMap.forEach((value: Array<string>, key: string) => {
    //     if (value.length < 2) {
    //       styleMap.delete(key)
    //     } else {
    //       value.forEach((id) => {
    //         delete data.style[id]
    //         data.style['classes'] = { ...data.style['classes'], [id]: `class-${i}` }
    //         if (findComponent(data, id)) {
    //           findComponent(data, id).class = `class-${i}`
    //         }
    //       })
    //       let style = key
    //       data.style[`class-${i}`] = style
    //       i++
    //     }
    //   })
  }
  return data
}

function findComponent(data: any, id: string): any | null {
  let result = null
  for (const component in data) {
    if (component === id) {
      return data[component]
    }
    if (data[component] instanceof Object && component !== 'style') {
      result = findComponent(data[component], id)
      if (result) {
        break
      }
    }
  }
  return result
}

function createClassName(style: string) {
  let className = ''
  let str = style.split(':')
  className += str[0] + str[1]
  return className
}
