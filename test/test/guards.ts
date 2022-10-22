
  /**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND.
 * Instead, modify the source OpenAPI file and regenerate
 */

  import Ajv, { ValidateFunction, AsyncValidateFunction } from 'ajv'
  import addFormats from 'ajv-formats'

  import { Schema } from './types'
  import jsonSchema from './schema.json'

  const ajv = new Ajv({ strict: false })
  addFormats(ajv, { formats: ["email","uuid","date","date-time","uri"] })

  ajv.compile(jsonSchema)

  /**
   * When loading a schema the type guard may be async or undefined
   * if the schema requires external resolution or could not be found
   *
   * We have chosen to not support this in this version of code generation
   * to make the contract simpler for consumers
   */
  const assertValidateFunction = <T>(
    guard: ValidateFunction<T> | AsyncValidateFunction<T> | undefined,
  ): ValidateFunction<T> => {
    if (!guard) throw new Error('Could not resolve schema for AJV')
    if ('$async' in guard) throw new Error('Can not support async AJV type guards')
    return guard
  }

  export const isPhoneNumber = assertValidateFunction(ajv.getSchema<Schema['PhoneNumber']>('#/definitions/PhoneNumber'))
export const isAddress = assertValidateFunction(ajv.getSchema<Schema['Address']>('#/definitions/Address'))
export const isBasePerson = assertValidateFunction(ajv.getSchema<Schema['BasePerson']>('#/definitions/BasePerson'))
export const isPerson = assertValidateFunction(ajv.getSchema<Schema['Person']>('#/definitions/Person'))
export const isSharedBusiness = assertValidateFunction(ajv.getSchema<Schema['SharedBusiness']>('#/definitions/SharedBusiness'))
export const isRegisteredBusiness = assertValidateFunction(ajv.getSchema<Schema['RegisteredBusiness']>('#/definitions/RegisteredBusiness'))
export const isSoleProprietorship = assertValidateFunction(ajv.getSchema<Schema['SoleProprietorship']>('#/definitions/SoleProprietorship'))
export const isLlc = assertValidateFunction(ajv.getSchema<Schema['LLC']>('#/definitions/LLC'))
export const isCorporation = assertValidateFunction(ajv.getSchema<Schema['Corporation']>('#/definitions/Corporation'))
export const isPartnership = assertValidateFunction(ajv.getSchema<Schema['Partnership']>('#/definitions/Partnership'))
export const isBaseBusiness = assertValidateFunction(ajv.getSchema<Schema['BaseBusiness']>('#/definitions/BaseBusiness'))
export const isBusiness = assertValidateFunction(ajv.getSchema<Schema['Business']>('#/definitions/Business'))
export const isBusinessUpdated = assertValidateFunction(ajv.getSchema<Schema['BusinessUpdated']>('#/definitions/BusinessUpdated'))
export const isBusinessResponse = assertValidateFunction(ajv.getSchema<Schema['BusinessResponse']>('#/definitions/BusinessResponse'))
export const isPersonResponse = assertValidateFunction(ajv.getSchema<Schema['PersonResponse']>('#/definitions/PersonResponse'))
export const isBusinessPatchRequest = assertValidateFunction(ajv.getSchema<Schema['BusinessPatchRequest']>('#/definitions/BusinessPatchRequest'))
export const isPersonPatchRequest = assertValidateFunction(ajv.getSchema<Schema['PersonPatchRequest']>('#/definitions/PersonPatchRequest'))
export const isBusinessPostRequest = assertValidateFunction(ajv.getSchema<Schema['BusinessPostRequest']>('#/definitions/BusinessPostRequest'))
export const isGetBusiness200Response = assertValidateFunction(ajv.getSchema<Schema['GetBusiness200Response']>('#/definitions/GetBusiness200Response'))
export const isCreateBusinessRequestBody = assertValidateFunction(ajv.getSchema<Schema['CreateBusinessRequestBody']>('#/definitions/CreateBusinessRequestBody'))
export const isCreateBusiness200Response = assertValidateFunction(ajv.getSchema<Schema['CreateBusiness200Response']>('#/definitions/CreateBusiness200Response'))
export const isPatchBusinessRequestBody = assertValidateFunction(ajv.getSchema<Schema['PatchBusinessRequestBody']>('#/definitions/PatchBusinessRequestBody'))
export const isPatchBusiness200Response = assertValidateFunction(ajv.getSchema<Schema['PatchBusiness200Response']>('#/definitions/PatchBusiness200Response'))
export const isGetPerson200Response = assertValidateFunction(ajv.getSchema<Schema['GetPerson200Response']>('#/definitions/GetPerson200Response'))
export const isPatchPersonRequestBody = assertValidateFunction(ajv.getSchema<Schema['PatchPersonRequestBody']>('#/definitions/PatchPersonRequestBody'))
export const isPatchPerson200Response = assertValidateFunction(ajv.getSchema<Schema['PatchPerson200Response']>('#/definitions/PatchPerson200Response'))
  