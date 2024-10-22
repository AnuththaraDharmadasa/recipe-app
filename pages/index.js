import { useEffect, useState } from 'react';

export default function Home() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the external API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Categories</h1>
      <ul className="list-disc list-inside">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.idCategory} className="mb-2">
              {category.strCategory}
            </li>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </ul>
    </div>
  );
}
