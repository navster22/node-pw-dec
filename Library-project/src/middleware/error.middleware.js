const errorHandler = (err, req, res, next) => {
    console.log(err);

    if(err.name === "ValidationError") {
        return res.status(400).render("error", {
            title: "Validation error",
            message: Object.values(err.errors).map(error => error.message).join(", ")
        })
    }

    if(err.name === "CastError") {
        return res.status(400).render("error", {
            title: "Invalid ID",
            message: "The provided ID is invalid"
        })
    }

    res.status(500).render("error", {
        rirle: "server error",
        message: "Something went wrong"
    })
}

module.exports = errorHandler;