export function optimiseStyle(data: any) {
  /**
   * For extracting single styles that are similar and creating classes
   * eg. Two components with the same margin and padding join two classes
   * which add that margin and padding
   */
  //   let styleMap = new Map<string, Array<string>>()

  //   for (const styleObj in data.style) {
  //     Object.entries(data.style[styleObj]).forEach(([attr, val]) => {
  //       let newArr = styleMap.get(`${attr}:${val}`)
  //       if (!newArr) {
  //         styleMap.set(`${attr}:${val}`, [styleObj])
  //       } else {
  //         newArr.push(styleObj)
  //       }
  //     })
  //   }

  /**
   * For extracting entire blocks of style that are similar and creating classes
   */
  let styleMap = new Map<string, Array<string>>()

  for (const styleObj in data.style) {
    let arr = styleMap.get(JSON.stringify(data.style[styleObj]))
    if (!arr) {
      styleMap.set(JSON.stringify(data.style[styleObj]), [styleObj])
    } else {
      arr.push(styleObj)
    }
  }

  let i = 0
  styleMap.forEach((value: Array<string>, key: string) => {
    if (value.length < 2) {
      styleMap.delete(key)
    } else {
      value.forEach((id) => {
        delete data.style[id]
        data.style['classes'] = { ...data.style['classes'], [id]: `class-${i}` }
      })
      let style = JSON.parse(key)
      data.style[`class-${i}`] = style
      i++
    }
  })

  return data
}
