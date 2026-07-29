export type UserRole = 'customer' | 'driver' | 'depot' | 'admin';

export type CustomerScreenId = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'otp'
  | 'home'
  | 'order'
  | 'subscription'
  | 'deposits'
  | 'tracking'
  | 'qr_scanner'
  | 'bottle_details'
  | 'wallet'
  | 'notifications'
  | 'impact'
  | 'profile'
  | 'settings';

export type ScreenId = CustomerScreenId | 'driver_dashboard' | 'depot_dashboard' | 'admin_dashboard';

export type BottleLinerState = 'freshly_filled' | 'partially_used' | 'empty_ready_return';

export interface Bottle {
  id: string;
  qrCode: string;
  sizeLitres: number; // e.g. 15L
  type: '15L Reusable Dispenser Bottle' | '5L Eco Pouch' | '19L Dispenser Jar';
  status: 'with_customer' | 'in_transit' | 'at_depot_cleaning' | 'at_depot_refilling' | 'ready_for_dispatch';
  linerState: BottleLinerState;
  tamperEvidentRingIntact: boolean;
  depositAmountGHS: number;
  assignedCustomer?: string;
  assignedDriver?: string;
  refillCount: number;
  lastRefilledAt: string;
  depotLocation: string;
  batchNumber: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  region: string; // e.g. "East Legon, Accra"
  items: {
    bottleType: string;
    quantity: number;
    unitPriceGHS: number; // Water content price (e.g. GH₵15)
    surchargePerBottleGHS: number; // GH₵10 if no empty shell, GH₵0 if swapping
    hasEmptyToSwap: boolean;
  }[];
  totalPriceGHS: number;
  surchargeTotalGHS: number;
  paymentMethod: 'mtn_momo' | 'telecel_cash' | 'at_money' | 'card' | 'wallet';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  deliveryStatus: 'order_placed' | 'assigned_to_driver' | 'out_for_delivery' | 'delivered' | 'cancelled';
  scheduledDate: string;
  scheduledTimeSlot: string;
  driverName?: string;
  driverPhone?: string;
  driverPhoto?: string;
  driverLat?: number;
  driverLng?: number;
  emptyBottlesToCollect: number;
  emptyBottlesSwapped?: number;
  createdAt: string;
}

export interface Subscription {
  id: string;
  planName: string;
  frequency: 'weekly' | 'bi_weekly' | 'monthly' | 'custom';
  bottleQuantity: number;
  bottleType: string;
  nextDeliveryDate: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: 'active' | 'paused' | 'cancelled';
  discountPercent: number;
  autoRefillAiEnabled: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'water_purchase' | 'top_up' | 'shell_surcharge' | 'shell_exchange';
  amountGHS: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  paymentChannel: string;
}

export interface EnvironmentalStats {
  sachetsSaved: number;
  plasticWasteKgSaved: number;
  co2PreventedKg: number;
  reusableCyclesCompleted: number;
  litresDelivered: number;
  treesEquivalent: number;
}

export interface AIPredictionResult {
  daysRemaining: number;
  predictedRunOutDate: string;
  recommendedRefillDate: string;
  suggestedPlan: string;
  sachetsSavedPerMonth: number;
  co2SavedKg: number;
  insights: string[];
  smartTip: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'delivery' | 'deposit' | 'promo' | 'ai_alert';
  actionScreen?: CustomerScreenId;
}
