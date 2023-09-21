'use strict';

module.exports = {
  textRequired: {
    empty: '%s is required.'
  },
  socialMedia: {
    type: 'Invalid data provided.',
    invalid: 'Invalid URL'
  },
  social: {
    empty: 'Social Website name is required.',
    validValue: 'Social Website can only be local or facebook.'
  },
  deviceType: {
    empty: 'Device type is required.',
    validValue: 'Device type can only be Web for now.'
  },
  token: {
    empty: 'Access token is required.',
    invalid: 'Invalid access token.',
    expired: 'Access token has expired.',
    forbidden: 'You are not allowed to access this resource.'
  },
  userId: {
    empty: 'User ID cannot be empty.',
    invalid: 'Invalid User ID.'
  },
  userType: {
    empty: 'User type is required.',
    validValue: 'User type is invalid.'
  },
  email: {
    empty: 'Email address cannot be empty.',
    invalid: 'Invalid Email address.'
  },
  password: {
    empty: 'Password cannot be empty.',
    length: 'Password should be 6 to 32 characters long.'
  },
  oldPassword: {
    empty: 'Old password is required.'
  },
  companyName: {
    empty: 'Company name is required.',
    length: 'Company name should be 3 to 40 characters long.'
  },
  fullName: {
    empty: 'Full name is required.',
    length: 'Full name should be 2 to 50 characters long.'
  },
  firstName: {
    empty: 'First name is required.',
    length: 'First name should be 2 to 50 characters long.'
  },
  middleName: {
    empty: 'Midlle name is required.',
    length: 'Middle name should be 2 to 50 characters long.'
  },
  lastName: {
    empty: 'Last name is required.',
    length: 'Last name should be 2 to 50 characters long.'
  },
  mobile: {
    empty: 'Valid mobile number is required.',
    invalid: 'Invalid mobile number.',
    pattern: 'Phone number should be between 8 and 15 digits'
  },
  accommodationId: {
    empty: 'Valid accommodation Id is required.',
    invalid: 'Invalid accommodation Id.',
    pattern: 'accommodation Id should be in number format'
  },
  idCard: {
    empty: 'ID Card number is required.',
    invalid: 'ID Card number should be between 9 and 15 digits.'
  },
  gender: {
    empty: 'Gender is required.',
    invalid: 'Invalid gender.'
  },
  dob: {
    empty: 'Date of birth is required.',
    limit: 'Sorry, you are too young to sign-up.',
    invalid: 'Invalid date.'
  },
  universityName: {
    empty: 'University name is required',
    validValue: 'Only GIKI and LUMS are allowed for now.'
  },
  universityEmail: {
    empty: 'Email address cannot be empty.',
    invalid: 'Invalid Email address.'
  },
  objectId: {
    empty: 'Object ID cannot be empty.',
    invalid: 'Invalid Object ID.'
  },
  resetPasswordCode: {
    empty: 'Reset password code is required.'
  },
  reviewToken: {
    empty: 'Review token is required.'
  },
  photo: {
    empty: 'Photo is required.',
    invalid: 'Photo must be base64 encoded.',
    fileSize: 'Photo must be less than 3MB.',
    imageType: 'Photo must be JPG.'
  },
  eventPhoto: {
    invalidRatio: 'Photo must be 16:9 ratio.',
    tooSmall: 'Photo dimension must be minimum 960x540.',
    tooLarge: 'Photo dimension must be maximum 1920x1080.'
  },
  tagPhoto: {
    invalidRatio: 'Photo must be 16:9 ratio.',
    tooSmall: 'Photo dimension must be minimum 960x540.',
    tooLarge: 'Photo dimension must be maximum 1920x1080.'
  },
  vendorPhoto: {
    tooSmall: 'Photo dimension must be minimum 174x249.',
    tooLarge: 'Photo dimension must be maximum 348x498.'
  },
  eventPhotoId: {
    invalid: 'Photo ID is invalid.'
  },
  eventPhotoIds: {
    empty: 'Event photos are required.',
    unique: 'All Photo IDs must be unique.'
  },
  eventTitle: {
    empty: 'Event title is required.',
    length: 'Event title should be 2 to 100 characters long.'
  },
  eventSlug: {
    empty: 'Event slug is required.',
    length: 'Event slug should be 2 to 100 characters long.',
    invalid: 'Invalid event slug.'
  },
  tripSlug: {
    empty: 'trip slug is required.',
    length: 'trip slug should be 2 to 100 characters long.',
    invalid: 'Invalid trip slug.'
  },
  tagSlug: {
    empty: 'Slug is required.',
    length: 'Slug should be 2 to 100 characters long.',
    invalid: 'Invalid slug.'
  },
  eventDescription: {
    empty: 'Event description is required.',
    length: 'Event description should be 50 to 8,000 characters long.'
  },
  categoryDescription: {
    empty: 'Description is required.',
    length: 'Description should be 5 to 2000 characters long.'
  },
  activityDescription: {
    empty: 'Description is required.',
    length: 'Description should be 5 to 2000 characters long.'
  },
  eventDuration: {
    empty: 'Event duration is required.',
    invalid: 'Event duration cannot be less than 1 day.'
  },
  eventLocations: {
    empty: 'Event locations are required.',
    length: 'You must provide at least one location.',
    unique: 'All Event locations must be unique.',
    itemType: 'One or more Event locations are invalid.',
    itemEmpty: 'Event location cannot be empty.'
  },
  included: {
    empty: 'Services included is required.',
    length: 'You must provide at least one included service.',
    unique: 'All Services included must be unique.',
    itemType: 'One or more Services included are invalid.',
    itemEmpty: 'Services included cannot be empty.'
  },
  available: {
    empty: 'Services available is required.',
    length: 'You must provide at least one available service.',
    unique: 'All Services available must be unique.',
    itemType: 'One or more Services available are invalid.',
    itemEmpty: 'Services available cannot be empty.'
  },
  upper: {
    empty: 'allowedPassengerLimit upper is required.',
    invalid: 'allowedPassengerLimit upper cannot be less than 1.'
  },
  lower: {
    empty: 'allowedPassengerLimit lower is required.',
    invalid: 'allowedPassengerLimit lower cannot be less than 1.'
  },
  from: {
    empty: 'priceRange from is required.',
    invalid: 'priceRange from cannot be less than 1.'
  },
  to: {
    empty: 'priceRange to is required.',
    invalid: 'priceRange to cannot be less than 1.'
  },
  eventCategories: {
    empty: 'Event categories are required.',
    length: 'You must provide at least one category.',
    unique: 'All Event categories must be unique.',
    itemType: 'One or more Event categories are invalid.',
    itemEmpty: 'Event category cannot be empty.'
  },
  eventActivities: {
    empty: 'Event activities are required.',
    unique: 'All event activities must be unique.',
    itemType: 'One or more event activities are invalid.'
  },
  eventPassengerLimit: {
    empty: 'Passenger limit per account is required.',
    invalid: 'Passenger limit must be a positive number.'
  },
  eventDarazLink: {
    empty: 'Daraz Link is required.'
  },
  eventUniversityLimit: {
    empty: 'Event University is required.',
    unique: 'All universities must be unique.'
  },
  eventTags: {
    empty: 'Event tags are required.',
    length: 'You must provide at least 2 tags.',
    unique: 'All Event tags must be unique.',
    itemType: 'One or more Event tags are invalid.',
    itemEmpty: 'Event tag cannot be empty.',
    itemLength: 'Event tag should be 3 to 20 characters long.'
  },
  eventItinerary: {
    empty: 'Event itinerary is required.',
    length: 'You must provide at least one itinerary.',
    unique: 'Event itinerary items must all be unique.'
  },
  itineraryItemDay: {
    empty: 'Itinerary item day cannot be empty.',
    invalid: 'Itinerary item day must be a position number.'
  },
  itineraryItemTime: {
    empty: 'Itinerary item time cannot be empty.',
    invalid: 'Itinerary item time is invalid.'
  },
  itineraryItemDuration: {
    invalid: 'Itinerary item duration is invalid.'
  },
  itineraryItemDescription: {
    empty: 'Itinerary item description cannot be empty.',
    length: 'Itinerary item description should be 10 to 1000 characters long.'
  },
  eventFacilities: {
    empty: 'Event facilities are required.',
    length: 'You must provide at least one facility.',
    unique: 'Event facility titles must all be unique.'
  },
  facilityItemTitle: {
    invalid: 'Event facility title is invalid.'
  },
  facilityItemList: {
    empty: 'Event facility items are required.',
    length: 'You must provide at least one facility item.',
    unique: 'Event facility items must all be unique.'
  },
  eventStatus: {
    empty: 'Event status is required.',
    validValue: 'Event status is invalid.'
  },
  eventOriginalPrice: {
    invalid: 'Original price must be a positive amount.'
  },
  eventBookingDeadline: {
    empty: 'Booking deadline is required.',
    invalid: 'Booking deadline must be at least 1 day.'
  },
  eventDiscount: {
    empty: 'Discount is required.',
    invalid: 'Discount must be between 0 to 100.'
  },
  courseDiscount: {
    empty: 'Discount is required.',
    invalid: 'Discount must be between 0 to 100.'
  },
  eventPackagesCount: {
    empty: 'Packages count is required.',
    invalid: 'Packages count must be between 1 and 5.'
  },
  eventAvailability: {
    empty: 'Event availability is required.',
    unique: 'Event availability must not repeat.'
  },
  availabilityType: {
    empty: 'Availability type is required.',
    validValue: 'Availability type can be fixed or weekly.'
  },
  availabilityDate: {
    empty: 'Availability date is required.',
    pastDate: 'Availability date must be a future date.',
    invalid: 'Invalid date.'
  },
  availabilityDayOfWeek: {
    empty: 'Day of week is required.',
    invalid: 'Invalid day of week.'
  },
  availabilityCapacity: {
    empty: 'Capacity is required.',
    invalid: 'Capacity must be a positive number.'
  },
  availabilityPackagePrices: {
    empty: 'Package Prices are required.',
    length: 'Number of prices does not match packages count.'
  },
  PickupLocationsTime: {
    invalid: 'Invalid pickup time provided .'
  },
  PickupLocationsDate: {
    invalid: 'Invalid pickup date provided .'
  },
  packagePrice: {
    empty: 'Price is required.',
    invalid: 'Price must be a positive number.'
  },
  eventAddons: {
    empty: 'Event add-on is required.',
    unique: 'Event add-ons must not repeat.'
  },
  addonTitle: {
    empty: 'Add-on title is required.',
    length: 'Add-on title should be 2 to 80 characters long.'
  },
  addonType: {
    empty: 'Add-on type is required.',
    validValue: 'Add-on type can only be single or multiple.'
  },
  addonOptions: {
    empty: 'Add-on options are required.',
    length: 'Add-on options must be between 1 to 50.',
    unique: 'Add-on options must be unique.'
  },
  addonOptionName: {
    empty: 'Add-on option name is required.',
    length: 'Add-on option name should be 2 to 80 characters long.'
  },
  addonOptionPrice: {
    empty: 'Add-on price is required.',
    invalid: 'Add-on price must be a positive number.'
  },
  questionComment: {
    empty: 'Question comment is required.',
    length: 'Question comment should be at most 2,000 characters long.'
  },
  reviewComment: {
    empty: 'Review comment is required.',
    length: 'Review comment should be at most 2,000 characters long.'
  },
  reviewRating: {
    empty: 'Review rating is required.',
    invalid: 'Review rating should be an integer between 0 to 10.'
  },
  feedbackReply: {
    empty: 'Comment is required.',
    length: 'Comment should be at most 2,000 characters long.'
  },
  bookingDate: {
    empty: 'Booking date is required.',
    invalid: 'Booking date format is invalid.',
    pastDate: 'Invalid Booking Date.'
  },
  bookingPackageId: {
    empty: 'Package ID is required.',
    invalid: 'Package ID is invalid.'
  },
  bookingSlotId: {
    empty: 'Slot ID is required.',
    invalid: 'Slot ID is invalid.'
  },
  noOfAdults: {
    empty: 'noOfAdults is required.',
    invalid: 'noOfAdults is invalid.'
  },
  noOfChildren: {
    empty: 'noOfChildren is required.',
    invalid: 'noOfChildren is invalid.'
  },
  noOfStudents: {
    empty: 'noOfAdults is required.',
    invalid: 'noOfAdults is invalid.'
  },
  bookingChild: {
    invalid: 'Invalid input for child.'
  },
  booleanTypeCheck: {
    invalid: 'Invalid type, Boolean required.',
    allowEmpty: 'It cannot be empty.',
    required: 'Field is required'
  },
  bookingAddons: {
    empty: 'Booking add-on is required.',
    unique: 'Booking add-ons must not repeat.'
  },
  bookingAddonTitle: {
    empty: 'Booking add-on title is required.'
  },
  bookingAddonOptions: {
    empty: 'Booking add-on options are required.',
    unique: 'Booking add-on options must be unique.'
  },
  bookingAddonOptionName: {
    empty: 'Booking add-on option name is required.'
  },
  bookingPassengersDetail: {
    empty: 'Passengers\' detail is required.',
    length: 'At least one passenger\'s detail is required.',
    unique: 'Each passenger must be unique by ID Card number.'
  },
  mmaPackages: {
    empty: 'MMA Packages is required.',
    length: 'At least one mma package is required.'
  },
  services: {
    empty: 'services is required.'
  },
  allowedPassengerLimit: {
    empty: 'allowedPassengerLimit is required.'
  },
  priceRange: {
    empty: 'priceRange is required.'
  },
  studentsDetail: {
    empty: 'Students detail is required.',
    length: 'At least one students detail is required.'
  },
  bookingReferrer: {
    invalid: 'Invalid booking referrer.',
    length: 'Referrer string is too long.'
  },
  bookingPaymentMethod: {
    empty: 'Payment method is required.',
    validValue: 'Allowed payment methods are Cash-on-Delivery, Bank Transfer and EasyPay.'
  },
  bookingBillingInfo: {
    empty: 'Billing information is required.'
  },
  bookingNewStatus: {
    validValue: 'Invalid status.'
  },
  eventFilterLocations: {
    invalid: 'Invalid locations.'
  },
  eventFilterSubLocations: {
    invalid: 'Invalid sub locations.'
  },
  eventFilterCategories: {
    invalid: 'Invalid categories.'
  },
  eventFilterActivities: {
    invalid: 'Invalid activities.'
  },
  eventFilterSubActivities: {
    invalid: 'Invalid sub activities.'
  },
  tags: {
    invalid: 'Invalid tags.'
  },
  eventFilterDuration: {
    invalid: 'Invalid duration.'
  },
  eventFilterDate: {
    invalid: 'Invalid date.'
  },
  eventOnlyDeals: {
    invalid: 'Invalid argument for onlyDeals.'
  },
  eventFilterPrice: {
    invalid: 'Invalid price.'
  },
  eventEquipments: {
    unique: 'All items must be unique.',
    itemType: 'One or more equipments are invalid.',
    itemLength: 'Equipment should be 3 to 50 characters long.'
  },
  facilities: {
    unique: 'All items must be unique.',
    itemType: 'One or more facilities are invalid.',
    itemLength: 'facility should be 3 to 50 characters long.'
  },
  whatsIncluded: {
    unique: 'All items must be unique.',
    itemType: 'One or more services are invalid.',
    itemLength: 'services should be 3 to 50 characters long.'
  },
  ipnURL: {
    invalid: 'Invalid IPN URL.'
  },
  promoCode: {
    invalid: 'Invalid promo code.',
    length: 'Promo code must be 3-12 characters long.'
  },
  promoCodeStatus: {
    validValue: 'Promo code can only be active or inactive.'
  },
  promoCodeStartDate: {
    invalid: 'Invalid start date.',
    required: ''
  },
  promoCodeEndDate: {
    invalid: 'Invalid end date.',
    pastDate: 'End date must be today or any future date.'
  },
  checkIn: {
    invalid: 'Invalid check in.',
    pastDate: 'Check In must be today or any future date.'
  },
  checkOut: {
    invalid: 'Invalid check out.',
    pastDate: 'Check Out must be today or any future date.'
  },
  promoCodeScope: {
    validValue: 'Promo code scope can only be events, everywhere or custom.',
    required: 'Promo code must contain atleast one of MMA scope, ALL scope, or Event scopes.',
    conform: 'Promo code must contain atleast one of MMA, RELAIL, EVERYWHERE or Event scope with non or maximum one of CATEGORY, LOCATION, ACTIVITY scope'
  },
  promoCodeEventIds: {
    empty: 'Event IDs are required in event scoped promo codes.',
    minimum: 'Atleast one Event ID is required in event scoped promo codes.'
  },
  promoCodeAmountOff: {
    empty: 'Discount amount is required.',
    invalid: 'Invalid discount amount.',
    type: 'Discount amount must be a number.',
    minimum: 'Discount amount must be minimum 1'
  },
  promoCodePercentageOff: {
    empty: 'Discount percentage is required.',
    validValues: 'Discount percentage can be between 1-100.',
    type: 'Discount percentage must be a number.'
  },
  promoCodeSingleUse: {
    invalid: 'Invalid input for single use.'
  },
  photoDescription: {
    required: 'Photo description is required.'
  },
  startingLocation: {
    empty: 'Starting locations are required.',
    length: 'You must provide at least one location.',
    unique: 'All Starting locations must be unique.',
    itemType: 'One or more Starting locations are invalid.',
    itemEmpty: 'Starting location cannot be empty.'
  },
  testimonial: {
    empty: 'Testimonial is required.',
    length: 'Testimonial should be 10 to 8,000 characters long.'
  },
  rating: {
    empty: 'Rating is required.',
    invalid: 'Rating must be a number between 0-5.'
  },
  establishmentDate: {
    empty: 'Date of Establishment is required.',
    invalid: 'Invalid date.'
  },
  numberOfGuides: {
    empty: 'Number Of Guides is required.',
    invalid: 'Number Of Guides cannot be less than 1.'
  },
  license: {
    empty: 'License number is required.',
    invalid: 'License number should be between 9 and 13 digits.'
  },
  Ownstransport: {
    empty: 'Owns Transport is required.',
    invalid: 'Invalid Owns Transport.'
  },
  commission: {
    empty: 'Commission is required.',
    invalid: 'Invalid Commission.'
  },
  accountNumber1: {
    empty: 'Account Number 1 is required.',
    invalid: 'Invalid Account Number 1.'
  },
  accountNumber2: {
    invalid: 'Invalid Account Number 2.'
  },
  accountNumber3: {
    invalid: 'Invalid Account Number 3.'
  },
  verify: {
    empty: 'verification code is required',
    invalid: 'Invalid verification code.'

  },
  formPhoto: {
    tooSmall: 'Photo dimension must be minimum 100x100.',
    tooLarge: 'Photo dimension must be maximum 350x500.'
  },
  promoCodeEventStartDate: {
    invalid: 'Invalid start date for event.',
    required: 'Promo code event start date is required.'
  },
  promoCodeEventEndDate: {
    invalid: 'Invalid end date for event.',
    required: 'Promo code event end date is required.'
  },
  promoCodeUserUsageLimit: {
    empty: 'User usage limit is required.',
    type: 'User usage limit must be a number.',
    invalid: 'Invalid user usage limit.',
    minimum: 'User usage limit must be minimum 1.'
  },
  promoCodeUsageLimit: {
    empty: 'Usage limit is required.',
    type: 'Usage limit must be a number.',
    invalid: 'Invalid usage limit.',
    minimum: 'Usage limit must be minimum 1.'
  },
  promoCodePassengerLimit: {
    empty: 'Passenger limit is required.',
    type: 'Passenger limit must be a number.',
    invalid: 'Invalid passenger limit.',
    minimum: 'Passenger limit must be minimum 1.'
  },
  promoCodeUserCap: {
    type: 'User cap must be a number.',
    minimum: 'User cap must be minimum 1.'
  },
  promoCodeBookingCap: {
    type: 'Booking cap must be a number.',
    minimum: 'Booking cap must be minimum 1.'
  },
  promoEventLimit: {
    type: 'Event limit must be an object.'
  },
  blogSlug: {
    empty: 'Blog slug is required.',
    length: 'Blog slug should be 2 to 100 characters long.',
    invalid: 'Invalid blog slug.'
  },
  priceBracket: {
    empty: 'Price bracket is required.',
    length: 'Price bracket should be 2 to 100 characters long.'
  },
  isMMA: {
    invalid: 'Invalid argument.'
  },
  subLocations: {
    empty: 'Event sub locations are required.',
    length: 'You must provide at least one sub location.',
    unique: 'All Event sub locations must be unique.',
    itemType: 'One or more Event sub locations are invalid.',
    itemEmpty: 'Event sub location cannot be empty.'
  },
  noOfPromos: {
    type: 'Number of promocodes must be a number.',
    minimum: 'Number of promocodes must be minimum 1.'
  },
  ageLimit: {
    empty: 'Age Limit is required.',
    type: 'Age limit must be a number.',
    invalid: 'Age limit cannot be less than 0.'
  },
  allowedNetworks: {
    type: 'Mobile networks must be an array of strings.',
    allowEmpty: 'Mobile networks array cannot be empty.',
    uniqueItems: 'Mobile networks array must contain unique items.',
    minItems: 'Mobile networks must contain at least one item.'
  },
  packageID: {
    type: 'Package ID must be a number.',
    required: 'Package ID is required.'
  },
  packageName: {
    type: 'Package name must be a string.',
    required: 'Package name is required.'
  },
  capacity: {
    type: 'Package capacity must be a number.',
    required: 'Package capacity is required.'
  },
  packageDesc: {
    type: 'Package description must be a string.',
    required: 'Package description is required.'
  },
  tagName: {
    type: 'Tag Name must be a string.',
    required: 'Tag Name is required.',
    allowEmpty: 'Tag Name cannot be empty.'
  },
  startingLocationName: {
    type: 'starting Location Name must be a string.',
    required: 'starting Location Name is required.',
    allowEmpty: 'starting Location Name cannot be empty.'
  },
  categoryName: {
    type: 'Category Name must be a string.',
    required: 'Category Name is required.',
    allowEmpty: 'Category Name cannot be empty.'
  },
  categoryAlias: {
    type: 'Category Name must be a string.',
    required: 'Category Alias is required.',
    allowEmpty: 'Category Name cannot be empty.'
  },
  activityAlias: {
    type: 'Activity Name must be a string.',
    required: 'Activity Alias is required.',
    allowEmpty: 'Activity Name cannot be empty.'
  },
  activityName: {
    type: 'Activity Name must be a string.',
    required: 'Activity Name is required.',
    allowEmpty: 'Activity Name cannot be empty.'
  },
  activityId: {
    type: 'Activity ID must be a string.',
    required: 'Activity ID is required.',
    allowEmpty: 'Activity ID cannot be empty.',
    invalid: 'Invalid Activity ID'
  },
  courseId: {
    type: 'Course ID must be a string.',
    required: 'Course ID is required.',
    allowEmpty: 'Course ID cannot be empty.',
    invalid: 'Invalid Course ID'
  },
  categoryId: {
    type: 'Category ID must be a string.',
    required: 'Category ID is required.',
    allowEmpty: 'Category ID cannot be empty.',
    invalid: 'Invalid Category ID'
  },
  equipmentId: {
    type: 'Equipment ID must be a string.',
    required: 'Equipment ID is required.',
    allowEmpty: 'Equipment ID cannot be empty.',
    invalid: 'Invalid Equipment ID'
  },
  facilityId: {
    type: 'Facility ID must be a string.',
    required: 'Facility ID is required.',
    allowEmpty: 'Facility ID cannot be empty.',
    invalid: 'Invalid Facility ID'
  },
  facelityName: {
    type: 'Facility Name must be a string.',
    required: 'Facility Name is required.',
    allowEmpty: 'Facility Name cannot be empty.'
  },
  subActivityName: {
    type: 'Sub Activity Name must be a string.',
    required: 'Sub Activity Name is required.',
    allowEmpty: 'Sub Activity Name cannot be empty.'
  },
  locationId: {
    type: 'Location ID must be a string.',
    required: 'Location ID is required.',
    allowEmpty: 'Location ID cannot be empty.',
    invalid: 'Invalid Location ID'
  },
  serviceId: {
    type: 'Service ID must be a string.',
    required: 'Service ID is required.',
    allowEmpty: 'Service ID cannot be empty.',
    invalid: 'Invalid Service ID'
  },
  locationName: {
    type: 'Location Name must be a string.',
    required: 'Location Name is required.',
    allowEmpty: 'Location Name cannot be empty.'
  },
  serviceName: {
    type: 'Service Name must be a string.',
    required: 'Service Name is required.',
    allowEmpty: 'Service Name cannot be empty.'
  },
  equipmentName: {
    type: 'Equipment Name must be a string.',
    required: 'Equipment Name is required.',
    allowEmpty: 'Equipment Name cannot be empty.'
  },
  subLocationName: {
    type: 'Sub Location Name must be a string.',
    required: 'Sub Location Name is required.',
    allowEmpty: 'Sub Location Name cannot be empty.'
  },
  isFilter: {
    type: 'isFilter must be a boolean.',
    required: 'isFilter is required.',
    allowEmpty: 'isFilter cannot be empty.'
  },
  isDomestic: {
    type: 'isDomestic must be a boolean.',
    required: 'isDomestic is required.',
    allowEmpty: 'isDomestic cannot be empty.'
  },
  parent: {
    type: 'Parent must be a Object.',
    required: 'Parent is required.',
    allowEmpty: 'Parent cannot be empty.'
  },
  parentId: {
    type: 'Parent ID must be a string.',
    required: 'Parent ID is required.',
    allowEmpty: 'Parent ID cannot be empty.',
    invalid: 'Invalid Parent ID'
  },
  parentName: {
    type: 'Parent Name must be a string.',
    required: 'Parent Name is required.',
    allowEmpty: 'Parent Name cannot be empty.'
  },
  subActivityId: {
    type: 'Sub Activity ID must be a string.',
    required: 'Sub Activity ID is required.',
    allowEmpty: 'Sub Activity ID cannot be empty.',
    invalid: 'Invalid Sub Activity ID'
  },
  subLocationId: {
    type: 'Sub Location ID must be a string.',
    required: 'Sub Location ID is required.',
    allowEmpty: 'Sub Location ID cannot be empty.',
    invalid: 'Invalid Sub Location ID'
  },
  startingLocationId: {
    type: 'Starting Location ID must be a string.',
    required: 'Starting Location ID is required.',
    allowEmpty: 'Starting Location ID cannot be empty.',
    invalid: 'Invalid Starting Location ID'
  },
  tagId: {
    type: 'Tag ID must be a string.',
    required: 'Tag ID is required.',
    allowEmpty: 'Tag ID cannot be empty.',
    invalid: 'Invalid Tag ID'
  },
  verifyEvent: {
    invalid: 'Invalid verified status'
  },
  booleanType: {
    empty: 'field is required.',
    invalid: 'field should of boolen type'
  },
  lead: {
    leadStatus: {
      empty: 'Lead status cannot be empty.'
    }
  },
  coursTitle: {
    type: 'Course title must be a string.',
    required: 'Course title Name is required.',
    allowEmpty: 'Course title cannot be empty.'
  },
  courseStatus: {
    empty: 'Course status is required.',
    validValue: 'Course status is invalid.'
  },
  courseSlug: {
    empty: 'Course slug is required.',
    length: 'Course slug should be 2 to 100 characters long.',
    invalid: 'Invalid course slug.'
  },
  courseAvailability: {
    empty: 'Course availability is required.',
    unique: 'Course availability must not repeat.'
  },
  coursevaailabilitySlots: {
    empty: 'Course session is required.',
    unique: 'Course session must not repeat.',
    allowEmpty: 'Course sessions array cannot be empty.',
    length: 'Course must contaion at least on session.'
  },
  slots: {
    empty: 'Session hour and minues must be of Number type.',
    unique: 'Course session must not repeat.',
    required: 'Session hour and minutes are required.'
  },
  slotHour: {
    type: 'Session hours must be of type Number',
    empty: 'Session hours are required.',
    length: 'Session hours should be a number between 0 and 24.'
  },
  slotMinute: {
    type: 'Session minutes must be of type Number',
    empty: 'Session minutes are required.',
    length: 'Session minutes should be a number between 0 and 24.'
  },
  groupSize: {
    invalid: 'Group size must be a positive number.'
  },
  languages: {
    unique: 'All languages must be unique.',
    itemType: 'One or more languages are invalid.',
    empty: 'Languages must be an array of strings.'
  },
  skills: {
    unique: 'All skills must be unique.',
    itemType: 'One or more skills are invalid.',
    empty: 'skills must be an array of strings.'
  },
  eventType: {
    empty: 'Event type is required.'
  },
  coordinates: {
    invalid: 'Coordinates must an array of numbers.',
    empty: 'Coordinates are required.',
    length: 'Coordinates should be an array of two numbers.'

  },
  distance: {
    invalid: 'Distance must be a number greater than or equal to 0.',
    empty: 'Distance required.'

  },
  date: {
    empty: 'Date is required.',
    invalid: 'Invalid date.'
  },
  tripStatus: {
    empty: 'Trip Status is required.',
    validValue: 'Trip status is invalid.'
  },
  day: {
    empty: 'day is required.',
    validValue: 'day is invalid.'
  },
  time: {
    empty: 'time is required.',
    validValue: 'time is invalid.'
  },
  duration: {
    empty: 'trip duration is required.',
    validValue: 'trip duration is invalid.'
  },
  description: {
    empty: 'itinerary description is required.',
    length: 'itinerary description should be 20 to 8,00 characters long.'
  },
  itinerary: {
    empty: 'itinerary is required.',
    length: 'At least one itinerary is required.',
    unique: 'Each itinerary must be unique.'
  },
  cancellationPolicy: {
    empty: 'cancellationPolicy is required.',
    length: 'cancellationPolicy should be 5 to 2000 characters long.'
  },
  tripPrice: {
    invalid: 'Original price must be a positive amount.'
  },
  tripDescription: {
    empty: 'tripDescription is required.',
    length: 'tripDescription should be 5 to 2000 characters long.'
  },
  tripTitle: {
    empty: 'trip title is required.',
    length: 'trip title should be 2 to 100 characters long.'
  },
  service_name: {
    empty: 'Service Name is required.'
  },
  origin_city_name: {
    empty: 'Origin City Name is required.'
  },
  destination_city_name: {
    empty: 'Destination City Name is required.'
  },
  deptime: {
    empty: 'Departure Time is required.'
  },
  time_id: {
    empty: 'Time id is required.'
  },
  schedule_id: {
    empty: 'Schedule id is required.'
  },
  route_id: {
    empty: 'Route id is required.'
  },
  number_of_seats: {
    empty: 'Number of Seats is required.'
  },
  seat_numbers_male: {
    empty: 'Seat Numbers Male is required.'
  },
  seat_numbers_female: {
    empty: 'Seat Numbers Female is required.'
  },
  name: {
    empty: 'Name is required.'
  },
  cnic: {
    empty: 'CNIC is required.'
  },
  ticket_price: {
    empty: 'Ticket Price is required.'
  },
  total_price: {
    empty: 'Total Price is required.'
  },
  locationType: {
    empty: 'Location Type is required.',
    validValue: 'Location Type is invalid.'
  },
  ObjectId: {
    empty: '%s cannot be empty.',
    invalid: 'Invalid %s.'
  },
  arrayOfObjectIds: {
    empty: '%s are required.',
    length: '%s must be between 1 to 50.',
    unique: '%s must be unique.'
  },
  numRequired: {
    empty: '%s is required.',
    type: '%s must be a number.',
    minimum: '%s must be a positive number'
  },
  booleanRequired: {
    empty: '%s is required.'
  },
  arrayOfBooleans: {
    empty: '%s are required.',
    length: '%s must be 7'
  },
  passengersDetail: {
    type: 'passengersDetail must be a Object.',
    required: 'passengersDetail is required.',
    allowEmpty: 'passengersDetail cannot be empty.'
  }
};
