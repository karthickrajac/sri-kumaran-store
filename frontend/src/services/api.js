const API_URL = import.meta.env.VITE_API_URL;

// Get all products
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}


// Login shopkeeper
export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.text();
}


// Add product
export async function addProduct(product) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
}


// Update product
export async function updateProduct(id, product) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}


// Delete product
export async function deleteProduct(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.text();
}


// Create a new sale
export async function createSale(saleData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(saleData),
  });

  if (!response.ok) {
    let errorMessage = "Failed to create bill.";

    try {
      const errorData = await response.json();

      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (error) {
      console.error("Could not read error response:", error);
    }

    throw new Error(errorMessage);
  }

  return response.json();
}


// Get all sales
export async function getSales() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/sales`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sales");
  }

  return response.json();
}


// Get today's total sales
export async function getTodaySales() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/sales/today`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch today's sales");
  }

  return response.json();
}