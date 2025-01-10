import qs from "qs";

const fetchAPI = async (path: string, urlParamsObject = {}, options = {}) => {
  try {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}${queryString ? `?${queryString}` : ""}`;
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Please check if your server is running and you set all the required tokens.");
  }
};

export const getAllPosts = async (page: number = 1) => {
  const response = await fetchAPI("/articles", {
    populate: {
      cover: true,
      category: true,
      authorsBio: {
        populate: ["avatar"],
      },
      seo: {
        populate: ["shareImage"],
      },
    },
    pagination: {
      page,
      pageSize: process.env.NEXT_PUBLIC_PAGE_LIMIT || 6,
    },
    sort: ["publishedAt:desc"],
  });
  return response;
};

export const getPostBySlug = async (slug: string) => {
  const response = await fetchAPI("/articles", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      cover: true,
      category: true,
      blocks: {
        populate: "*",
      },
      authorsBio: {
        populate: ["avatar"],
      },
      seo: {
        populate: ["shareImage"],
      },
    },
  });
  return response.data[0];
};

export const getPostsByCategory = async (category: string, page: number = 1) => {
  const response = await fetchAPI("/articles", {
    filters: {
      category: {
        slug: {
          $eq: category,
        },
      },
    },
    populate: {
      cover: true,
      category: true,
      authorsBio: {
        populate: ["avatar"],
      },
    },
    pagination: {
      page,
      pageSize: process.env.NEXT_PUBLIC_PAGE_LIMIT || 6,
    },
    sort: ["publishedAt:desc"],
  });
  return response;
};

export const getCategories = async () => {
  const response = await fetchAPI("/categories", {
    populate: "*",
  });
  return response;
};

export const getStrapiURL = () => {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
};

export const getStrapiMedia = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
