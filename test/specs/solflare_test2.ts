import { expect } from '@wdio/globals'

import OnboardPage from '../pageobjects/onboard.page.js'
import OnboardCreatePage from '../pageobjects/onboard.create.page.js'
import OnboardSuccessPage from '../pageobjects/onboard.success.page.js'

describe('My second test', () => {
    it('should enter recovery phrase, create password and click "follow us"', async () => {
        
        //open page, read and enter recovery phrase, enter password
        await OnboardPage.open()

        await OnboardPage.getWallet()

        const recoveryPhrase = await OnboardCreatePage.getRecoveryPhrase()

        await OnboardCreatePage.phraseSaved()

        await OnboardCreatePage.enterRecoveryPhrase(recoveryPhrase)

        await OnboardCreatePage.Continue()

        let password = 'test123'
        await OnboardCreatePage.enterPassword(password)
        await OnboardCreatePage.Continue()

        await OnboardSuccessPage.followUs()

        let url = 'https://x.com/solflare'
        let currentUrl = await browser.getUrl()
        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        currentUrl = await browser.getUrl()

        //verify that current url is X and opened in second tab
        await expect (currentUrl).toEqual(url)
        await expect (handles.length).toEqual(2)

        await browser.closeWindow()
        await browser.switchToWindow(handles[0])
        handles = await browser.getWindowHandles()

        //verify that second tab was closed
        await expect (handles.length).toEqual(1)

        let portolioUrl = 'https://solflare.com/portfolio'
        currentUrl = await browser.getUrl()

        //verify that portfolio is loaded after returning from second X tab
        await expect (currentUrl).toEqual(portolioUrl)
        
    })
})

