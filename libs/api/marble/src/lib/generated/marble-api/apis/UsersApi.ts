/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  UserForFront,
} from '../models';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    UserForFrontFromJSON,
    UserForFrontToJSON,
} from '../models';

export interface GetUsersByUserEmailRequest {
    userEmail: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Get User By Email
     */
    async getUsersByUserEmailRaw(requestParameters: GetUsersByUserEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserForFront>> {
        if (requestParameters.userEmail === null || requestParameters.userEmail === undefined) {
            throw new runtime.RequiredError('userEmail','Required parameter requestParameters.userEmail was null or undefined when calling getUsersByUserEmail.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("Oauth2ClientCredentials", []);
        }

        const response = await this.request({
            path: `/users/by/{user_email}`.replace(`{${"user_email"}}`, encodeURIComponent(String(requestParameters.userEmail))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserForFrontFromJSON(jsonValue));
    }

    /**
     * Get User By Email
     */
    async getUsersByUserEmail(requestParameters: GetUsersByUserEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserForFront> {
        const response = await this.getUsersByUserEmailRaw(requestParameters, initOverrides);
        return await response.value();
    }

}