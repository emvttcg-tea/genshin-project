/* eslint-disable no-undef */
/* eslint-disable quotes */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('.../app')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe("Make sure that status is 200", () => {
  it("should return 200", (done) => {
    chai.request(app)
      .get('/')
      .end((_err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})
