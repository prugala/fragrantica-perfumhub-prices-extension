import {PageType} from "../enum/page-type";

export interface Provider {
    getData(name: string, page: PageType, id: number): void
    getName(): string
    getCurrency(): string
    getHost(): string
    getApiHost(): string
}