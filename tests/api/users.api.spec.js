import { test, expect } from "../../fixtures/baseTest";

test.describe("Users API", () => {
  test.describe("User-Create", () => {
    test(
      "User-Create: POST register user account with valid details then delete account via API",
      { tag: "@skipApiAuth" },
      async ({ userData, apiUser }) => {
        const { validUser } = userData;
        let deleteUserResponse;
        let createUserResponse;

        try {
          createUserResponse = await apiUser.createUserViaApi(validUser);
          expect(createUserResponse.responseCode).toBe(201);
          expect(createUserResponse.message).toBe("User created!");
        } finally {
          deleteUserResponse = await apiUser.deleteUserViaApi(
            validUser.email,
            validUser.password,
          );
          expect(deleteUserResponse.responseCode).toBe(200);
          expect(deleteUserResponse.message).toBe("Account deleted!");
        }
      },
    );

    test(
      "User-Create: POST create user with missing required email field should fail",
      { tag: "@skipApiAuth" },
      async ({ userData, apiUser }) => {
        const { userWithMissingFields } = userData;

        const createUserResponse = await apiUser.createUserViaApi(
          userWithMissingFields,
          {
            throwOnError: false,
          },
        );
        expect(createUserResponse.responseCode).toBe(400);
        expect(createUserResponse.message).toContain(
          "Bad request, email parameter is missing in POST request.",
        );
      },
    );

    test("User-Create: POST create/register user account with duplicate email should fail", async ({
      registeredUser,
      userData,
    }) => {
      // registered User was already created by the fixture!
      const { validUser } = userData;
      const response = await registeredUser.createUserViaApi(validUser, {
        throwOnError: false,
      });
      expect(response.responseCode).toBe(400);
      expect(response.message).toContain("Email already exists");
    });

    //API doesn't perform email format validation, it just checks if the email field is present,
    // so this test case is not applicable based on current API behavior. If email format validation is
    // added in the future, this test can be implemented.
  });

  test.describe("User-Login", () => {
    test("User-Login: POST login with valid credentials should succeed", async ({
      registeredUser,
      userData,
    }) => {
      // registered User was already created by the fixture!
      const { validUser } = userData;
      const response = await registeredUser.loginViaApi(
        validUser.email,
        validUser.password,
      );
      expect(response.responseCode).toBe(200);
      expect(response.message).toBe("User exists!");
    });

    test("User-Login: POST login with invalid credentials should fail", async ({
      registeredUser,
      userData,
    }) => {
      // registered User was already created by the fixture!
      const { validUser } = userData;
      const response = await registeredUser.loginViaApi(
        validUser.email,
        "wrongpassword",
        {
          throwOnError: false,
        },
      );
      expect(response.responseCode).toBe(404);
      expect(response.message).toBe("User not found!");
    });

    test(
      "User-Login: POST login with non-existent email should fail",
      { tag: "@skipApiAuth" },
      async ({ apiUser }) => {
        const response = await apiUser.loginViaApi(
          "nonexistent@example.com",
          "somepassword",
          {
            throwOnError: false,
          },
        );

        expect(response.responseCode).toBe(404);
        expect(response.message).toContain("User not found!");
      },
    );

    test(
      "User-Login: POST Deleted user cannot login",
      { tag: "@skipApiAuth" },
      async ({ apiUser, userData }) => {
        const { validUser } = userData;
        await apiUser.createUserViaApi(validUser);
        await apiUser.deleteUserViaApi(validUser.email, validUser.password);
        const response = await apiUser.loginViaApi(
          validUser.email,
          validUser.password,
          {
            throwOnError: false,
          },
        );
        expect(response.responseCode).toBe(404);
        expect(response.message).toContain("User not found!");
      },
    );
  });

  test.describe("User-Get", () => {
    test("User-Get: GET user account details by email should fail if email doesn't exist", async ({
      registeredUser,
    }) => {
      // registered User was already created by the fixture!
      const response = await registeredUser.getUserAccountDetailByEmail(
        "nonexistent@example.com",
        {
          throwOnError: false,
        },
      );
      expect(response.responseCode).toBe(404);
      expect(response.message).toContain(
        "Account not found with this email, try another email!",
      );
    });

    test("User-Get: Verify account details after registration", async ({
      registeredUser,
      userData,
    }) => {
      // registered User was already created by the fixture!
      const { validUser } = userData;
      const getUserResponse = await registeredUser.getUserAccountDetailByEmail(
        validUser.email,
      );

      expect(getUserResponse.responseCode).toBe(200);
      expect(getUserResponse.user).toBeDefined(); // Ensure user details are returned
      expect(getUserResponse.user.id).toBeGreaterThan(0);

      expect(getUserResponse).toMatchObject({
        user: {
          email: validUser.email,
          first_name: validUser.firstName,
          last_name: validUser.lastName,
        },
      });
    });

    test(
      "User-Get: GET user account details by email should fail after account deletion",
      { tag: "@skipApiAuth" },
      async ({ apiUser, userData }) => {
        const { validUser } = userData;
        await apiUser.createUserViaApi(validUser);
        await apiUser.deleteUserViaApi(validUser.email, validUser.password);
        const response = await apiUser.getUserAccountDetailByEmail(
          validUser.email,
          {
            throwOnError: false,
          },
        );
        expect(response.responseCode).toBe(404);
        expect(response.message).toContain(
          "Account not found with this email, try another email!",
        );
      },
    );
  });

  test.describe("User-Delete", () => {
    test("User-Delete: DELETE user with invalid password should fail", async ({
      registeredUser,
      userData,
    }) => {
      const { validUser } = userData;
      const deleteResponse = await registeredUser.deleteUserViaApi(
        validUser.email,
        "wrongpassword",
        {
          throwOnError: false,
        },
      );
      expect(deleteResponse.responseCode).toBe(404);
      expect(deleteResponse.message).toBe("Account not found!");
    });

    test(
      "User-Delete: DELETE non-existent user should fail",
      { tag: "@skipApiAuth" },
      async ({ apiUser }) => {
        const deleteResponse = await apiUser.deleteUserViaApi(
          "nonexistent@example.com",
          "wrongpassword",
          {
            throwOnError: false,
          },
        );
        expect(deleteResponse.responseCode).toBe(404);
        expect(deleteResponse.message).toBe("Account not found!");
      },
    );
  });
});
