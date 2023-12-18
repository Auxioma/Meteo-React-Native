// __mocks__/firebase.js
export const firestore = jest.fn(() => ({
    collection: jest.fn((name) => ({
      add: jest.fn(),
      get: jest.fn(() => Promise.resolve({ docs: [] })),
    })),
  }));
  
  const firebase = {
    firestore,
  };
  
  export default firebase;
  