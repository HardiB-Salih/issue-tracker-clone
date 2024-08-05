import ky from "ky";

// API= {
//   get: async (url) => kyInstance.get(url).json(),
//   post: async (url, data) => kyInstance.post(url, { json: data }).json(),
//   put: async (url, data) => kyInstance.put(url, { json: data }).json(),
//   delete: async (url) => kyInstance.delete(url).json(),
// };
// Quick Help: kyInstance

// kyInstance is a pre-configured instance of the ky HTTP client.
// It includes methods for handling CRUD (Create, Read, Update, Delete) operations.

// Configuration
const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
});

export default kyInstance;
