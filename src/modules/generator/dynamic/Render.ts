function renderStyle(head: any) {
  let element = document.createElement('link')
  element.setAttribute('rel', 'stylesheet')
  element.setAttribute('href', 'styles.css')
  head.appendChild(element)
}

function renderTitle(dom: any, title: any) {
  let titleElem = dom.window.document.createElement('title')
  titleElem.innerHTML = title.toString()
  dom.window.document.getElementsByTagName('head')[0].appendChild(titleElem)
}

function renderHeader(dom: any, header: any) {
  let headerElem = dom.window.document.createElement('header')
  headerElem.id = 'header'
  if (header.class) {
    headerElem.className = header.class
  }
  dom.window.document.getElementsByTagName('body')[0].appendChild(headerElem)
}

function renderHeaderTitle(dom: any, title: any) {
  let titleElem = dom.window.document.createElement('p')
  titleElem.innerHTML = title.toString()
  dom.window.document.getElementsByTagName('header')[0].appendChild(titleElem)
}

function renderAdvancedTitle(dom: any, title: any) {
  if (title.url) {
    let className = ''
    if (title.class) {
      className = title.class
    }
    renderImage(dom, 'header', 'header-title', className, title)
  } else {
    let titleElem = dom.window.document.createElement('p')
    titleElem.innerHTML = title.toString()
    dom.window.document.getElementsByTagName('header')[0].appendChild(titleElem)
  }
}

function renderSections(dom: any) {
  let sectionsElem = dom.window.document.createElement('div')
  sectionsElem.id = 'sections'
  dom.window.document.getElementsByTagName('body')[0].appendChild(sectionsElem)
}

function renderSection(dom: any, sectionName: string) {
  let sectionElem = dom.window.document.createElement('div')
  sectionElem.id = sectionName
  dom.window.document.getElementById('sections').appendChild(sectionElem)
}

function renderItems(dom: any, sectionName: any) {
  let itemsElem = dom.window.document.createElement('div')
  itemsElem.id = `${sectionName}-items`
  dom.window.document.getElementById(sectionName).appendChild(itemsElem)
}

function renderComponents(dom: any, components: any, parentName: any, id: any) {
  let componentsElem = dom.window.document.createElement('div')
  componentsElem.id = id
  if (components.class) {
    componentsElem.className = components.class
  }
  dom.window.document.getElementById(parentName).appendChild(componentsElem)
}

function renderLabel(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  label: any
) {
  let labelElem = dom.window.document.createElement('p')
  labelElem.id = id
  if (className) {
    labelElem.className = className
  }
  labelElem.innerHTML = label
  dom.window.document.getElementById(parentName).appendChild(labelElem)
}

function renderLink(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  link: any
) {
  let linkElem = dom.window.document.createElement('a')
  linkElem.id = id
  if (className) {
    linkElem.className = className
  }
  linkElem.href = link.url
  linkElem.setAttribute('alt', link.alt)
  linkElem.innerHTML = link.text
  dom.window.document.getElementById(parentName).appendChild(linkElem)
}

function renderImage(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  image: any
) {
  let imageElem = dom.window.document.createElement('img')
  imageElem.id = id
  if (className) {
    imageElem.className = className
  }
  imageElem.src = image.url
  dom.window.document.getElementById(parentName).appendChild(imageElem)
}

function renderButton(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  button: any,
  callback: any
) {
  let buttonElem = dom.window.document.createElement('button')
  buttonElem.id = id
  if (className) {
    buttonElem.className = className
  }
  buttonElem.addEventListener('click', callback)
  buttonElem.innerHTML = button.text
  dom.window.document.getElementById(parentName).appendChild(buttonElem)
}

function renderTextfield(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  textfield: any,
  updateFunc: string
) {
  let textfieldElem = dom.window.document.createElement('input')
  textfieldElem.id = id
  if (className) {
    textfieldElem.className = className
  }
  if (textfield.value) {
    textfieldElem.setAttribute('value', textfield.value)
  }
  if (textfield.placeholder) {
    textfieldElem.setAttribute('placeholder', textfield.placeholder)
  }
  if (textfield.keyboard) {
    textfieldElem.setAttribute('inputmode', textfield.keyboard)
  }
  if (textfield.focus) {
    textfieldElem.toggleAttribute('autofocus')
  }
  textfieldElem.setAttribute('onchange', `${updateFunc}(this.value)`)

  dom.window.document.getElementById(parentName).appendChild(textfieldElem)
}

function renderTextarea(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  textarea: any
) {
  let textareaElem = dom.window.document.createElement('textarea')
  textareaElem.id = id
  if (className) {
    textareaElem.className = className
  }
  if (textarea.value) {
    textareaElem.setAttribute('value', textarea.value)
  }
  if (textarea.placeholder) {
    textareaElem.setAttribute('placeholder', textarea.placeholder)
  }
  if (textarea.keyboard) {
    textareaElem.setAttribute('inputmode', textarea.keyboard)
  }
  if (textarea.focus) {
    textareaElem.toggleAttribute('autofocus')
  }

  dom.window.document.getElementById(parentName).appendChild(textareaElem)
}

function renderSlider(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  slider: any
) {
  let sliderElem = dom.window.document.createElement('input')
  sliderElem.setAttribute('type', 'range')
  sliderElem.id = id
  if (className) {
    sliderElem.className = className
  }
  if (slider.value) {
    sliderElem.setAttribute('value', slider.value)
  } else {
    sliderElem.setAttribute('value', '50')
  }

  dom.window.document.getElementById(parentName).appendChild(sliderElem)
}

function renderSwitch(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  switchItem: any
) {
  let switchElem = dom.window.document.createElement('input')
  switchElem.setAttribute('type', 'checkbox')
  switchElem.id = id
  if (className) {
    switchElem.className = className
  }
  if (switchItem.value === 'true') {
    switchElem.toggleAttribute('checked')
  }

  dom.window.document.getElementById(parentName).appendChild(switchElem)
}

function renderSpace(dom: any, parentName: string, id: string) {
  let spaceElem = dom.window.document.createElement('div')
  spaceElem.id = id

  dom.window.document.getElementById(parentName).appendChild(spaceElem)
}

function renderFooter(dom: any, footer: any) {
  let footerElem = dom.window.document.createElement('footer')
  footerElem.id = 'footer'
  if (footer.class) {
    footerElem.className = footer.class
  }
  dom.window.document.getElementsByTagName('body')[0].appendChild(footerElem)
}
function renderFooterTabsItem(
  dom: any,
  parentName: string,
  id: string,
  footerTabsItem: any
) {
  let footerItemElem = dom.window.document.createElement('a')
  footerItemElem.id = id
  if (footerTabsItem.class) {
    footerItemElem.className = footerTabsItem.class
  }
  dom.window.document.getElementById(parentName).appendChild(footerItemElem)
  for (const footerItemComp in footerTabsItem) {
    let className = footerTabsItem[footerItemComp].class
      ? footerTabsItem[footerItemComp].class
      : ''
    if (footerTabsItem[footerItemComp].image) {
      renderImage(
        dom,
        id,
        footerItemComp,
        className,
        footerTabsItem[footerItemComp].image
      )
    }
    if (footerTabsItem[footerItemComp].text) {
      renderLabel(
        dom,
        id,
        footerItemComp,
        className,
        footerTabsItem[footerItemComp].text
      )
    }
    if (footerItemComp === 'url') {
      footerItemElem.href = footerTabsItem.url
    }
    if (footerItemComp === 'href') {
      footerItemElem.href = footerTabsItem.href
    }
  }
}

export {
  renderStyle,
  renderTitle,
  renderHeader,
  renderHeaderTitle,
  renderAdvancedTitle,
  renderSections,
  renderSection,
  renderItems,
  renderComponents,
  renderLabel,
  renderLink,
  renderImage,
  renderButton,
  renderTextfield,
  renderTextarea,
  renderSlider,
  renderSwitch,
  renderSpace,
  renderFooter,
  renderFooterTabsItem,
}
