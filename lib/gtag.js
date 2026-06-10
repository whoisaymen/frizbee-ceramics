export function gtagEvent(eventName, params) {
  // DEBUG — remove before go-live
  console.log(`[GA4] ${eventName}`, params)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export function formatItem(item) {
  return {
    item_id: item.id,
    item_name: item.title,
    item_variant: item.variantTitle,
    price: parseFloat(item.variantPrice || 0),
    currency: 'EUR',
  }
}
