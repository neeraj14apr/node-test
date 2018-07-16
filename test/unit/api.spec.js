let sampleTodos = require('../fixtures/todos.json'),
    should = require('chai').should(),
    expect = require('chai').expect,
    logger = require('../../logger'),
    mocha = require('mocha'),
    appEmitter = require('../../server'),
    utils = require('../../utils'),
    axios = require('axios').default,
    mongoose = require('mongoose'),
    Todo

const APP_ENV = Object.freeze({
    WEB_APP_URL: "BASE_APP_URL"
})

describe("TODO API Testing", function () {
    let webApp = {},
        appURL = ""

    before(function (done) {
        let parsedEnvSettings = utils.loadConfiguration()
        appEmitter.on("getApplication", function (app) {
            webApp = app
            appURL = parsedEnvSettings[APP_ENV.WEB_APP_URL]
            if (!webApp || !appURL) this.skip()
            Todo = mongoose.model('Todo')
            utils.cleanDb(Todo, () => {
                logger.info('Database successfully flushed!')
                done()
            })
        })
        appEmitter.emit("checkApplication")

    })

    after(function (done) {
        utils.cleanDb(Todo, () => {
            mongoose.disconnect()
            setTimeout(done, 1000)
            appEmitter.emit ( "closeApplication" )
            done()
        })
    })

    describe('#POST  api/todos', function () {
        /**
         * Clear database before testing individual functionalities
         */
        beforeEach(function (done) {
            utils.cleanDb(Todo, () => {
                logger.info('Database successfully flushed!')
                done()
            })
        })

        it('Should insert one and fetch all todos',
            function (done) {
                let initialTodoCount = 0,
                    sampleTodo = (sampleTodos && sampleTodos[0])
                if (sampleTodo) {
                    let insertOptions = {
                        url: 'api/todos',
                        method: 'post',
                        baseURL: appURL,
                        data: {
                            text: sampleTodo.text,
                            done: false
                        },
                        validateStatus: (status) => {
                            return status >= 200 && status < 300
                        },
                        timeout: 5000
                    }
                    insertSingleTodo(insertOptions, sampleTodo)
                        .then((todos) => {
                            should.exist(todos)
                            expect(todos).to.be.an.instanceOf(Array)
                            expect(todos).to.have.length.above(0)
                            done()
                        }).catch((error) => {
                            logger.error(error)
                            done(error)
                        })
                }
            })
    })

    let insertSingleTodo = (requestOptions, todo) => {
        return new Promise((resolve, reject) => {
            axios(requestOptions)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

})