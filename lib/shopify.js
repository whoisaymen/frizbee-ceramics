import { unstable_noStore as noStore } from "next/cache";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
  // const URL = `https://${domain}/api/2023-07/graphql.json`;
  const URL = `https://${domain}/api/2025-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    // cache: "force-cache",
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
  noStore();

  const query = `
  {
    collection(handle: "frontpage") {
      title
      products(first: 250, sortKey: MANUAL) {
        edges {
          node {
            id
            title
            handle
            createdAt
            updatedAt
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            media(first: 10) {
              edges {
                node {
                  ... on Video {
                    sources {
                      url
                      mimeType
                    }
                  }
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            options {
              name
              values
              id
            }
            variants(first: 25) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);
  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // Filter products by the tag "color:blue"
  // allProducts = allProducts.filter(product => product.tags.includes('color:blue'));

  return allProducts;
}

export async function getProductsForProject(projectSlug) {
  noStore();

  const query = `
  {
    collection(handle: "frontpage") {
      title
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            createdAt
            updatedAt
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            media(first: 10) {
              edges {
                node {
                  ... on MediaImage {
                    id
                    image {
                      url
                      altText
                    }
                    mediaContentType
                  }
                  ... on Video {
                    id
                    sources {
                      url
                      mimeType
                      format
                      height
                      width
                    }
                    mediaContentType
                  }
                }
              }
            }
            options {
              name
              values
              id
            }
            variants(first: 25) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const data = await ShopifyData(query);

  const products = data?.data?.collection?.products?.edges || [];

  // Filter products based on the project tag
  const projectProducts = products.filter((product) =>
    product.node.tags.some((tag) => tag === `project:${projectSlug}`)
  );

  return projectProducts;
}
export async function getAllProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  noStore();
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      descriptionHtml
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      media(first: 10) {
        edges {
          node {
            ... on MediaImage {
              id
              image {
                url
                altText
              }
              mediaContentType
            }
            ... on Video {
              id
              sources {
                url
                mimeType
                format
                height
                width
              }
              mediaContentType
            }
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            compareAtPriceV2 {
              amount
            }
            priceV2 {
              amount
            }
          }
        }
      }
      metafields(identifiers: [{namespace: "custom", key: "height"}, {namespace: "custom", key: "capacity"},  {namespace: "custom", key: "diameter"}
      ]) {
        id
        namespace
        key
        value
      }
    }
  }`;

  const response = await ShopifyData(query);

  // console.log("Shopify response:", response);

  if (!response || !response.data) {
    throw new Error("Shopify API response is invalid or empty");
  }

  const product = response.data.product ?? null;

  if (!product) {
    throw new Error(`Product with handle "${handle}" not found.`);
  }

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });
  // console.log(id, lineItems);

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function recursiveCatalog(cursor = "", initialRequest = true) {
  let data;

  if (cursor !== "") {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  }
}
