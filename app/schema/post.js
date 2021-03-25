const Joi = require('joi');

// use JOI t0 perfom the external validations
module.exports = {
    postSchema: Joi.object({
        content: Joi.string().messages({
            "string.base": `field should be a String`,
          }),
          media: Joi.string().messages({
            "string.base": `field should be a String`,
          }),
    }),
    reactionSchema: Joi.object({
        id: Joi.string().required().messages({
            "string.base": `field should be a String`,
            "any.required": `id is required`
          }),
    })
};