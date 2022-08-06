import joi from "joi";

const postUrlSchema = joi.object(
    {
        url: joi.string().required()
    }
);

export default postUrlSchema;