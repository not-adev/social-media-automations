import cron from 'node-cron'
import { polling } from './helper/polling.js'

export default async function polling_for_scheduling() {

    cron.schedule('*/30 * * * * *', async () => {
        console.log('scheduler called ')
       await polling()
    })
}