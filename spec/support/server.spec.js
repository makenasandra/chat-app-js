const request = require('request')

//1st spec
describe('calc', () => {
    it('should multiply 4 and 6', () => {
        expect(4*6).toBe(24)
    })
})


describe('get message', () => {
    //2nd spec
    it('should return status code 200', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    //3rd spec
    it('should return list of messages', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

//4th and 5th spec
describe('get messages from user', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3000/messages/ruth', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be ruth', (done) => {
        request.get('http://localhost:3000/messages/ruth', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('ruth')
            done()
        })
    })
})
