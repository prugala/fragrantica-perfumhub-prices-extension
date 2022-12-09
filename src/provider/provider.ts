import {PageType} from "../enum/page-type";
import {Data} from "../model/data";

export interface Provider {
    getData(name: string, page: PageType, id: number): Promise<Data>
    getName(): string
    getCurrency(): string
    getHost(): string
    getApiHost(): string
    hasPriceHistory(): boolean
}