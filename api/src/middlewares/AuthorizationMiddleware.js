module.exports = (request, response, next) => {
    const apikey = request.headers["api-key"] || request.query["api-key"];
    console.log(apikey);

    if (apikey == process.env.API_KEY_AUTHORIZATED) {
        next();
        return;
    }

    response.status(401).json({
        message: "The resource is need informate api-key."
    })
    next();
}