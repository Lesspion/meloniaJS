module.exports = function (schema) {
    return {
        name: { type: schema.String, limit: 255},
        info: { type: schema.JSON, "null": true }
    }
};