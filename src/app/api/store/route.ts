import { NextResponse } from 'next/server';

// Mock in-memory state for outlets, menu, and orders
let outlets = [
  { id: 'out-kondapur', name: 'Kondapur Outlet', deliveryRadiusKm: 5, fssaiLicense: '13621011000412', minPrepMinutes: 25, managerOverrideMins: null },
  { id: 'out-gachibowli', name: 'Gachibowli Outlet', deliveryRadiusKm: 6, fssaiLicense: '13621011000415', minPrepMinutes: 25, managerOverrideMins: null },
  { id: 'out-kukatpally', name: 'Kukatpally Outlet', deliveryRadiusKm: 7, fssaiLicense: '13621011000418', minPrepMinutes: 30, managerOverrideMins: null }
];

let menu = [
  {
    id: 'item-1',
    name: 'Chicken Dum Biryani Family Pack',
    category: 'Biryani',
    isVeg: false,
    priceInr: 880,
    basePrepMinutes: 25,
    spiceLevel: 'Medium',
    description: 'Slow-cooked kachchi yakhni basmati biryani with 4 tender pieces.',
    allergens: ['Dairy', 'Nuts'],
    photoUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    outletAvailability: {
      'out-kondapur': { isAvailable: true },
      'out-gachibowli': { isAvailable: true },
      'out-kukatpally': { isAvailable: true }
    }
  },
  {
    id: 'item-2',
    name: 'Double ka Meetha',
    category: 'Dessert',
    isVeg: true,
    priceInr: 190,
    basePrepMinutes: 10,
    spiceLevel: 'None',
    description: 'Hyderabadi Shahi Tukray with rich rabri and fried bread.',
    allergens: ['Dairy', 'Gluten'],
    photoUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    outletAvailability: {
      'out-kondapur': { isAvailable: true },
      'out-gachibowli': { isAvailable: true },
      'out-kukatpally': { isAvailable: true }
    }
  }
];

let orders = [
  {
    id: 'WEB-778120',
    outletId: 'out-kondapur',
    outletName: 'Kondapur Outlet',
    status: 'PREPARING',
    itemsSummary: '1x Chicken Dum Biryani Family Pack',
    placedAtDisplay: '12:30 PM',
    promisedAtDisplay: '12:55 PM',
    minutesDeltaFromPromise: 0,
    notifications: ['WhatsApp sent: Order WEB-778120 confirmed. Prep time ~25 mins.']
  }
];

export async function GET() {
  return NextResponse.json({ outlets, menu, orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.action === 'PLACE_ORDER') {
      const newOrder = {
        id: `WEB-${Math.floor(100000 + Math.random() * 900000)}`,
        outletId: body.outletId,
        outletName: outlets.find(o => o.id === body.outletId)?.name || 'Outlet',
        status: 'PREPARING',
        itemsSummary: body.items.map((i: any) => `${i.qty}x ${i.name}`).join(', '),
        placedAtDisplay: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        promisedAtDisplay: new Date(Date.now() + 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        minutesDeltaFromPromise: 0,
        notifications: [
          `WhatsApp sent: Order confirmed.`,
          body.dpdpMarketingOptIn ? `DPDP WhatsApp Consent recorded.` : `DPDP Opt-out respected.`
        ]
      };
      orders.unshift(newOrder);
      return NextResponse.json({ success: true, order: newOrder, store: { outlets, menu, orders } });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}