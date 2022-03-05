import { Locator, Page } from "playwright-core";
import { BasePage } from "./base-page";
import { Carousel } from "./components/carousel-component";
import { Information } from "./components/information-component";

export class HomePage extends BasePage {

    readonly logoImage: Locator
    readonly priceText: Locator
    readonly buyNowButton: Locator
    readonly copyRightDisclamer: Locator
    readonly carousel: Carousel
    readonly information: Information


    constructor(page:Page) {
        super(page)
        this.logoImage = page.locator('.headerLogo')
        this.priceText = page.locator('#main h2 span').first()
        this.buyNowButton = page.locator('a.blue-btn')
        this.copyRightDisclamer = page.locator('span#cp')
        
        this.information = new Information(
            page.locator('div.row:nth-child(1) span + span'),
            page.locator('div.row:nth-child(2) span + span'),
            page.locator('div.row:nth-child(3) span + span'),
            page.locator('div.row:nth-child(4) span + span'),
            page.locator('div.row:nth-child(5) span + span'),
            page.locator('div.row:nth-child(6) span + span'))
        
        this.carousel = new Carousel(
            page.locator('.svfy_desc.svfy_act span'),
            page.locator('span.svfy_count'),
            page.locator('.svfy_padd_prev .svfy_a_prev'),
            page.locator('.svfy_padd_next .svfy_a_next'),
            page.locator('.svfy_carousel .svfy_a_prev'),
            page.locator('.svfy_carousel .svfy_a_next'),
            page.locator('img.svfy_ti').first(),
            page.locator('.svfy_scroller > div'),
            page.locator('.svfy_cats > a'))
    }

}