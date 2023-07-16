import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiDom from 'chai-dom'
import dotenv from 'dotenv'

chai.use(chaiHttp)
chai.use(chaiDom)

const should = chai.should()

process.env.NODE_ENV = 'testing'
dotenv.config({ path: `.env-testing` })

// load app after env
const app = (await import('../../app.mjs')).app

describe('GET /', () => {
    it('should return 404 page', async () => {
        const response = await chai.request(app).get('/details/wrong_id')
        response.should.have.status(404)
    })
})
