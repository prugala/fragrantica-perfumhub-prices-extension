import React from 'react'
import { render } from 'react-dom'
import ProviderTabs from "./provider-tabs";
const appElement = document.createElement('div')
appElement.id = 'prices-box'
render(<ProviderTabs/>, appElement)

const ratingElement = document.getElementById('rating')
const optionsElement = document.getElementById('p_options_holder')
ratingElement?.parentNode?.insertBefore(appElement, ratingElement?.nextSibling)
optionsElement?.parentNode?.insertBefore(appElement, optionsElement?.nextSibling)