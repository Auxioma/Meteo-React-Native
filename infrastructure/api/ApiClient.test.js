//ApiClient.test.js
import ApiClient from "./ApiClient";

//!Commande à lancer pour le test
//npx jest src/infrastructure/api/ApiClient.test.js
describe('ApiClient', () => {
  it("Récupération de la liste des articles avec l'api", async () => {
    const apiClient = new ApiClient('https://dummyjson.com');
    const articles = await apiClient.get('/posts');
    console.log('Liste des articles:', articles);

    expect(articles).toBeDefined();
    expect(Array.isArray(articles.posts)).toBe(true);
  });
});
