import { expect } from '@wdio/globals'

import OnboardPage from '../pageobjects/onboard.page.js'
import OnboardCreatePage from '../pageobjects/onboard.create.page.js'

describe('My first test', () => {
    it('should copy new wallet recovery phrase', async () => {

        await OnboardPage.open()
        //await expect (OnboardPage.btnNewWallet).toHaveText(expect.stringContaining('I need a new wallet'))
        await OnboardPage.getWallet()
        //await expect (OnboardCreatePage.header).toHaveText(expect.stringContaining('Keys to Your Kingdom'))
        await OnboardCreatePage.copyPhrase()
        
        // set clipboard permissions
        await browser.setPermissions({ name: 'clipboard-read' }, 'granted');
        // now you can read the clipboard via, e.g.
        const clipboardText = await browser.execute(() => navigator.clipboard.readText());
        const clipboardList = clipboardText.split(' ')

        const recoveryPhrase = await OnboardCreatePage.getRecoveryPhrase()

        //verify that copied recovery phrase is equal to one visible on screen
        await expect (clipboardList).toEqual(recoveryPhrase)
        
        //await browser.debug()
    })
})

