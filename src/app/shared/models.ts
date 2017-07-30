
export class Product{
    productId:string;
    productImage:String;
    productCurrentPrice:Number;
    productShortDescription:String;
    productLongDescription:String;
    productCategory:String;
    productViews:Number;
    timeSpentViewing:Number;
    productWishes:Number;
    productFeatures:Array<String>=[];
    productBrand:String;
    productPriceArray:Array<Number>=[];
    productComments:Array<String>=[];
    productRating:ProductRating;
    productInCarts:number;
    productInWishLists:number=0;

}

export class ProductRating{
    fiveStar:Number;
    fourStar:Number;
    threeStar:Number;
    twoStar:Number;
    oneStar:Number;
    zeroStar:Number;
}