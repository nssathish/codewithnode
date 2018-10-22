function logger(req,res,next) {
    console.log('logging')
    next() // this states that the middleware's next function/middlerware to be called
}

module.exports = logger