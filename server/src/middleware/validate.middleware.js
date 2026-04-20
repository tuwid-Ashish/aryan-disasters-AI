export function validate(schema) {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }

    const errors = schema(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    return next();
  };
}

