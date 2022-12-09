import React, {useEffect, useState} from "react";
import {Data} from "../model/data";
import PriceHistory from "./price-history";
import {ProductData} from "../helper/product-data";
import {PageType} from "../enum/page-type";
import ReportPrices from "./report-prices";
import {Provider} from "../provider/provider";

interface Props {
  provider: Provider
}

const Prices: React.FC<Props> = (props) => {
  const [prices, setPrices] = useState(new Data())
  const h1 = document.getElementsByTagName('h1')
  let name = h1[0]?.innerHTML.replace(/<.*>.*?/ig, '')
  name = name.trim()

  const page = ProductData.getPage(window.location.toString())
  const id = ProductData.getId(page)

  if (page === PageType.PARFUMO) {
    const itemPropElement = document.querySelector('span[itemprop="name"]')

    name += ' ' + itemPropElement?.textContent
  }

  const provider = props.provider

  useEffect(() => {
    provider.getData(name.trim(), page, id).then(data => setPrices(data))
  }, [])

  return (
      <div>
        <ReportPrices provider={provider} foundPrices={!!prices.provider} page={page} id={id} />
        {prices?.types?.map((type, i) => {
          return (
              <div key={i}>
                <p><strong>{chrome.i18n.getMessage(type.name.replace(' ', '_'))}</strong> <a target={"_blank"} href={provider.getHost() + type.url} rel="noreferrer">link</a></p>
                <table className={'notes3'} style={{width: '100%'}}>
                  <thead>
                  <tr>
                    <td style={{width: "50%"}}>{chrome.i18n.getMessage("size")}</td>
                    <td style={{width: "50%"}}>{chrome.i18n.getMessage("price")}</td>
                  </tr>
                  </thead>
                  <tbody>
                  {type.sizes.map((size, j) => {
                    return (
                        <tr key={j}>
                          <td>{size.size} ml {size.tester && <span>{chrome.i18n.getMessage("tester")}</span>} {size.set && <span>{chrome.i18n.getMessage("set")}</span>}</td>
                          <td>{size.price} {provider.getCurrency()} ({(size.price/size.size).toFixed(2) + ' '+ provider.getCurrency()}/ml) {size.priceChange != 0 && <span style={{color: size.priceChange > 0 ? 'red' : 'green'}}>{size.priceChange.toFixed(2)}%</span>} <a href={size.prices[0].url} target={"_blank"} rel="noreferrer">link</a> <span style={{float: "right", marginLeft: "1rem"}}>{provider.hasPriceHistory() && <PriceHistory searchData={size}/>}</span></td>
                        </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
          )
        })}
        {prices.provider && <p><i>{chrome.i18n.getMessage("source")}: {provider.getName()}</i></p>}
      </div>
  )
}

export default Prices