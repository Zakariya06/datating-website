export const errorCodes = {
  // If request body cannot be decoded following the Content-Encoding header value
  ERR_REQUEST_DECODING_FAILED: 'ERR_REQUEST_DECODING_FAILED',
  // If encoder cannot encode the response
  ERR_RESPONSE_ENCODING_FAILED: 'ERR_RESPONSE_ENCODING_FAILED',
  // If request body cannot be decoded
  ERR_REQUEST_BODY_DECODING_ERROR: 'ERR_REQUEST_BODY_DECODING_ERROR',
  // If URI is missing the API version
  ERR_UNRECOGNIZED_API_VERSION: 'ERR_UNRECOGNIZED_API_VERSION',

  // If there are assertion errors in the input data
  ERR_INPUT_ASSERTION_FAILED: 'ERR_INPUT_ASSERTION_FAILED',
  // If a 404 error occurs, but only for wrong endpoints; not found resources will have a different error
  ERR_ENDPOINT_NOT_FOUND: 'ERR_ENDPOINT_NOT_FOUND',
  // When accessing an endpoint with a not-allowed method
  ERR_METHOD_NOT_ALLOWED: 'ERR_METHOD_NOT_ALLOWED',
  // If an unhandled error occurs; contact the dev if this happens
  ERR_INTERNAL_SERVER_ERROR: 'ERR_INTERNAL_SERVER_ERROR',
  // If an unhandled exception occurs; contact the dev if this happens
  ERR_UNHANDLED_EXCEPTION: 'ERR_UNHANDLED_EXCEPTION',

  // When facebook token is missing from the registration request
  ERR_FACEBOOK_TOKEN_REQUIRED: 'ERR_FACEBOOK_TOKEN_REQUIRED',
  // When facebook scopes are missing so we cannot fetch all necessary data
  ERR_FACEBOOK_REQUIRED_SCOPES_MISSING: 'ERR_FACEBOOK_REQUIRED_SCOPES_MISSING',
  // When facebook token expires
  ERR_FACEBOOK_TOKEN_NOT_VALID: 'ERR_FACEBOOK_TOKEN_NOT_VALID',

  // When username is missing from the registration request
  ERR_USERNAME_REQUIRED: 'ERR_USERNAME_REQUIRED',
  // When username is not alphanumeric
  ERR_USERNAME_NOT_ALPHANUMERIC: 'ERR_USERNAME_NOT_ALPHANUMERIC',

  // When email is missing from the registration request
  ERR_EMAIL_REQUIRED: 'ERR_EMAIL_REQUIRED',
  // When email is not valid
  ERR_EMAIL_INVALID: 'ERR_EMAIL_INVALID',
  // When trying to login but email is not yet verified
  ERR_EMAIL_NOT_VERIFIED: 'ERR_EMAIL_NOT_VERIFIED',
  // When attempting to change your email address to one that is already in use
  ERR_EMAIL_ALREADY_IN_USE: 'ERR_EMAIL_ALREADY_IN_USE',
  // When attempting to change your email with the address you're currently using
  ERR_NEW_EMAIL_MUST_BE_DIFFERENT: 'ERR_NEW_EMAIL_MUST_BE_DIFFERENT',
  // When attempting to change your email before you have finalized the previous change
  ERR_EMAIL_CHANGE_ALREADY_IN_PROGRESS: 'ERR_EMAIL_CHANGE_ALREADY_IN_PROGRESS',
  // When requesting too many email activations
  ERR_ACTIVATION_REQUESTED_TOO_SOON: 'ERR_ACTIVATION_REQUESTED_TOO_SOON',

  // When password is missing from the registration request
  ERR_PASSWORD_REQUIRED: 'ERR_PASSWORD_REQUIRED',
  // When password is too short
  ERR_PASSWORD_TOO_SHORT: 'ERR_PASSWORD_TOO_SHORT',
  // If user's password has no lower case characters
  ERR_PASSWORD_REQUIRES_LOWER_CASE_CHARACTER: 'ERR_PASSWORD_REQUIRES_LOWER_CASE_CHARACTER',
  // If user's password has no upper case characters
  ERR_PASSWORD_REQUIRES_UPPER_CASE_CHARACTER: 'ERR_PASSWORD_REQUIRES_UPPER_CASE_CHARACTER',
  // If user's password has no digits
  ERR_PASSWORD_REQUIRES_DIGIT: 'ERR_PASSWORD_REQUIRES_DIGIT',
  // If user's password has no special characters
  ERR_PASSWORD_REQUIRES_SPECIAL_CHARACTER: 'ERR_PASSWORD_REQUIRES_SPECIAL_CHARACTER',
  // If the password reset was already requested within the last 5min
  ERR_PASSWORD_RESET_REQUESTED_TOO_RECENTLY: 'ERR_PASSWORD_RESET_REQUESTED_TOO_RECENTLY',

  // If name is not correct
  ERR_NAME_INCORRECT: 'ERR_NAME_INCORRECT',

  // If trying to register an account with an email address that has already been used
  ERR_USER_ALREADY_EXISTS: 'ERR_USER_ALREADY_EXISTS',
  // If trying to login to an account missing a Role::ACTIVE role
  ERR_USER_ACCOUNT_NOT_ACTIVATED: 'ERR_USER_ACCOUNT_NOT_ACTIVATED',
  // If the login fails, possible reasons: incorrect password, incorrect email, user doesn't exist
  ERR_USER_LOGIN_FAILED: 'ERR_USER_LOGIN_FAILED',
  // For action that requires user's correct credentials in order to be executed
  ERR_INCORRECT_CREDENTIALS: 'ERR_INCORRECT_CREDENTIALS',
  // If user was not found
  ERR_USER_NOT_FOUND: 'ERR_USER_NOT_FOUND',
  // If visitor's IP is not accessible for whatever reason
  ERR_COULD_NOT_DETECT_CLIENT_IP: 'ERR_COULD_NOT_DETECT_CLIENT_IP',
  // If user id is  missing
  ERR_USER_ID_REQUIRED: 'ERR_USER_ID_REQUIRED',
  // If user id is not integer
  ERR_USER_ID_MUST_BE_INTEGER: 'ERR_USER_ID_MUST_BE_INTEGER',
  // If user id is not valid
  ERR_USER_ID_INVALID: 'ERR_USER_ID_INVALID',

  // If page number invalid (e.g. a negative value or a zero)
  ERR_PAGE_NUMBER_INVALID: 'ERR_PAGE_NUMBER_INVALID',
  // If page number is provided, but not as an integer
  ERR_PAGE_NUMBER_MUST_BE_NUMERIC: 'ERR_PAGE_NUMBER_MUST_BE_NUMERIC',
  // If page offset invalid (e.g. a negative value)
  ERR_PAGE_OFFSET_INVALID: 'ERR_PAGE_OFFSET_INVALID',
  // If page offset is provided, but not as an integer
  ERR_PAGE_OFFSET_MUST_BE_NUMERIC: 'ERR_PAGE_OFFSET_MUST_BE_NUMERIC',
  // If both page offset and page number are provided
  ERR_PAGE_PROVIDE_EITHER_OFFSET_OR_NUMBER: 'ERR_PAGE_PROVIDE_EITHER_OFFSET_OR_NUMBER',
  // If page number is provided, but not as an integer
  ERR_PAGE_SIZE_MUST_BE_INTEGER: 'ERR_PAGE_SIZE_MUST_BE_INTEGER',
  // If page number invalid (e.g. a negative value or a zero)
  ERR_PAGE_SIZE_INVALID: 'ERR_PAGE_SIZE_INVALID',

  // If token signature verification fails
  ERR_JWT_TOKEN_SIGNATURE_INVALID: 'ERR_JWT_TOKEN_SIGNATURE_INVALID',
  // JWT token is no longer valid (possible reasons: the user logged in on a different device, token expired)
  ERR_JWT_TOKEN_INVALID: 'ERR_JWT_TOKEN_INVALID',

  // If input date format doesn't match the required input
  ERR_DATE_FORMAT_NOT_RECOGNIZED: 'ERR_DATE_FORMAT_NOT_RECOGNIZED',
  // If date range isn't correct
  ERR_DATE_RANGE_INCORRECT: 'ERR_DATE_RANGE_INCORRECT',

  // If postal code doesn't exist in our database
  ERR_POSTAL_CODE_NOT_FOUND: 'ERR_POSTAL_CODE_NOT_FOUND',

  // Verification Link
  // If verification link ID is missing
  ERR_VERIFICATION_LINK_ID_REQUIRED: 'ERR_VERIFICATION_LINK_ID_REQUIRED',
  // If verification link ID was not provided in a correct format
  ERR_VERIFICATION_LINK_ID_INCORRECT: 'ERR_VERIFICATION_LINK_ID_INCORRECT',
  // If verification link hash is missing
  ERR_VERIFICATION_LINK_HASH_REQUIRED: 'ERR_VERIFICATION_LINK_HASH_REQUIRED',
  // If verification link hash is incorrect
  ERR_VERIFICATION_LINK_HASH_INCORRECT: 'ERR_VERIFICATION_LINK_HASH_INCORRECT',
  // If verification link action is missing
  ERR_VERIFICATION_LINK_ACTION_REQUIRED: 'ERR_VERIFICATION_LINK_ACTION_REQUIRED',
  // If verification link action was not provided in a correct format
  ERR_VERIFICATION_LINK_ACTION_INCORRECT: 'ERR_VERIFICATION_LINK_ACTION_INCORRECT',
  // If verification link action doesn't exist on the list of available actions
  ERR_VERIFICATION_LINK_ACTION_UNRECOGNIZED: 'ERR_VERIFICATION_LINK_ACTION_UNRECOGNIZED',
  // If someone tries to tamper with the verification link parameters and provides invalid ones
  ERR_VERIFICATION_LINK_INVALID_PARAMETERS: 'ERR_VERIFICATION_LINK_INVALID_PARAMETERS',
  // If someone tries the same link twice
  ERR_VERIFICATION_LINK_ALREADY_USED: 'ERR_VERIFICATION_LINK_ALREADY_USED',
  // If someone tries a link after it has expired
  ERR_VERIFICATION_LINK_EXPIRED: 'ERR_VERIFICATION_LINK_EXPIRED',
  // If there is a server-side problem with the verification link, suggest user to create a new request
  ERR_VERIFICATION_LINK_PROBLEM: 'ERR_VERIFICATION_LINK_PROBLEM',
  // If verification link action is not recognized during execution
  ERR_VERIFICATION_LINK_ACTION_NOT_IMPLEMENTED: 'ERR_VERIFICATION_LINK_ACTION_NOT_IMPLEMENTED',
  // Activation URL has to be a string
  ERR_VERIFICATION_LINK_ACTIVATION_URL_MUST_BE_STRING: 'ERR_VERIFICATION_LINK_ACTIVATION_URL_MUST_BE_STRING',
  // If verification link payload was not supplied as an array
  ERR_VERIFICATION_LINK_PAYLOAD_MUST_BE_OBJECT: 'ERR_VERIFICATION_LINK_PAYLOAD_MUST_BE_OBJECT',

  // If date of birth is missing
  ERR_DATE_OF_BIRTH_REQUIRED: 'ERR_DATE_OF_BIRTH_REQUIRED',
  // If date of birth is in the future
  ERR_DATE_OF_BIRTH_INCORRECT: 'ERR_DATE_OF_BIRTH_INCORRECT',
  // If datetime format is not recognized
  ERR_DATETIME_FORMAT_NOT_RECOGNIZED: 'ERR_DATETIME_FORMAT_NOT_RECOGNIZED',

  // If gender is missing
  ERR_GENDER_REQUIRED: 'ERR_GENDER_REQUIRED',
  // If gender is not allowed
  ERR_GENDER_NOT_RECOGNIZED: 'ERR_GENDER_NOT_RECOGNIZED',

  // If city is missing
  ERR_CITY_REQUIRED: 'ERR_CITY_REQUIRED',

  // If postal code is missing
  ERR_POSTAL_CODE_REQUIRED: 'ERR_POSTAL_CODE_REQUIRED',

  // If postal code and city are not null or set
  ERR_POSTAL_CODE_AND_CITY_MUST_BE_NULL_OR_SET: 'ERR_POSTAL_CODE_AND_CITY_MUST_BE_NULL_OR_SET',

  // If device id is missing
  ERR_DEVICE_ID_REQUIRED: 'ERR_DEVICE_ID_REQUIRED',
  // If device id is already used by some user
  ERR_DEVICE_ALREADY_EXISTS: 'ERR_DEVICE_ALREADY_EXISTS',

  // If push preference is missing
  ERR_PUSH_PREFERENCE_REQUIRED_AND_MUST_BE_BOOLEAN: 'ERR_PUSH_PREFERENCE_REQUIRED_AND_MUST_BE_BOOLEAN',

  // If file field is missing
  ERR_FILE_REQUIRED: 'ERR_FILE_REQUIRED',
  // If file does not exist
  ERR_FILE_DOES_NOT_EXIST: 'ERR_FILE_DOES_NOT_EXIST',
  // If not valid base64 string
  ERR_NOT_VALID_BASE_64_STRING: 'ERR_NOT_VALID_BASE_64_STRING',
  // If a file of unsupported mime type was uploaded
  ERR_UNSUPPORTED_FILE_TYPE: 'ERR_UNSUPPORTED_FILE_TYPE',

  // If is profile image is missing
  ERR_IS_PROFILE_IMAGE_IS_REQUIRED: 'ERR_IS_PROFILE_IMAGE_IS_REQUIRED',
  // If is profile image not boolean
  ERR_IS_PROFILE_IMAGE_NOT_BOOLEAN: 'ERR_IS_PROFILE_IMAGE_NOT_BOOLEAN',
  // If is coin image is missing
  ERR_IS_COIN_IMAGE_IS_REQUIRED: 'ERR_IS_COIN_IMAGE_IS_REQUIRED',
  // If is coin image not boolean
  ERR_IS_COIN_IMAGE_NOT_BOOLEAN: 'ERR_IS_COIN_IMAGE_NOT_BOOLEAN',
  // If sort number is not integer
  ERR_SORT_NUMBER_NOT_INTEGER: 'ERR_SORT_NUMBER_NOT_INTEGER',
  // If sort number is not valid
  ERR_SORT_NUMBER_INVALID: 'ERR_SORT_NUMBER_INVALID',

  // If age parameter is not numeric
  ERR_AGE_NUMBER_MUST_BE_NUMERIC: 'ERR_AGE_NUMBER_MUST_BE_NUMERIC',
  // If age parameter is not valid
  ERR_AGE_VALUE_INVALID: 'ERR_AGE_VALUE_INVALID',
  // If description is not string
  ERR_DESCRIPTION_MUST_BE_STRING: 'ERR_DESCRIPTION_MUST_BE_STRING',

  // If is smoker not boolean
  ERR_IS_SMOKER_NOT_BOOLEAN: 'ERR_IS_SMOKER_NOT_BOOLEAN',
  // If is tattooed not boolean
  ERR_IS_TATTOOED_NOT_BOOLEAN: 'ERR_IS_TATTOOED_NOT_BOOLEAN',
  // If is in relationship not boolean
  ERR_IS_IN_RELATIONSHIP_NOT_BOOLEAN: 'ERR_IS_IN_RELATIONSHIP_NOT_BOOLEAN',

  // If height is not integer
  ERR_HEIGHT_IS_NOT_INTEGER: 'ERR_HEIGHT_IS_NOT_INTEGER',

  // If eye color is not integer
  ERR_EYE_COLOR_IS_NOT_STRING: 'ERR_EYE_COLOR_IS_NOT_STRING',

  // If agency name is missing
  ERR_AGENCY_NAME_REQUIRED: 'ERR_AGENCY_NAME_REQUIRED',
  // If agency name is not correct
  ERR_AGENCY_NAME_INCORRECT: 'ERR_AGENCY_NAME_INCORRECT',
  // If eye color is not integer
  ERR_AGENCY_NAME_IS_NOT_STRING: 'ERR_AGENCY_NAME_IS_NOT_STRING',
  // If agency id is missing
  ERR_AGENCY_ID_REQUIRED: 'ERR_AGENCY_ID_REQUIRED',
  // If agency id is not integer
  ERR_AGENCY_ID_MUST_BE_INTEGER: 'ERR_AGENCY_ID_MUST_BE_INTEGER',
  // If agency id is not valid
  ERR_AGENCY_ID_INVALID: 'ERR_AGENCY_ID_INVALID',
  // If agency was not found
  ERR_AGENCY_NOT_FOUND: 'ERR_AGENCY_NOT_FOUND',

  // If country is missing
  ERR_COUNTRY_REQUIRED: 'ERR_COUNTRY_REQUIRED',
  // When ID is missing
  ERR_ID_REQUIRED: 'ERR_ID_REQUIRED',
  // If page filter is provided, however, not as an array
  ERR_PAGE_FILTER_NOT_ARRAY: 'ERR_PAGE_FILTER_NOT_ARRAY',
  // If page number is provided, but empty
  ERR_PAGE_NUMBER_IS_EMPTY: 'ERR_PAGE_NUMBER_IS_EMPTY',
  // If page number is provided, but not as an integer
  ERR_PAGE_NUMBER_MUST_BE_INTEGER: 'ERR_PAGE_NUMBER_MUST_BE_INTEGER',
  // If page size is provided, but empty
  ERR_PAGE_SIZE_IS_EMPTY: 'ERR_PAGE_SIZE_IS_EMPTY',
  // If country is not string
  ERR_COUNTRY_NOT_STRING: 'ERR_COUNTRY_NOT_STRING',

  // If message in payment is not numeric
  ERR_MESSAGE_IN_PAYMENT_NOT_NUMERIC: 'ERR_MESSAGE_IN_PAYMENT_NOT_NUMERIC',

  // If message out payment is not numeric
  ERR_MESSAGE_OUT_PAYMENT_NOT_NUMERIC: 'ERR_MESSAGE_OUT_PAYMENT_NOT_NUMERIC',

  // If time worked payment is not numeric
  ERR_TIME_WORKED_PAYMENT_NOT_NUMERIC: 'ERR_TIME_WORKED_PAYMENT_NOT_NUMERIC',

  // If filter name contains is not string
  ERR_NAME_CONTAINS_NOT_STRING: 'ERR_NAME_CONTAINS_NOT_STRING',

  ACCESS_DENIED: 'ACCESS_DENIED',

  // If job title is not string
  ERR_JOB_TITLE_NOT_STRING: 'ERR_JOB_TITLE_NOT_STRING',

  // If relationship type is  missing
  ERR_RELATIONSHIP_TYPE_REQUIRED: 'ERR_RELATIONSHIP_TYPE_REQUIRED',
  // If relationship type is not integer
  ERR_RELATIONSHIP_TYPE_MUST_BE_INTEGER: 'ERR_RELATIONSHIP_TYPE_MUST_BE_INTEGER',
  // If relationship type is invalid
  ERR_RELATIONSHIP_TYPE_INVALID: 'ERR_RELATIONSHIP_TYPE_INVALID',

  // If AppUser is missing
  ERR_MISSING_APP_USER: 'ERR_MISSING_APP_USER',
  // If AutomatedUser is missing
  ERR_MISSING_AUTOMATED_USER: 'ERR_MISSING_AUTOMATED_USER',
  // If AppUser identifier/username not string
  ERR_APP_USER_USERNAME_NOT_STRING: 'ERR_APP_USER_USERNAME_NOT_STRING',
  // If AutomatedUser identifier/username not string
  ERR_AUTOMATED_USER_USERNAME_NOT_STRING: 'ERR_AUTOMATED_USER_USERNAME_NOT_STRING',
  // If AutomatedUser not found
  ERR_AUTOMATED_USER_NOT_FOUND: 'ERR_AUTOMATED_USER_NOT_FOUND',
  // If AppUser not found
  ERR_APP_USER_NOT_FOUND: 'ERR_APP_USER_NOT_FOUND',

  // If Dialog id is missing
  ERR_DIALOG_NOT_FOUND: 'ERR_DIALOG_NOT_FOUND',
  // If Dialog id is missing
  ERR_MISSING_DIALOG: 'ERR_MISSING_DIALOG',
  // If Dialog id is not string
  ERR_MISSING_DIALOG_NOT_STRING: 'ERR_MISSING_DIALOG_NOT_STRING',
  // If Dialog Note Text is missing
  ERR_MISSING_DIALOG_NOTE_TEXT: 'ERR_MISSING_DIALOG_NOTE_TEXT',
  // If Dialog Note Text is not string
  ERR_DIALOG_NOTE_TEXT_NOT_STRING: 'ERR_DIALOG_NOTE_TEXT_NOT_STRING',
  // If Dialog Note Text is too long
  ERR_DIALOG_NOTE_TEXT_TOO_LONG: 'ERR_DIALOG_NOTE_TEXT_TOO_LONG',
  // If Dialog uuid is missing
  ERR_MISSING_DIALOG_UUID: 'ERR_MISSING_DIALOG_UUID',
  // If Dialog uuid is noz string
  ERR_DIALOG_UUID_NOT_STRING: 'ERR_DIALOG_UUID_NOT_STRING',
  // If Dialog uuid not valid
  ERR_DIALOG_UUID_NOT_VALID: 'ERR_DIALOG_UUID_NOT_VALID',
  // If Dialog type is not string
  ERR_DIALOG_TYPE_NOT_STRING: 'ERR_DIALOG_TYPE_NOT_STRING',
  // If Dialog status is not string
  ERR_DIALOG_STATUS_NOT_STRING: 'ERR_DIALOG_STATUS_NOT_STRING',
  // If dialog already exists between users
  ERR_DIALOG_BETWEEN_USERS_EXISTS: 'ERR_DIALOG_BETWEEN_USERS_EXISTS',
  // If dialog pool is empty
  ERR_DIALOG_POOL_IS_EMPTY: 'ERR_DIALOG_POOL_IS_EMPTY',
  // If pull query param is missing
  ERR_PULL_QUERY_PARAM_MISSING: 'ERR_PULL_QUERY_PARAM_MISSING',

  /*
   * Socket error messages
   */
  // If client sends an event that cannot be sent yet (e.g. while handshake is awaited)
  ERR_SOCKET_EVENT_NOT_ALLOWED: 'ERR_SOCKET_EVENT_NOT_ALLOWED',
  // If client sends an event that is not recognized by the socket
  ERR_SOCKET_EVENT_NOT_SUPPORTED: 'ERR_SOCKET_EVENT_NOT_SUPPORTED',
  // If client authenticates with a JWT token which refers to a moderator account which no longer exists
  ERR_SOCKET_MODERATOR_NOT_FOUND: 'ERR_SOCKET_MODERATOR_NOT_FOUND',
  // If client authenticates with a JWT token for a user which he no longer has access to
  ERR_SOCKET_CANNOT_MODERATE_USER: 'ERR_SOCKET_CANNOT_MODERATE_USER',
  // If client transmits a message which is not in a JSON format
  ERR_SOCKET_UNSUPPORTED_MESSAGE_FORMAT: 'ERR_SOCKET_UNSUPPORTED_MESSAGE_FORMAT',
  // If client transmits a JSON object without an event key, or event which is not a string
  ERR_SOCKET_EVENT_MISSING_OR_MALFORMED: 'ERR_SOCKET_EVENT_MISSING_OR_MALFORMED',
  // If client transmits a JSON object without a payload key, or payload which is not of correct format
  ERR_SOCKET_PAYLOAD_MISSING_OR_MALFORMED: 'ERR_SOCKET_PAYLOAD_MISSING_OR_MALFORMED',
  // If client transmits a JSON object without a payload key, or payload which is not of correct format
  ERR_SOCKET_DIALOG_UUID_MISSING_OR_MALFORMED: 'ERR_SOCKET_DIALOG_UUID_MISSING_OR_MALFORMED',
  // If client transmits a handshake event but doesn't provide a JWT token
  ERR_SOCKET_HANDSHAKE_TOKEN_MISSING: 'ERR_SOCKET_HANDSHAKE_TOKEN_MISSING',
  // If client transmits a new-message event, but doesn't provide the message type in correct format
  ERR_SOCKET_MESSAGE_TEXT_MISSING_OR_MALFORMED: 'ERR_SOCKET_MESSAGE_TEXT_MISSING_OR_MALFORMED',

  /*
   * Geolocation
   */
  // If geolocation longitude is missing.
  ERR_GEOLOCATION_LONGITUDE_MISSING: 'ERR_GEOLOCATION_LONGITUDE_MISSING',
  // If geolocation longitude is missing.
  ERR_GEOLOCATION_LATITUDE_MISSING: 'ERR_GEOLOCATION_LATITUDE_MISSING',

  /*
   * Product
   */
  // If product name not string
  ERR_PRODUCT_NAME_NOT_STRING: 'ERR_PRODUCT_NAME_NOT_STRING',
  // If product description not string
  ERR_PRODUCT_DESCRIPTION_NOT_STRING: 'ERR_PRODUCT_DESCRIPTION_NOT_STRING',
  // If purchase product or consume product is invalid
  ERR_PRODUCT_INVALID: 'ERR_PRODUCT_INVALID',
  // If product type parameter not provided
  ERR_PRODUCT_TYPE_REQUIRED: 'ERR_PRODUCT_TYPE_REQUIRED',
  // If product type parameter not integer
  ERR_PRODUCT_TYPE_NOT_INTEGER: 'ERR_PRODUCT_TYPE_NOT_INTEGER',
  // If product type not promo
  ERR_PRODUCT_TYPE_NOT_PROMO: 'ERR_PRODUCT_TYPE_NOT_PROMO',
  // If product coins parameter not provided
  ERR_PRODUCT_COINS_REQUIRED: 'ERR_PRODUCT_COINS_REQUIRED',
  // If product coins parameter not integer
  ERR_PRODUCT_COINS_NOT_INTEGER: 'ERR_PRODUCT_COINS_NOT_INTEGER',
  // If product status not boolean
  ERR_PRODUCT_STATUS_NOT_STRING: 'ERR_PRODUCT_STATUS_NOT_STRING',
  // If product name parameter not provided
  ERR_PRODUCT_NAME_REQUIRED: 'ERR_PRODUCT_NAME_REQUIRED',
  // If not enough coins in user balance
  ERR_NOT_ENOUGH_COINS: 'ERR_NOT_ENOUGH_COINS',

  // If product price amount missing
  ERR_PRODUCT_PRICE_AMOUNT_MISSING: 'ERR_PRODUCT_PRICE_AMOUNT_MISSING',
  // If product price amount not float
  ERR_PRODUCT_PRICE_AMOUNT_NOT_FLOAT: 'ERR_PRODUCT_PRICE_AMOUNT_NOT_FLOAT',
  // If product price promo amount missing
  ERR_PRODUCT_PRICE_PROMO_AMOUNT_MISSING: 'ERR_PRODUCT_PRICE_PROMO_AMOUNT_MISSING',
  // If product price promo amount not float
  ERR_PRODUCT_PRICE_PROMO_AMOUNT_NOT_FLOAT: 'ERR_PRODUCT_PRICE_PROMO_AMOUNT_NOT_FLOAT',
  // If product price has more than 2 decimal places.
  ERR_PRODUCT_PRICE_HAS_MORE_THAN_2_DECIMAL_PLACES: 'ERR_PRODUCT_PRICE_HAS_MORE_THAN_2_DECIMAL_PLACES',
  // If product promo price has more than 2 decimal places.
  ERR_PRODUCT_PROMO_PRICE_HAS_MORE_THAN_2_DECIMAL_PLACES: 'ERR_PRODUCT_PROMO_PRICE_HAS_MORE_THAN_2_DECIMAL_PLACES',
  // If product price market missing
  ERR_PRODUCT_MARKET_MISSING: 'ERR_PRODUCT_MARKET_MISSING',
  // If product price market not string
  ERR_PRODUCT_MARKET_NOT_STRING: 'ERR_PRODUCT_MARKET_NOT_STRING',
  // If product type missing
  ERR_PRODUCT_TYPE_MISSING: 'ERR_PRODUCT_TYPE_MISSING',
  // If product type not string
  ERR_PRODUCT_TYPE_NOT_STRING: 'ERR_PRODUCT_TYPE_NOT_STRING',
  // If product id is missing
  ERR_PRODUCT_ID_REQUIRED: 'ERR_PRODUCT_ID_REQUIRED',
  // If product id is not integer
  ERR_PRODUCT_ID_MUST_BE_INTEGER: 'ERR_PRODUCT_ID_MUST_BE_INTEGER',
  // If product id is not valid
  ERR_PRODUCT_ID_INVALID: 'ERR_PRODUCT_ID_INVALID',
  // If product was not found
  ERR_PRODUCT_NOT_FOUND: 'ERR_PRODUCT_NOT_FOUND',
};
