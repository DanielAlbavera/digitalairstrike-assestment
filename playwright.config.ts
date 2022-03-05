import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'Google Chrome',
            use: {
                browserName: 'chromium',
                channel: 'chrome'
            }
        }
    ]

}

export default config