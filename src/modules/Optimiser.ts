import isEmpty from 'lodash/isEmpty'

/**
 * For extracting single styles that are similar and creating classes
 * eg. Two components with the same margin and padding join two classes
 * which add that margin and padding.
 * Returns an optimised IR
 * @param data The IR object
 */
export function optimiseStyle(data: any) {
  if (data.style) {
    let styleMap = new Map<string, Array<string>>()

    // So classes object is not null
    data.style.classes = {}

    // Add each style property as a key and the object id as value
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

    console.log(styleMap)

    // If style property has more than two id's, create a class for this style
    // Delete the style from the id's original style
    // Add object id and class name to classes object
    styleMap.forEach((value: Array<string>, key: string) => {
      if (value.length < 2) {
        styleMap.delete(key)
      } else {
        let className = nextClassName()
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
  }
  return data
}

/**
 * Recursive function that finds the object with name id and returns it.
 * Returns object with name id
 * @param data The current object
 * @param id The target object name
 */
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

/**
 * Closure used to create a class name for a specific style property.
 * Just returns a number for now but can be customised.
 */
var nextClassName = (function createClassName() {
  let counter = 0
  return function () {
    counter += 1
    return `c${counter}`
  }
})()
