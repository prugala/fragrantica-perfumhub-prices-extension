import {PageType} from "../enum/page-type";

export class ProductData {
    public static getPage(url: string): PageType {

        if (url.search('fragrantica') !== -1) {
            return PageType.FRAGRANTICA
        } else {
            return PageType.PARFUMO
        }
    }

    public static getId(page: PageType): number {
        if (page === PageType.FRAGRANTICA) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return parseInt(window?.location?.pathname?.match(/(\d+)/)[0])
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return parseInt(document.getElementsByClassName('barfiller_element rating-details')[0].getAttribute('data-p_id'))
        }
    }
}