import { expect } from '@wdio/globals'

import OnboardPage from '../pageobjects/onboard.page.js'
import OnboardCreatePage from '../pageobjects/onboard.create.page.js'
import OnboardSuccessPage from '../pageobjects/onboard.success.page.js'

describe('My second test', () => {
    it('should enter recovery phrase, create password and click "follow us"', async () => {
        //debugger
        await OnboardPage.open()
        //await expect (OnboardPage.btnNewWallet).toHaveText(expect.stringContaining('I need a new wallet'))
        await OnboardPage.getWallet()
        //await expect (OnboardCreatePage.header).toHaveText(expect.stringContaining('Keys to Your Kingdom'))

        const recoveryPhrase = await OnboardCreatePage.getRecoveryPhrase()
        //console.log('Recovery phrase: ' + recoveryPhrase)

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

        await expect (currentUrl).toEqual(url)
        await expect (handles.length).toEqual(2)

        await browser.closeWindow()
        await browser.switchToWindow(handles[0])
        handles = await browser.getWindowHandles()
        await expect (handles.length).toEqual(1)

        let portolioUrl = 'https://solflare.com/portfolio'
        currentUrl = await browser.getUrl()
        await expect (currentUrl).toEqual(portolioUrl)
        
        //await browser.debug()
    })
})

