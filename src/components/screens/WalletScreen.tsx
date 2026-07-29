import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw, CheckCircle2, CreditCard, PhoneCall, ShieldCheck } from 'lucide-react';
import { WalletTransaction } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WalletScreenProps {
  walletBalanceGHS: number;
  depositBalanceGHS: number;
  transactions: WalletTransaction[];
  onTopUp: (amount: number, channel: string) => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  walletBalanceGHS,
  depositBalanceGHS,
  transactions,
  onTopUp,
}) => {
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(50);
  const [selectedChannel, setSelectedChannel] = useState<string>('MTN Mobile Money (*170#)');

  const handleConfirmTopUp = () => {
    onTopUp(topUpAmount, selectedChannel);
    setShowTopUpModal(false);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Title */}
      <Card className="rounded-3xl border-sky-100 shadow-sm">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Nsupa Ghana Wallet</h1>
              <p className="text-xs text-slate-500">MoMo Payments & Instant Deposit Refunds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Wallet Balance & Channels */}
        <div className="lg:col-span-2 space-y-5">
          {/* Main Balance Cards */}
          <Card className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 rounded-3xl text-white shadow-md border-none">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-sky-100 font-medium uppercase tracking-wider">Available Wallet Balance</span>
                  <div className="text-3xl sm:text-4xl font-black mt-1">GHS {walletBalanceGHS.toFixed(2)}</div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => setShowTopUpModal(true)}
                  className="bg-white text-sky-800 hover:text-sky-800 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-sm hover:bg-sky-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Top-Up Balance</span>
                </Button>
              </div>

              <div className="bg-sky-800/50 backdrop-blur-sm p-4 rounded-2xl border border-sky-400/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-sky-200 block">1:1 Shell Swap Policy</span>
                  <span className="font-extrabold text-white text-sm">GH₵ 15.00 Content Only</span>
                </div>

                <Badge variant="outline" className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-400/30">
                  Zero Deposit Held
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payment Channels Supported */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">Supported Payment Methods</label>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <Card className="rounded-2xl border-amber-200 bg-amber-50 shadow-none">
                <CardContent className="p-3.5 text-amber-900">
                  <span className="font-extrabold block text-sm">MTN MoMo</span>
                  <span className="text-[10px] text-amber-700 block font-medium">*170# Supported</span>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-red-200 bg-red-50 shadow-none">
                <CardContent className="p-3.5 text-red-900">
                  <span className="font-extrabold block text-sm">Telecel Cash</span>
                  <span className="text-[10px] text-red-700 block font-medium">*110# Supported</span>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-blue-200 bg-blue-50 shadow-none">
                <CardContent className="p-3.5 text-blue-900">
                  <span className="font-extrabold block text-sm">AT Money</span>
                  <span className="text-[10px] text-blue-700 block font-medium">Instant Top-Up</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Transaction History</h2>

          <div className="space-y-2.5">
            {transactions.map((tx) => (
              <Card key={tx.id} className="rounded-2xl border-sky-100 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      tx.type === 'deposit_refund' || tx.type === 'top_up'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-sky-100 text-sky-700'
                    }`}>
                      {tx.type === 'deposit_refund' ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : tx.type === 'top_up' ? (
                        <Plus className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{tx.description}</span>
                      <span className="text-[10px] text-slate-400 block">{tx.date} • {tx.paymentChannel}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-xs font-black block ${
                      tx.type === 'deposit_refund' || tx.type === 'top_up'
                        ? 'text-emerald-600'
                        : 'text-slate-900'
                    }`}>
                      {tx.type === 'deposit_refund' || tx.type === 'top_up' ? '+' : '-'} GHS {tx.amountGHS.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">{tx.reference}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl border-sky-100">
            <h3 className="text-base font-extrabold text-slate-900">Top-Up Nsupa Wallet</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Amount (GHS)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[20, 50, 100].map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant={topUpAmount === amt ? "default" : "outline"}
                      onClick={() => setTopUpAmount(amt)}
                      className={`h-10 rounded-xl font-extrabold text-xs transition-all ${
                        topUpAmount === amt ? 'bg-sky-600 hover:bg-sky-700 text-white border-sky-600' : 'bg-slate-50 text-slate-800'
                      }`}
                    >
                      GHS {amt}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                >
                  <option value="MTN Mobile Money (*170#)">MTN Mobile Money (*170#)</option>
                  <option value="Telecel Cash (*110#)">Telecel Cash (*110#)</option>
                  <option value="AT Money">AT Money</option>
                  <option value="Visa / Mastercard">Visa / Mastercard</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="secondary"
                onClick={() => setShowTopUpModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs h-10"
              >
                Cancel
              </Button>

              <Button
                onClick={handleConfirmTopUp}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md h-10"
              >
                Send MoMo Prompt
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
