const searchTerm = "chicken";
const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&lang=en`;

fetch(searchUrl)
  .then(res => res.json())
  .then(data => {
    const products = data.products;
    products.slice(0, 5).forEach(p => {
      console.log(`Produit: ${p.product_name} - Calories: ${p.nutriments?.['energy-kcal_100g'] || 'N/A'}`);
    });
  })
  .catch(err => console.error("Erreur :", err));