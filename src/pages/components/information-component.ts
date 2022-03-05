import { Locator } from "playwright-core"

export class Information {
    readonly condition: Locator
    readonly vin: Locator
    readonly odometer: Locator
    readonly extIntColor: Locator
    readonly seller: Locator
    readonly pickUpLocation: Locator

    constructor(
        condition: Locator,
        vin: Locator,
        odometer: Locator,
        extIntColor: Locator,
        seller: Locator,
        pickUpLocation: Locator) {
            this.condition = condition
            this.vin = vin
            this.odometer = odometer
            this.extIntColor = extIntColor
            this.seller = seller
            this.pickUpLocation = pickUpLocation
        }

}