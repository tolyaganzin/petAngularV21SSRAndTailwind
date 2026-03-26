export const HTTP_MESSAGE_OPTIONS = {
  None: "None",
  // Client errors - 4xx
  BadRequest: "BadRequest", // 400
  Unauthorized: "Unauthorized", // 401
  Forbidden: "Forbidden", // 403
  NotFound: "NotFound", // 404
  TooManyRequests: "TooManyRequests", // 429
  // Server errors - 5xx
  InternalServerError: "InternalServerError", // 500
  NotImplemented: "NotImplemented", // 501
  BadGateway: "BadGateway", // 502
  ServiceUnavailable: "ServiceUnavailable", // 503
  GatewayTimeout: "GatewayTimeout", // 504
  // Connection errors
  ServerUnreachable: "ServerUnreachable", // Status 0 - Network error
  SomethingWentWrong: "SomethingWentWrong", // Generic fallback
} as const;