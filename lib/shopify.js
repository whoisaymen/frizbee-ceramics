import { unstable_noStore as noStore } from 'next/cache'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query, variables = {}) {
  const URL = `https://${domain}/api/2023-07/graphql.json` // Revert to stable version

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

export async function createCheckout(id, quantity) {
  console.log('🏪 Creating checkout with:', { id, quantity })

  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
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
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      lineItems: [{ variantId: id, quantity: parseInt(quantity) }],
    },
  }

  try {
    const response = await ShopifyData(query, variables)

    console.log('📥 Create checkout response:', response)

    if (response.data?.checkoutCreate?.userErrors?.length > 0) {
      console.error(
        'Checkout creation errors:',
        response.data.checkoutCreate.userErrors
      )
      throw new Error(
        `Checkout creation failed: ${response.data.checkoutCreate.userErrors[0].message}`
      )
    }

    const checkout = response.data?.checkoutCreate?.checkout

    if (!checkout) {
      throw new Error('No checkout returned from API')
    }

    console.log('✅ Created checkout:', {
      id: checkout.id,
      webUrl: checkout.webUrl,
      createdAt: checkout.createdAt,
      totalPrice: checkout.totalPriceV2,
    })

    return {
      id: checkout.id,
      webUrl: checkout.webUrl,
    }
  } catch (error) {
    console.error('❌ createCheckout error:', error)
    throw error
  }
}

export async function updateCheckout(id, lineItems) {
  console.log('🔄 updateCheckout called with:', { id, lineItems })

  const lineItemsFormatted = lineItems.map((item) => {
    return {
      variantId: item.id,
      quantity: parseInt(item.variantQuantity),
    }
  })

  console.log('📝 Formatted line items:', lineItemsFormatted)

  const query = `
    mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          totalPrice {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    checkoutId: id,
    lineItems: lineItemsFormatted,
  }

  try {
    const response = await ShopifyData(query, variables)

    console.log('📥 Update response:', response)

    if (response.data?.checkoutLineItemsReplace?.userErrors?.length > 0) {
      throw new Error(
        `Checkout update failed: ${response.data.checkoutLineItemsReplace.userErrors[0].message}`
      )
    }

    const checkout = response.data?.checkoutLineItemsReplace?.checkout
    if (!checkout) {
      throw new Error('No checkout returned from API')
    }

    return {
      id: checkout.id,
      webUrl: checkout.webUrl,
      checkoutUrl: checkout.webUrl,
      totalPrice: checkout.totalPrice,
    }
  } catch (error) {
    console.error('❌ updateCheckout error:', error)
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
    }`

  try {
    const response = await ShopifyData(query)
    const checkout = response.data?.node

    if (!checkout) {
      console.log('Checkout not found')
      return { valid: false, reason: 'Checkout not found' }
    }

    if (checkout.completedAt) {
      console.log('Checkout already completed')
      return { valid: false, reason: 'Checkout already completed' }
    }

    console.log('Checkout validation result:', {
      valid: true,
      checkout: {
        id: checkout.id,
        webUrl: checkout.webUrl,
        createdAt: checkout.createdAt,
        totalPrice: checkout.totalPriceV2,
      },
    })

    return { valid: true, checkout }
  } catch (error) {
    console.error('Error validating checkout:', error)
    return { valid: false, reason: error.message }
  }
}
