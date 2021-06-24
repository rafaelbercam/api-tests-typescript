import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' });

module.exports = {
    url: `${process.env.PROD}`
}