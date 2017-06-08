
const verifyAdminScope = (ctx, next) => {
    const { scope } = ctx.state.jwtData 
    if (scope.indexOf('ADMsIN') > -1) {
        return next()
    } else {
        let err = new Error('Access origin error');
        err.status = 401;
        err.message = 'User does not have the correct rights to access this';
        throw err;
    }
}

module.exports = verifyAdminScope;