
export class Product{
    productId:string;
    productName:string;
    productImage:String;
    productDiscount:number;
    productActualPrice:number;
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
    parentSubCategory:string;
    parentCateogry:string;
    parentDepartment:string;

}

export class ProductRating{
    fiveStar:Number;
    fourStar:Number;
    threeStar:Number;
    twoStar:Number;
    oneStar:Number;
    zeroStar:Number;
}