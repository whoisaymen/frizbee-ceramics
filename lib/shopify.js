import { unstable_noStore as noStore } from 'next/cache'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query, variables = {}) {
  const URL = `https://${domain}/api/2024-07/graphql.json` // Use newer API version

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  }

  try {
    const response = await fetch(URL, options)

    if (!response.ok) {
      console.error('HTTP Error:', response.status, response.statusText)
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      throw new Error(`GraphQL Error: ${data.errors[0].message}`)
    }

    return data
  } catch (error) {
    console.error('Shopify API Error:', error)
    throw new Error(`Shopify API Error: ${error.message}`)
  }
}

export async function getProductsInCollection() {
  noStore()

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
  }`

  const response = await ShopifyData(query)
  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : []

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // Filter products by the tag "color:blue"
  // allProducts = allProducts.filter(product => product.tags.includes('color:blue'));

  return allProducts
}

export async function getProductsForProject(projectSlug) {
  noStore()

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
  }`

  const data = await ShopifyData(query)

  const products = data?.data?.collection?.products?.edges || []

  // Filter products based on the project tag
  const projectProducts = products.filter((product) =>
    product.node.tags.some((tag) => tag === `project:${projectSlug}`)
  )

  return projectProducts
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
  }`

  const response = await ShopifyData(query)

  const slugs = response.data.products.edges ? response.data.products.edges : []

  return slugs
}

export async function getProduct(handle) {
  noStore()
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
  }`

  const response = await ShopifyData(query)

  // console.log("Shopify response:", response);

  if (!response || !response.data) {
    throw new Error('Shopify API response is invalid or empty')
  }

  const product = response.data.product ?? null

  if (!product) {
    throw new Error(`Product with handle "${handle}" not found.`)
  }

  return product
}

export async function createCheckout(items) {
  console.log('🏪 Creating checkout with:', { items })

  const cartQuery = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const cartVariables = {
    input: {
      lines: items.map((item) => ({
        merchandiseId: item.id,
        quantity: parseInt(item.variantQuantity),
      })),
    },
  }

  try {
    const response = await ShopifyData(cartQuery, cartVariables)

    if (response.data?.cartCreate?.userErrors?.length > 0) {
      throw new Error(
        `Cart creation failed: ${response.data.cartCreate.userErrors[0].message}`
      )
    }

    const cart = response.data?.cartCreate?.cart
    if (!cart || !cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Cart API')
    }

    console.log('✅ Created cart successfully:', {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
    })

    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      checkoutUrl: cart.checkoutUrl,
    }
  } catch (error) {
    console.error('❌ Cart creation failed:', error)
    throw error
  }
}

export async function updateCheckout(id, lineItems) {
  console.log('🔄 updateCheckout called with:', { id, lineItems })

  // If we're removing all items or have no items, return null to clear cart
  if (
    lineItems.length === 0 ||
    lineItems.every((item) => parseInt(item.variantQuantity) === 0)
  ) {
    console.log('🗑️ All items removed, clearing cart')
    return null
  }

  // Filter out items with quantity 0 (these should be removed)
  const itemsToKeep = lineItems.filter(
    (item) => parseInt(item.variantQuantity) > 0
  )

  console.log('Items to keep:', itemsToKeep)

  // Instead of trying to update the existing cart, create a fresh one
  // This ensures the checkout URL reflects the current state
  try {
    console.log('🔄 Creating fresh cart with remaining items...')

    const cartQuery = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const cartVariables = {
      input: {
        lines: itemsToKeep.map((item) => ({
          merchandiseId: item.id,
          quantity: parseInt(item.variantQuantity),
        })),
      },
    }

    const response = await ShopifyData(cartQuery, cartVariables)

    if (response.data?.cartCreate?.userErrors?.length > 0) {
      throw new Error(
        `Cart creation failed: ${response.data.cartCreate.userErrors[0].message}`
      )
    }

    const cart = response.data?.cartCreate?.cart
    if (!cart || !cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Cart API')
    }

    console.log('✅ Created fresh cart successfully:', {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
    })

    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      checkoutUrl: cart.checkoutUrl,
    }
  } catch (error) {
    console.error('❌ Failed to create fresh cart:', error)
    throw error
  }
}
export async function recursiveCatalog(cursor = '', initialRequest = true) {
  let data

  if (cursor !== '') {
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
    }`

    const response = await ShopifyData(query)
    data = response.data.products.edges ? response.data.products.edges : []

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length
      const cursor = response.data.products.edges[num - 1].cursor

      return data.concat(await recursiveCatalog(cursor))
    } else {
      return data
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
    `

    const response = await ShopifyData(query)
    data = response.data.products.edges ? response.data.products.edges : []

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length
      const cursor = response.data.products.edges[num - 1].cursor

      return data.concat(await recursiveCatalog(cursor))
    } else {
      return data
    }
  }
}

export async function validateCheckoutUrl(cartId) {
  // Since we're using Cart API now, validate the cart instead of checkout
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        createdAt
        updatedAt
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }`

  try {
    const response = await ShopifyData(query, { cartId })
    const cart = response.data?.cart

    if (!cart) {
      console.log('Cart not found')
      return { valid: false, reason: 'Cart not found' }
    }

    if (!cart.checkoutUrl) {
      console.log('Cart has no checkout URL')
      return { valid: false, reason: 'Cart has no checkout URL' }
    }

    console.log('Cart validation result:', {
      valid: true,
      cart: {
        id: cart.id,
        checkoutUrl: cart.checkoutUrl,
        totalQuantity: cart.totalQuantity,
        createdAt: cart.createdAt,
        totalCost: cart.cost?.totalAmount,
      },
    })

    return { valid: true, cart }
  } catch (error) {
    console.error('Error validating cart:', error)
    return { valid: false, reason: error.message }
  }
}
