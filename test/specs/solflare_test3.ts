import { expect } from '@wdio/globals'

import OnboardPage from '../pageobjects/onboard.page.js'
import OnboardCreatePage from '../pageobjects/onboard.create.page.js'
import OnboardSuccessPage from '../pageobjects/onboard.success.page.js'
import PortolioPage from '../pageobjects/portolio.page.js'
import WalletManagementPage from '../pageobjects/wallet.management.page.js'
import WalletManagementOptionsPage from '../pageobjects/wallet.management.options.page.js'

describe('My third test', () => {
    it('should create new wallet and manage wallets', async () => {

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

        await OnboardSuccessPage.letsGo()
        
        await PortolioPage.openWallets()

        let wallets = await WalletManagementPage.getWallets()

        let main = 'Main Wallet'
        let numWallets = await wallets.length
        let mainExists = false

        //wallet list is sometimes fetched before fully initialized, this code waits for main wallet to be visible
        await wallets[0].waitUntil(async function () {
            return (await wallets[0].getText()) !== ''
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        })

        for (let i = 0; i < numWallets; i++) {
            let text = await wallets[i].getText()
            if (text === main) {
                mainExists = true
                break
            }
        }

        //verify that main wallet is displayed
        await expect(mainExists).toEqual(true);

        await wallets[numWallets-1].click()

        let walletOptions = await WalletManagementOptionsPage.walletManagement()

        await walletOptions[1].click()

        let walletAddresses = await WalletManagementOptionsPage.getWallets()

        //same as above, wait for all wallets to be loaded/shown
        await walletAddresses[0].waitUntil(async function () {
            walletAddresses = await WalletManagementOptionsPage.getWallets()
            return (await walletAddresses.length) !== 1
        }, {
            timeout: 5000,
            timeoutMsg: 'expected more wallets after 5s'
        })

        walletAddresses = await WalletManagementOptionsPage.getWallets()
        let isChecked = await walletAddresses[0].getAttribute("data-state")
        //verify that first wallet toggle is on and disabled
        await expect (walletAddresses[0]).toBeDisabled()
        await expect (isChecked).toEqual('checked')

        await walletAddresses[2].click()
        await walletAddresses[3].click() 

        let saveButton = await WalletManagementOptionsPage.saveButton()
        await saveButton.click()


        let oldWalletsNum = await wallets.length

        wallets = await WalletManagementPage.getWallets()
        await browser.waitUntil(async function () {
            wallets = await WalletManagementPage.getWallets()
            return (await wallets.length) !== 0
        }, {
            timeout: 5000,
            timeoutMsg: 'expected more wallets after 5s'
        })

        let newWalletsNum = wallets.length

        //verify that two additional wallets are visible compared to before
        await expect(newWalletsNum).toEqual(oldWalletsNum + 2)
    })
})

