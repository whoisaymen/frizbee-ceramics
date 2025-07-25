import { unstable_noStore as noStore } from "next/cache";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2024-07/graphql.json`;

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
    const response = await fetch(URL, options);
    
    if (!response.ok) {
      console.error('HTTP Error:', response.status, response.statusText);
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0].message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw new Error(`Shopify API Error: ${error.message}`);
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
  // Try using Cart API instead of Checkout API
  const cartQuery = `
    mutation {
      cartCreate(input: {
        lines: [{ merchandiseId: "${id}", quantity: ${quantity}}]
      }) {
        cart {
          id
          checkoutUrl
          createdAt
          updatedAt
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }`;

  try {
    const response = await ShopifyData(cartQuery);
    
    if (response.data?.cartCreate?.userErrors?.length > 0) {
      console.error('Cart creation errors:', response.data.cartCreate.userErrors);
      throw new Error(`Cart creation failed: ${response.data.cartCreate.userErrors[0].message}`);
    }

    if (response.data?.cartCreate?.cart) {
      const cart = response.data.cartCreate.cart;
      
      console.log('Created cart:', {
        id: cart.id,
        checkoutUrl: cart.checkoutUrl,
        createdAt: cart.createdAt,
        totalCost: cart.cost.totalAmount
      });

      // Return in the same format as checkout for compatibility
      return {
        id: cart.id,
        webUrl: cart.checkoutUrl
      };
    }
  } catch (error) {
    console.log('Cart API failed, falling back to Checkout API');
  }

  // Fallback to original Checkout API
  const checkoutQuery = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
          createdAt
          updatedAt
          totalPriceV2 {
            amount
            currencyCode
          }
          lineItems(first: 5) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }`;

  const response = await ShopifyData(checkoutQuery);

  if (!response.data || !response.data.checkoutCreate) {
    console.error('Invalid response structure:', response);
    throw new Error('Invalid response from Shopify API');
  }

  if (response.data.checkoutCreate.checkoutUserErrors && response.data.checkoutCreate.checkoutUserErrors.length > 0) {
    console.error('Checkout creation errors:', response.data.checkoutCreate.checkoutUserErrors);
    throw new Error(`Checkout creation failed: ${response.data.checkoutCreate.checkoutUserErrors[0].message}`);
  }

  const checkout = response.data.checkoutCreate.checkout;
  
  // Log checkout details for debugging
  console.log('Created checkout:', {
    id: checkout.id,
    webUrl: checkout.webUrl,
    createdAt: checkout.createdAt,
    totalPrice: checkout.totalPriceV2
  });

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  // Check if this is a cart ID (starts with gid://shopify/Cart/) or checkout ID
  const isCartId = id.includes('gid://shopify/Cart/');
  
  if (isCartId) {
    // Use Cart API for updates
    const cartLines = lineItems.map((item) => {
      return `{
        merchandiseId: "${item.id}",
        quantity: ${item.variantQuantity}
      }`;
    }).join(',');

    const query = `
      mutation {
        cartLinesReplace(cartId: "${id}", lines: [${cartLines}]) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 25) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }`;

    const response = await ShopifyData(query);

    if (response.data?.cartLinesReplace?.userErrors?.length > 0) {
      console.error('Cart update errors:', response.data.cartLinesReplace.userErrors);
      throw new Error(`Cart update failed: ${response.data.cartLinesReplace.userErrors[0].message}`);
    }

    const cart = response.data?.cartLinesReplace?.cart;
    
    if (cart) {
      return {
        id: cart.id,
        webUrl: cart.checkoutUrl
      };
    }
  } else {
    // Use original Checkout API
    const lineItemsObject = lineItems.map((item) => {
      return `{
        variantId: "${item.id}",
        quantity:  ${item.variantQuantity}
      }`;
    });

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
        checkoutUserErrors {
          field
          message
        }
      }
    }`;

    const response = await ShopifyData(query);

    if (!response.data || !response.data.checkoutLineItemsReplace) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from Shopify API');
    }

    if (response.data.checkoutLineItemsReplace.checkoutUserErrors && response.data.checkoutLineItemsReplace.checkoutUserErrors.length > 0) {
      console.error('Checkout update errors:', response.data.checkoutLineItemsReplace.checkoutUserErrors);
      throw new Error(`Checkout update failed: ${response.data.checkoutLineItemsReplace.checkoutUserErrors[0].message}`);
    }

    const checkout = response.data.checkoutLineItemsReplace.checkout;
    return checkout;
  }
  
  throw new Error('Failed to update cart/checkout');
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

export async function validateCheckoutUrl(checkoutId) {
  const query = `
    query {
      node(id: "${checkoutId}") {
        ... on Checkout {
          id
          webUrl
          completedAt
          createdAt
          updatedAt
          totalPriceV2 {
            amount
            currencyCode
          }
        }
      }
    }`;

  try {
    const response = await ShopifyData(query);
    const checkout = response.data?.node;
    
    if (!checkout) {
      console.log('Checkout not found');
      return { valid: false, reason: 'Checkout not found' };
    }
    
    if (checkout.completedAt) {
      console.log('Checkout already completed');
      return { valid: false, reason: 'Checkout already completed' };
    }
    
    console.log('Checkout validation result:', {
      valid: true,
      checkout: {
        id: checkout.id,
        webUrl: checkout.webUrl,
        createdAt: checkout.createdAt,
        totalPrice: checkout.totalPriceV2
      }
    });
    
    return { valid: true, checkout };
  } catch (error) {
    console.error('Error validating checkout:', error);
    return { valid: false, reason: error.message };
  }
}
