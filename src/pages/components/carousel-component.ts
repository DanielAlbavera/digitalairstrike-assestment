import { Locator } from "playwright-core"

export class Carousel {
    readonly topLabel: Locator
    readonly imageCount: Locator
    readonly leftCarouselNavButton: Locator
    readonly rightCarouselNavButton: Locator
    readonly leftThumbnailNavButton: Locator
    readonly rightThumbnailNavButton: Locator
    readonly carouselCurrentIMage: Locator
    readonly thumbnailImages: Locator
    readonly filteringButtons: Locator

    constructor(
        topLabel: Locator,
        imageCount: Locator,
        leftCarouselNavButton: Locator, 
        rightCarouselNavButton: Locator, 
        leftThumbnailNavButton: Locator, 
        rightThumbnailNavButton: Locator,
        carouselCurrentIMage: Locator,
        thumbnailImages: Locator,
        filteringButtons: Locator) {
            this.topLabel = topLabel
            this.imageCount = imageCount
            this.leftCarouselNavButton = leftCarouselNavButton
            this.rightCarouselNavButton = rightCarouselNavButton 
            this.leftThumbnailNavButton = leftThumbnailNavButton
            this.rightThumbnailNavButton = rightThumbnailNavButton
            this.carouselCurrentIMage = carouselCurrentIMage
            this.thumbnailImages = thumbnailImages
            this.filteringButtons = filteringButtons
       }


}