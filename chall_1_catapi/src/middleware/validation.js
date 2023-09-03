/*
Validation of the requests.
For each type we have to validate if the incoming data is correct (nb parameters etc).


Codes:
- 200: Successful request, often a GET
- 400: Bad request (client should modify the request)  -> Missing parameters;
- 500: Server error.
*/

// Validate filter query parameters

/*
exports.validateFilter = (req, res, next) => {
    const { tag, omit, total } = req.query;
    
    if (!tag || !omit || !total) {
        return res.status(400).json({ error: "Missing required query parameters: tag, omit, total" });
    }
    
    next();
};

// Validate match query parameter
exports.validateMatch = (req, res, next) => {
    const { string } = req.query;
    
    if (!string) {
        return res.status(400).json({ error: "Missing required query parameter: string" });
    }
    
    next();
};
*/