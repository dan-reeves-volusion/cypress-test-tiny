import { fakerEN_US as faker } from "@faker-js/faker";

export function RandomCustomer() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: "320-222-5058",
      email: Date.now() + faker.internet.email({ provider: 'test.volusion.com' }),
      password: "password1",
      emailOptIn: false,
      anonymous: false,
      address: "11220 Persimmon Gap Dr",
      city: "Austin",
      state: "Texas",
      country: "United States",
      zipCode: "78717"
    };
  }

  export const DefaultCreditCard = {
    name: faker.person.fullName(),
    number: "4242424242424242",
    monthExp: '12',
    yearExp: '2025',
    securityCode: "900",
    brand: "Visa",
    lastDigits: "4242"
  };