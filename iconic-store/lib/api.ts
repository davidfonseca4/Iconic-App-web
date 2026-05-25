export interface Product {
  id: number;
  slug: string;
  name: string;
  person: string;
  category: string;
  subcategory: string;
  era: string;
  year: number;
  price: number;
  currency: string;
  description: string;
  provenance: string;
  images: string[];
  certified: boolean;
  featured: boolean;
  vault: boolean;
}

interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ProductResponse {
  data: Product;
}

interface FiltersResponse {
  data: {
    categories: string[];
    eras: string[];
  };
}

interface CheckoutItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

const toQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });
  return query.toString();
};

export const getProducts = async (
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<ProductsResponse> => {
  const query = toQueryString(params);
  const url = `${API_URL}/products${query ? `?${query}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  const res = await fetch(`${API_URL}/products/${slug}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};

export const getProductFilters = async (): Promise<FiltersResponse> => {
  const res = await fetch(`${API_URL}/products/meta/filters`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch product filters");
  }
  return res.json();
};

export const subscribeEmail = async (email: string): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    throw new Error("Failed to subscribe email");
  }

  return res.json();
};

export const createVaultInquiry = async (payload: {
  name: string;
  email: string;
  phone: string;
  intent: string;
  item: string;
}): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_URL}/vault-inquire`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to create vault inquiry");
  }

  return res.json();
};

export const createCheckoutRequest = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  items: CheckoutItem[];
  total: number;
}): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to create checkout request");
  }

  return res.json();
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
}): Promise<{ data: AuthUser }> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  return res.json();
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<{ data: { token: string; user: AuthUser } }> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
};

export const getMe = async (token: string): Promise<{ data: AuthUser }> => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
};
