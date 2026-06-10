'use client'
import { useEffect } from 'react'
import { gtagEvent } from '@/lib/gtag'

export default function ViewItemListTracker({ items, listName }) {
  useEffect(() => {
    if (!items?.length) return
    gtagEvent('view_item_list', {
      item_list_name: listName,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        currency: 'EUR',
        index,
      })),
    })
  }, [listName])

  return null
}
