import { test, expect } from '@playwright/test'
import { HomePage } from '../src/pages/home-page'
import { URLS } from '../src/data/constants'

test.describe('Home Page Tests', async () => {
    let homePage: HomePage

    let condition: string
    let vin: string
    let extIntColor: string
    let seller: string
    let pickUpLocation: string
    let mobileCondition: string
    let mobileVin: string
    let mobileeEtIntColor: string
    let mobileSeller: string
    let mobilePickUpLocation: string

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        condition = ''
        vin = ''
        extIntColor = ''
        seller = ''
        pickUpLocation = ''
        mobileCondition = ''
        mobileVin = ''
        mobileeEtIntColor = ''
        mobileSeller = ''
        mobilePickUpLocation = ''

        //1.- Navigate to Home Page
        await page.goto(URLS.BASE)
    })

    test('TC001_Validate_Logo_Button_Functionality', async ({ page, request }) => {
        await test.step('2.- Validate that "Digital Air Strike" Logo is displayed', async () => {
            const response = request.get(await homePage.logoImage.getAttribute('src'))
            expect.soft((await response).status(), '"Digital Air Strike" Logo is not loaded').toBe(200)
        })    
        await test.step('3.- Click on "Digital Air Strike" Logo', async () => {
            await homePage.logoImage.click()
        await expect(page, '"Digital Air Strike" Landing Page is not displayed').toHaveURL(URLS.HOME_PAGE)
        })
    })

    test('TC002_Validate_Carousel_Functionality', async ({ page }) => {
        await test.step('2.- Verify the total amount of pictures in the carousel', async () => {
            let totalImages = (await homePage.carousel.imageCount.innerText()).split('/')[1]
        })
        await test.step('3.- Verify that the "Right Navigation Carousel" Button is displayed', async () => {
           expect.soft(await homePage.carousel.rightCarouselNavButton.isVisible()).toBe(false)
        })
        await test.step('4.- Click on "Right Navigation Carousel" Button until reach the last picture in the carousel', async () => {
            for (let index = 0; index <  await homePage.carousel.thumbnailImages.count(); index++) {
                await homePage.carousel.rightCarouselNavButton.click()
                expect((await homePage.carousel.imageCount.innerText()).split('/')[0]).toBe(index.toString())
            }
        })
        await test.step('5.- Click on "Right Navigation Carousel" Button', async () => {
           await homePage.carousel.rightCarouselNavButton.click()
        })
        await test.step('6.- Verify that the "Left Navigation Carousel" Button is displayed', async () => {
           expect(await homePage.carousel.leftCarouselNavButton.isVisible()).toBe(true)
        })
        await test.step('7.- Click on "Left Navigation Carousel" Button', async () => {
           await homePage.carousel.leftCarouselNavButton.click()
        })
        await test.step('8.- Click on "Left Navigation Carousel" Button until reach the first picture in the carousel', async () => {
            for (let index = await homePage.carousel.thumbnailImages.count(); index > 0  ; index--) {
                await homePage.carousel.leftCarouselNavButton.click()
                expect((await homePage.carousel.imageCount.innerText()).split('/')[0]).toBe(index.toString())
            }
        })
        await test.step('9.- Verify that the "Right Navigation Thumbnail" Button is displayed', async () => {
           expect(await homePage.carousel.rightThumbnailNavButton.isVisible()).toBe(true)
        })
        await test.step('10.- Click on "Right Navigation Thumbnail" Button until reach the last picture in the carousel', async () => {
            for (let index = 0; index <  await homePage.carousel.thumbnailImages.count(); index++) {
                await homePage.carousel.rightThumbnailNavButton.click()
                expect((await homePage.carousel.imageCount.innerText()).split('/')[0]).toBe(index.toString())
            }
        })
        await test.step('11.- Click on "Right Navigation Thumbnail" Button', async () => {
           await homePage.carousel.rightThumbnailNavButton.click()
        })
        await test.step('12.- Verify that the "Left Navigation Thumbnail" Button is displayed', async () => {
           expect(await homePage.carousel.leftThumbnailNavButton.isVisible()).toBe(true)
        })
        await test.step('13.- Click on "Left Navigation Thumbnail" Button', async () => {
           homePage.carousel.leftThumbnailNavButton.click()
        })
        await test.step('14.- Click on "Left Navigation Thumbnail" Button until reach the first picture in the carousel', async () => {
            for (let index = await homePage.carousel.thumbnailImages.count(); index > 0  ; index--) {
                await homePage.carousel.leftThumbnailNavButton.click()
                expect((await homePage.carousel.imageCount.innerText()).split('/')[0]).toBe(index.toString())
            }
        })
    })
    test('TC003_Validate_Carousel_Pictures_Matches_Their_Labels', async ({ page }) => {
        await test.step('2.- Hover the mouse to the first picture thumbnail in the carousel', async () => {
            await homePage.carousel.thumbnailImages.nth(0).click()
            await homePage.carousel.thumbnailImages.nth(0).hover()
            expect.soft(await homePage.carousel.topLabel.innerText()).toBe(await homePage.carousel.thumbnailImages.nth(0).getAttribute('tip'))
        })
        await test.step('3.- Validate that another label is displayed above the current carousel picture with the same value as the thumbnail label', async () => {
            expect(await homePage.carousel.topLabel.isVisible()).toBe(true)
        })
        await test.step('4.- Repeat steps 1 to 2 for each picture in the carousel', async () => {
            for (let index = 1 ; await homePage.carousel.thumbnailImages.count() < index; index++) {
                await homePage.carousel.thumbnailImages.nth(index).click()
                await homePage.carousel.thumbnailImages.nth(index).hover()
                expect.soft(await homePage.carousel.topLabel.innerText()).toBe(await homePage.carousel.thumbnailImages.nth(index).getAttribute('tip'))
            }
        })
    })
    test('TC005_Validate_Carousel_Filtering_Buttons', async ({ page }) => {
        await test.step('2.- Validate that "Filtering  Buttons are displayed below the carousel', async () => {
            for (let index = 0; index < await homePage.carousel.filteringButtons.count() ; index++) {
                expect(await homePage.carousel.filteringButtons.nth(index).isVisible()).toBe(true)
            }
        })
        await test.step('3.- Go throght all the "Filtering" Buttons and validate the "data-name" attribute matches the text displayed in the Button', async () => {
            for (let index = 0; index < await homePage.carousel.filteringButtons.count() ; index++) {
                expect((await homePage.carousel.filteringButtons.nth(index).innerText()).includes(await homePage.carousel.filteringButtons.nth(index).getAttribute('data-name'))).toBe(true)
            }
        })
    })
    test('TC006_Validate_Pictures_Displayed_By_Filtering_Buttons', async ({ page }) => {
        await test.step('2.- Validate that All the "Filtering" Buttons have a text label with the amount of pictures displayed. Example Filtering (N)', async () => {
            for (let index = 0; index < await homePage.carousel.filteringButtons.count() ; index++) {
                let regex = /\([0-9]\)/
                let buttonText = await homePage.carousel.filteringButtons.nth(index).innerText()
                expect(regex.test(buttonText)).toBe(true)
            }
        })
        await test.step('3.- Click on the "ALL Filtering" Button', async () => {
            await homePage.carousel.filteringButtons.first().click()
        })
        await test.step('4.- Go through all the remaining filtering buttons and validate that the sum of all the number of pictures matches the total amount displayed by "ALL"', async () => {
            let totalPictures = await homePage.carousel.thumbnailImages.count()
            let sumOfPictrues: number
            sumOfPictrues = 0
            for (let index = 1; index < await homePage.carousel.filteringButtons.count() ; index++) {
                await homePage.carousel.filteringButtons.nth(index).click()
                sumOfPictrues += await homePage.carousel.thumbnailImages.count()
            }
            expect(totalPictures).toBe(sumOfPictrues)
        })
    })
    test('TC007_Validate_Price_Label_Format', async ({ page }) => {
        await test.step('2.- Validate that the text inside the h2 label follows the Format: ${YEAR} ${BRAND} ${MODEL} From ${PRICE} (With following format: $x,xxx,xxx) separated by comma', async () => {
            let regex = /$\d{3},\d{3}/
            let price = await homePage.priceText.innerText()
            let newPrice = price.replace(/\d+/g, '')
            expect(regex.test(newPrice)).toBe(true)
        })

    })
    test('TC009_Validate_Buy_Now_Button_Functionality', async ({ page }) => {
        await test.step('2.- Click on "BUY NOW" Button', async () => {
            await homePage.buyNowButton.click()
            expect(page.url()).toBe(URLS.HOME_PAGE)
        })

    })
    test('TC010_Validate_information_Labels_On_Mobile_Viewport', async ({ page }) => {
        await test.step('2.- Save the information displayed in the "Information" Container', async () => {
            condition = await homePage.information.condition.innerText()
            vin = await homePage.information.vin.innerText()
            extIntColor = await homePage.information.extIntColor.innerText()
            seller = await homePage.information.seller.innerText()
            pickUpLocation = await homePage.information.pickUpLocation.innerText()
        })
        await test.step('3.- Change the Window size to emulate a mobile device. Example: 360x740', async () => {
            page.setViewportSize({ width: 360, height: 720 })
            await homePage.copyRightDisclamer.scrollIntoViewIfNeeded()
        })
        await test.step('4.- Validate that the information displayed in the "Information Component" on Desktop vs Mobile matches', async () => {
            mobileCondition = await homePage.information.condition.innerText()
            mobileVin = await homePage.information.vin.innerText()
            mobileeEtIntColor = await homePage.information.extIntColor.innerText()
            mobileSeller = await homePage.information.seller.innerText()
            mobilePickUpLocation = await homePage.information.pickUpLocation.innerText()
            expect(condition).toBe(mobileCondition)
            expect(vin).toBe(mobileVin)
            expect(extIntColor).toBe(mobileeEtIntColor)
            expect(seller).toBe(mobileSeller)
            expect(pickUpLocation).toBe(mobilePickUpLocation)
        })
    })
    test('TC011_Validate_Copyright_Disclaimer ', async ({ page }) => {
        await test.step('2.- Scroll down to the bottom of the page', async () => {
            await homePage.copyRightDisclamer.scrollIntoViewIfNeeded()
        })
        await test.step('3.- Validate that the copyright disclaimer matches the following format: Copyright © ${CURRENT_YEAR} DigitalAirStrike Inc.', async () => {
            let currentYear: number
            currentYear = new Date().getFullYear()
            expect((await homePage.copyRightDisclamer.innerText()).match(`Copyright © ${currentYear} DigitalAirStrike Inc.`)).toBe(true)
        })
    })
    test('TC0012_API_Validate_Logo_Image_Status_Code ', async ({ request }) => {
        await test.step('2.- Scroll down to the bottom of the page', async () => {
            const response = request.get(await homePage.logoImage.getAttribute('src'))
            expect.soft((await response).status(), '"Digital Air Strike" Logo is not loaded').toBe(200)
        })
    })
})