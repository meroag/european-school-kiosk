export interface Product {
    ProdCode: string
    ProdAdditionalCode: string
    ProductName: string
    ProductNameENG: string
    ProductNameRUS: string
    IdProdType: number
    ProdType: string
    IdProdSaxeoba: number
    ProdSaxeoba: string
    IdProdGroup: number
    ProdGroup: string
    Fasi1: number
    Fasi2: number
    Fasi3: number
    Fasi4: number
    Fasi5: number
    Fasi6: number
    Fasi7: number
    Fasi8: number
    Fasi9: number
    Fasi11: number
    Fasi12: number
    Fasi13: number
    Fasi14: number
    Fasi15: number
    Fasi16: number
    Fasi17: number
    Fasi18: number
    Fasi19: number
    Fasi20: number
    Fasi10: number
    Shenishvna: string
    FeriCode: number
    FeriName: string
    FormaCode: number
    FormaName: string
    IdFormaGroup: number
    FormaGroup: string
    StiliCode: number
    StiliName: string
    SqesiCode: number
    SqesiName: string
    ZomaCode: number
    ZomaName: string
    Description1: string
    Description2: string
    Description3: string
    DescriptionName: string
    DescriptionENG: string
    DescriptionRUS: string
    IdProdTypeGroup: number
    ProdTypeGroup: string
    Variations: Variation[]
    UnitId: number
    Unit: string
    IsProducedProduct: boolean
    IsActive: boolean
}

export interface Variation {
    VariationCode: string
    VariationName: string
    VariationENG: string
    VariationRUS: string
    VariationPosition: string
    IdProdPicture: string
}
  
export interface ProdGroup {
    IdProdGroup: number
    ProdGroupENG: string;
    ProdGroupName: string;
    ProdGroupRUS: string;
}

export interface ProductsNashti {
    StoreCode: string;
    StoreName: string;
    ProdNashtebi: ProdNashti[]
}

export interface ProdNashti {
    ProdCode: string
    ProdName: string
    Nashti: number
}

export interface SalaroItem {
    SalaroCode: number
    SalaroName: string
}

export interface StoreItem {
    "StoreCode": number,
    "StoreName": string,
    "Address": string,
    "Phone": string,
    "PriceGroup": number,
    "IdStoreGroup": number,
    "StoreGroup": string
}

export interface DriverItem {
    "MdzgoliCode": number,
    "MdzgoliName": string,
    "CarNumber": string,
    "TIN": string,
    "IsCitizen": boolean
}