class ApiAuthHelper {
  constructor(request) {
    this.request = request;
  }

  async #parseResponse(
    response,
    expectedResponseCode,
    label,
    throwOnError = true,
  ) {
    if (response.status() !== 200) {
      throw new Error(`${label} failed with status ${response.status()}`);
    }
    const body = await response.json();
    if (body.responseCode !== expectedResponseCode && throwOnError) {
      throw new Error(`${label} failed: ${body.message}`);
    }
    return body;
  }

  #createFormData(user) {
    return {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: user.password,
      firstname: user.firstName,
      lastname: user.lastName,
      address1: user.address,
      country: user.country,
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile_number: user.mobileNumber,
    };
  }

  async loginViaApi(email, password, { throwOnError = true } = {}) {
    // Add option to return response body for some error codes
    // e.g. if wrong credentials are provided, in the case of negative test scenarios.
    const response = await this.request.post("/api/verifyLogin", {
      form: { email, password },
    });

    return this.#parseResponse(response, 200, "Login", throwOnError);
  }

  async deleteUserViaApi(email, password, { throwOnError = true } = {}) {
    const response = await this.request.delete("/api/deleteAccount", {
      form: { email, password },
    });

    return this.#parseResponse(response, 200, "Delete User", throwOnError);
  }

  async createUserViaApi(user, { throwOnError = true } = {}) {
    // Add option to return response body for some error codes
    // e.g. if email already exists, in the case of negative test scenarios.
    const response = await this.request.post("/api/createAccount", {
      form: this.#createFormData(user),
    });

    // API returns HTTP 200 with responseCode 201 in body on success
    return this.#parseResponse(response, 201, "Create User", throwOnError);
  }

  async updateUserViaApi(user, { throwOnError = true } = {}) {
    // Add option to return response body for some error codes
    // e.g. if update has invalid fields, in the case of negative test scenarios.
    const response = await this.request.put("/api/updateAccount", {
      form: this.#createFormData(user),
    });

    return this.#parseResponse(response, 200, "Update User", throwOnError);
  }

  async getUserAccountDetailByEmail(email, { throwOnError = true } = {}) {
    // Add option to return response body for some error codes
    // e.g. if email doesn't exist, in the case of negative test scenarios.
    const response = await this.request.get("/api/getUserDetailByEmail", {
      params: { email },
    });

    return this.#parseResponse(response, 200, "Get User Detail", throwOnError);
  }
}

export { ApiAuthHelper };
