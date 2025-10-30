export interface INasaItemData{
    title:string;
    keywords:string[];
    descrption:string;

}
export interface INasaItemLink{
    href:string;
}

export interface INasaItem{
    data:INasaItemData[];
    links:INasaItemLink[];
}
export interface INasaItemColection{
    items:INasaItem[];
}

export interface INasaItemSearchResponse{

collection:INasaItemColection;
}