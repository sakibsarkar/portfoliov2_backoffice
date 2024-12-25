import { ZodError, ZodIssue } from "zod";
import { IErrorSources, IGenericErrorRes } from "../interface/error.interface";

const handleZodError = (err: ZodError): IGenericErrorRes => {
  const errorSources: IErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1].toString(),
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
