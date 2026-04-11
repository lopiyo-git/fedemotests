class ApiAuthHelper {
  constructor(request) {
    this.request = request;
  }

  async loginViaApi(email, password, { throwOnError = true } = {}) {
    // Add option to to return response body for some error codes
    // e.g. if wrong credentials are provided, in the case of negative test scenarios.
    const response = await this.request.post("/api/verifyLogin", {
      form: { email, password },
    });

    if (response.status() !== 200) {
      throw new Error(`Login failed with status ${response.status()}`);
    }

    const responseBody = await response.json();
    if (responseBody.responseCode !== 200) {
      if (throwOnError) {
        throw new Error(`Login failed: ${responseBody.message}`);
      }
    }
    return responseBody;
  }

  async deleteUserViaApi(email, password, { throwOnError = true } = {}) {
    const response = await this.request.delete("/api/deleteAccount", {
      form: { email, password },
    });

    if (response.status() !== 200) {
      throw new Error(`Delete user failed with status ${response.status()}`);
    }

    const responseBody = await response.json();
    if (responseBody.responseCode !== 200) {
      if (throwOnError) {
        throw new Error(`Delete user failed: ${responseBody.message}`);
      }
    }
    return responseBody;
  }

  async createUserViaApi(user, { throwOnError = true } = {}) {
    // Add option to to return response body for some error codes
    // e.g. if email already exists, in the case of negative test scenarios.
    const response = await this.request.post("/api/createAccount", {
      form: {
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
      },
    });

    if (response.status() !== 200) {
      throw new Error(`Create user failed with status ${response.status()}`);
    }

    const responseBody = await response.json();

    if (responseBody.responseCode !== 201) {
      if (throwOnError) {
        throw new Error(`Create user failed: ${responseBody.message}`);
      }
    }

    return responseBody;
  }

  async getUserAccountDetailByEmail(email, { throwOnError = true } = {}) {
    // Add option to to return response body for some error codes
    // e.g. if email doesn't exist, in the case of negative test scenarios.
    const response = await this.request.get("/api/getUserDetailByEmail", {
      params: { email },
    });

    if (response.status() !== 200) {
      throw new Error(
        `Get user detail failed with status ${response.status()}`,
      );
    }

    const responseBody = await response.json();

    if (responseBody.responseCode !== 200) {
      if (throwOnError) {
        throw new Error(`Get user detail failed: ${responseBody.message}`);
      }
    }

    return responseBody;
  }
}

export { ApiAuthHelper };
