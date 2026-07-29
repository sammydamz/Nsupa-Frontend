import { Bottle, Order, Subscription, WalletTransaction, EnvironmentalStats, NotificationItem } from '../types';

export const initialEnvironmentalStats: EnvironmentalStats = {
  sachetsSaved: 1420,
  plasticWasteKgSaved: 18.5,
  co2PreventedKg: 42.8,
  reusableCyclesCompleted: 38,
  litresDelivered: 710,
  treesEquivalent: 4,
};

export const initialBottles: Bottle[] = [
  {
    id: 'NS-BTL-8821',
    qrCode: 'Nsupa-15L-8821-ACCR',
    sizeLitres: 15,
    type: '15L Reusable Dispenser Bottle',
    status: 'with_customer',
    linerState: 'partially_used',
    tamperEvidentRingIntact: true,
    depositAmountGHS: 25,
    assignedCustomer: 'Ama Mensah',
    lastRefilledAt: '2026-07-18 09:30 AM',
    depotLocation: 'Achimota Certified Depot #1',
    batchNumber: 'BATCH-2026-0718-A',
    refillCount: 14,
  },
  {
    id: 'NS-BTL-8822',
    qrCode: 'Nsupa-15L-8822-ACCR',
    sizeLitres: 15,
    type: '15L Reusable Dispenser Bottle',
    status: 'with_customer',
    linerState: 'empty_ready_return',
    tamperEvidentRingIntact: false,
    depositAmountGHS: 25,
    assignedCustomer: 'Ama Mensah',
    lastRefilledAt: '2026-07-02 02:15 PM',
    depotLocation: 'Achimota Certified Depot #1',
    batchNumber: 'BATCH-2026-0702-B',
    refillCount: 22,
  },
  {
    id: 'NS-BTL-9003',
    qrCode: 'Nsupa-15L-9003-ACCR',
    sizeLitres: 15,
    type: '15L Reusable Dispenser Bottle',
    status: 'in_transit',
    linerState: 'freshly_filled',
    tamperEvidentRingIntact: true,
    depositAmountGHS: 25,
    assignedCustomer: 'Kofi Asante',
    assignedDriver: 'Kwame Osei (Rider #12)',
    lastRefilledAt: '2026-07-21 07:45 AM',
    depotLocation: 'East Legon Dispatch Station',
    batchNumber: 'BATCH-2026-0721-C',
    refillCount: 8,
  },
  {
    id: 'NS-BTL-4110',
    qrCode: 'Nsupa-5L-4110-KMS',
    sizeLitres: 5,
    type: '5L Eco Pouch',
    status: 'at_depot_cleaning',
    linerState: 'empty_ready_return',
    tamperEvidentRingIntact: false,
    depositAmountGHS: 10,
    lastRefilledAt: '2026-07-10 11:00 AM',
    depotLocation: 'Kumasi Central Hub',
    batchNumber: 'BATCH-2026-0710-A',
    refillCount: 31,
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    orderNumber: 'NS-94821',
    customerName: 'Ama Mensah',
    customerPhone: '+233 24 412 3456',
    deliveryAddress: 'House 14, Boundary Road, East Legon, Accra',
    region: 'East Legon, Accra',
    items: [
      {
        bottleType: '15L Reusable Dispenser Bottle Refill',
        quantity: 2,
        unitPriceGHS: 15,
        surchargePerBottleGHS: 0, // Swapped 2 empty shells!
        hasEmptyToSwap: true,
      }
    ],
    totalPriceGHS: 30, // 2x GH₵15
    surchargeTotalGHS: 0,
    paymentMethod: 'mtn_momo',
    paymentStatus: 'paid',
    deliveryStatus: 'out_for_delivery',
    scheduledDate: '2026-07-22',
    scheduledTimeSlot: '10:00 AM - 12:00 PM',
    driverName: 'Kwame Osei',
    driverPhone: '+233 20 882 1109',
    driverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    driverLat: 5.6321,
    driverLng: -0.1654,
    emptyBottlesToCollect: 2,
    emptyBottlesSwapped: 2,
    createdAt: '2026-07-22 07:30 AM',
  },
  {
    id: 'ORD-2026-002',
    orderNumber: 'NS-94780',
    customerName: 'Ama Mensah',
    customerPhone: '+233 24 412 3456',
    deliveryAddress: 'House 14, Boundary Road, East Legon, Accra',
    region: 'East Legon, Accra',
    items: [
      {
        bottleType: '15L Reusable Dispenser Bottle Refill',
        quantity: 2,
        unitPriceGHS: 15,
        surchargePerBottleGHS: 0,
        hasEmptyToSwap: true,
      }
    ],
    totalPriceGHS: 30,
    surchargeTotalGHS: 0,
    paymentMethod: 'mtn_momo',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    scheduledDate: '2026-07-15',
    scheduledTimeSlot: '02:00 PM - 04:00 PM',
    driverName: 'Kwame Osei',
    driverPhone: '+233 20 882 1109',
    emptyBottlesToCollect: 2,
    emptyBottlesSwapped: 2,
    createdAt: '2026-07-15 09:10 AM',
  }
];

export const initialSubscriptions: Subscription[] = [
  {
    id: 'SUB-881',
    planName: 'Family Clean Water Pack',
    frequency: 'bi_weekly',
    bottleQuantity: 2,
    bottleType: '15L Reusable Dispenser Bottle',
    nextDeliveryDate: '2026-07-29',
    deliveryAddress: 'House 14, Boundary Road, East Legon, Accra',
    paymentMethod: 'MTN Mobile Money (*170# Auto-Debit)',
    status: 'active',
    discountPercent: 12,
    autoRefillAiEnabled: true,
  }
];

export const initialTransactions: WalletTransaction[] = [
  {
    id: 'TXN-901',
    type: 'shell_exchange',
    amountGHS: 30.00,
    description: '1:1 Shell Swap Refill (2x 15L Water @ GH₵15.00 each)',
    date: '2026-07-20 03:45 PM',
    status: 'completed',
    reference: 'REF-MOMO-881920',
    paymentChannel: 'MTN MoMo (+233 24 *** 3456)',
  },
  {
    id: 'TXN-902',
    type: 'water_purchase',
    amountGHS: 30.00,
    description: 'Payment for 2x 15L Water Refill (Order #NS-94821)',
    date: '2026-07-22 07:30 AM',
    status: 'completed',
    reference: 'MOMO-PAY-991204',
    paymentChannel: 'MTN MoMo',
  },
  {
    id: 'TXN-903',
    type: 'top_up',
    amountGHS: 100.00,
    description: 'Nsupa Wallet Top-Up via Telecel Cash',
    date: '2026-07-12 11:20 AM',
    status: 'completed',
    reference: 'TOPUP-TEL-00381',
    paymentChannel: 'Telecel Cash',
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    title: '🚚 Order Out for Delivery',
    message: 'Rider Kwame Osei is en route with your 2x 15L factory-sealed refills. ETA 18 mins.',
    timestamp: '10 mins ago',
    read: false,
    type: 'delivery',
    actionScreen: 'tracking',
  },
  {
    id: 'NOTIF-2',
    title: '🤖 AI Smart Refill Reminder',
    message: 'Nsupa AI predicts your household will run out of water in 4 days. Schedule now to lock in morning slot.',
    timestamp: '2 hours ago',
    read: false,
    type: 'ai_alert',
    actionScreen: 'home',
  },
  {
    id: 'NOTIF-3',
    title: '♻️ Deposit Refund Credited',
    message: 'GHS 25.00 deposit refund credited to your wallet for returned bottle #NS-BTL-8822.',
    timestamp: '2 days ago',
    read: true,
    type: 'deposit',
    actionScreen: 'wallet',
  }
];
