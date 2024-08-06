import { NextResponse } from "next/server";

// Define error type enum
export enum ErrorTypes {
  // 4xx Client Errors
  BAD_REQUEST = "badRequest",
  UNAUTHORIZED = "unauthorized",
  PAYMENT_REQUIRED = "paymentRequired",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "notFound",
  METHOD_NOT_ALLOWED = "methodNotAllowed",
  NOT_ACCEPTABLE = "notAcceptable",
  PROXY_AUTHENTICATION_REQUIRED = "proxyAuthenticationRequired",
  REQUEST_TIMEOUT = "requestTimeout",
  CONFLICT = "conflict",
  GONE = "gone",
  LENGTH_REQUIRED = "lengthRequired",
  PRECONDITION_FAILED = "preconditionFailed",
  PAYLOAD_TOO_LARGE = "payloadTooLarge",
  URI_TOO_LONG = "uriTooLong",
  UNSUPPORTED_MEDIA_TYPE = "unsupportedMediaType",
  RANGE_NOT_SATISFIABLE = "rangeNotSatisfiable",
  EXPECTATION_FAILED = "expectationFailed",
  I_AM_A_TEAPOT = "iAmATeapot",
  MISDIRECTED_REQUEST = "misdirectedRequest",
  UNPROCESSABLE_ENTITY = "unprocessableEntity",
  LOCKED = "locked",
  FAILED_DEPENDENCY = "failedDependency",
  TOO_EARLY = "tooEarly",
  UPGRADE_REQUIRED = "upgradeRequired",
  PRECONDITION_REQUIRED = "preconditionRequired",
  TOO_MANY_REQUESTS = "tooManyRequests",
  REQUEST_HEADER_FIELDS_TOO_LARGE = "requestHeaderFieldsTooLarge",
  UNAVAILABLE_FOR_LEGAL_REASONS = "unavailableForLegalReasons",

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = "internalServerError",
  NOT_IMPLEMENTED = "notImplemented",
  BAD_GATEWAY = "badGateway",
  SERVICE_UNAVAILABLE = "serviceUnavailable",
  GATEWAY_TIMEOUT = "gatewayTimeout",
  HTTP_VERSION_NOT_SUPPORTED = "httpVersionNotSupported",
  VARIANT_ALSO_NEGOTIATES = "variantAlsoNegotiates",
  INSUFFICIENT_STORAGE = "insufficientStorage",
  LOOP_DETECTED = "loopDetected",
  NOT_EXTENDED = "notExtended",
  NETWORK_AUTHENTICATION_REQUIRED = "networkAuthenticationRequired",
}

// List of error objects
const errorResponses: {
  [key in ErrorTypes]: { statusCode: number; message: string };
} = {
  // 4xx Client Errors
  [ErrorTypes.BAD_REQUEST]: { statusCode: 400, message: "Bad Request" },
  [ErrorTypes.UNAUTHORIZED]: { statusCode: 401, message: "Unauthorized" },
  [ErrorTypes.PAYMENT_REQUIRED]: {
    statusCode: 402,
    message: "Payment Required",
  },
  [ErrorTypes.FORBIDDEN]: { statusCode: 403, message: "Forbidden" },
  [ErrorTypes.NOT_FOUND]: { statusCode: 404, message: "Not Found" },
  [ErrorTypes.METHOD_NOT_ALLOWED]: {
    statusCode: 405,
    message: "Method Not Allowed",
  },
  [ErrorTypes.NOT_ACCEPTABLE]: { statusCode: 406, message: "Not Acceptable" },
  [ErrorTypes.PROXY_AUTHENTICATION_REQUIRED]: {
    statusCode: 407,
    message: "Proxy Authentication Required",
  },
  [ErrorTypes.REQUEST_TIMEOUT]: { statusCode: 408, message: "Request Timeout" },
  [ErrorTypes.CONFLICT]: { statusCode: 409, message: "Conflict" },
  [ErrorTypes.GONE]: { statusCode: 410, message: "Gone" },
  [ErrorTypes.LENGTH_REQUIRED]: { statusCode: 411, message: "Length Required" },
  [ErrorTypes.PRECONDITION_FAILED]: {
    statusCode: 412,
    message: "Precondition Failed",
  },
  [ErrorTypes.PAYLOAD_TOO_LARGE]: {
    statusCode: 413,
    message: "Payload Too Large",
  },
  [ErrorTypes.URI_TOO_LONG]: { statusCode: 414, message: "URI Too Long" },
  [ErrorTypes.UNSUPPORTED_MEDIA_TYPE]: {
    statusCode: 415,
    message: "Unsupported Media Type",
  },
  [ErrorTypes.RANGE_NOT_SATISFIABLE]: {
    statusCode: 416,
    message: "Range Not Satisfiable",
  },
  [ErrorTypes.EXPECTATION_FAILED]: {
    statusCode: 417,
    message: "Expectation Failed",
  },
  [ErrorTypes.I_AM_A_TEAPOT]: { statusCode: 418, message: "I'm a teapot" },
  [ErrorTypes.MISDIRECTED_REQUEST]: {
    statusCode: 421,
    message: "Misdirected Request",
  },
  [ErrorTypes.UNPROCESSABLE_ENTITY]: {
    statusCode: 422,
    message: "Unprocessable Entity",
  },
  [ErrorTypes.LOCKED]: { statusCode: 423, message: "Locked" },
  [ErrorTypes.FAILED_DEPENDENCY]: {
    statusCode: 424,
    message: "Failed Dependency",
  },
  [ErrorTypes.TOO_EARLY]: { statusCode: 425, message: "Too Early" },
  [ErrorTypes.UPGRADE_REQUIRED]: {
    statusCode: 426,
    message: "Upgrade Required",
  },
  [ErrorTypes.PRECONDITION_REQUIRED]: {
    statusCode: 428,
    message: "Precondition Required",
  },
  [ErrorTypes.TOO_MANY_REQUESTS]: {
    statusCode: 429,
    message: "Too Many Requests",
  },
  [ErrorTypes.REQUEST_HEADER_FIELDS_TOO_LARGE]: {
    statusCode: 431,
    message: "Request Header Fields Too Large",
  },
  [ErrorTypes.UNAVAILABLE_FOR_LEGAL_REASONS]: {
    statusCode: 451,
    message: "Unavailable For Legal Reasons",
  },

  // 5xx Server Errors
  [ErrorTypes.INTERNAL_SERVER_ERROR]: {
    statusCode: 500,
    message: "Internal Server Error",
  },
  [ErrorTypes.NOT_IMPLEMENTED]: { statusCode: 501, message: "Not Implemented" },
  [ErrorTypes.BAD_GATEWAY]: { statusCode: 502, message: "Bad Gateway" },
  [ErrorTypes.SERVICE_UNAVAILABLE]: {
    statusCode: 503,
    message: "Service Unavailable",
  },
  [ErrorTypes.GATEWAY_TIMEOUT]: { statusCode: 504, message: "Gateway Timeout" },
  [ErrorTypes.HTTP_VERSION_NOT_SUPPORTED]: {
    statusCode: 505,
    message: "HTTP Version Not Supported",
  },
  [ErrorTypes.VARIANT_ALSO_NEGOTIATES]: {
    statusCode: 506,
    message: "Variant Also Negotiates",
  },
  [ErrorTypes.INSUFFICIENT_STORAGE]: {
    statusCode: 507,
    message: "Insufficient Storage",
  },
  [ErrorTypes.LOOP_DETECTED]: { statusCode: 508, message: "Loop Detected" },
  [ErrorTypes.NOT_EXTENDED]: { statusCode: 510, message: "Not Extended" },
  [ErrorTypes.NETWORK_AUTHENTICATION_REQUIRED]: {
    statusCode: 511,
    message: "Network Authentication Required",
  },
};

// Function to handle sending error responses
export function handleErrorResponse(errorType: ErrorTypes) {
  const error =
    errorResponses[errorType] ||
    errorResponses[ErrorTypes.INTERNAL_SERVER_ERROR];
  return NextResponse.json(
    { error: error.message },
    { status: error.statusCode },
  );
}
