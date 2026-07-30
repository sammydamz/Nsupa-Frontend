import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw, CheckCircle2, CreditCard, PhoneCall, ShieldCheck } from 'lucide-react';
import { WalletTransaction } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(50);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawAccount, setWithdrawAccount] = useState<string>('');
  const [selectedChannel, setSelectedChannel] = useState<string>('Paystack');
  const [withdrawDestination, setWithdrawDestination] = useState<string>('Mobile Wallet (via Paystack)');

  const handleConfirmTopUp = () => {
    onTopUp(topUpAmount, selectedChannel);
    setShowTopUpModal(false);
  };

  const handleConfirmWithdraw = () => {
    setShowWithdrawModal(false);
    setShowWithdrawSuccess(true);
    setWithdrawAmount('');
    setWithdrawAccount('');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Title */}
      <Card className="rounded-3xl border-blue-50 shadow-sm">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-primary rounded-2xl">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Nsupa Ghana Wallet</h1>
              <p className="text-sm text-slate-500">Secure Payments & Instant Deposit Refunds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Wallet Balance & Channels */}
        <div className="lg:col-span-2 space-y-5">
          {/* Main Balance Cards */}
          <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl text-white shadow-md border-none">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-blue-100 font-medium uppercase tracking-wider">Available Wallet Balance</span>
                  <div className="text-3xl sm:text-4xl font-black mt-1">GHS {walletBalanceGHS.toFixed(2)}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowWithdrawModal(true)}
                    className="bg-primary/20 text-blue-100 hover:text-white border-blue-400/30 hover:border-blue-400 font-bold rounded-2xl text-sm flex items-center gap-2 shadow-sm hover:bg-primary/40 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Withdraw</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowTopUpModal(true)}
                    className="bg-white text-primary hover:text-primary font-bold rounded-2xl text-sm flex items-center gap-2 shadow-sm hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Top-Up</span>
                  </Button>
                </div>
              </div>


            </CardContent>
          </Card>

        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-bold uppercase text-slate-800 tracking-wider">Transaction History</h2>

          <div className="space-y-2.5">
            {transactions.map((tx) => (
              <Card key={tx.id} className="rounded-2xl border-blue-50 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      tx.type === 'deposit_refund' || tx.type === 'top_up'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-50 text-primary'
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
                      <span className="text-sm font-bold text-slate-900 block">{tx.description}</span>
                      <span className="text-xs text-slate-400 block">{tx.date} • {tx.paymentChannel}</span>
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
                    <span className="text-xs text-slate-400 block font-mono">{tx.reference}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Top-Up Modal */}
      <Dialog open={showTopUpModal} onOpenChange={setShowTopUpModal}>
        <DialogContent className="rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl border-sky-100">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-slate-900 text-left">Top-Up Nsupa Wallet</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">Select Amount (GHS)</label>
              <div className="grid grid-cols-3 gap-2">
                {[20, 50, 100].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={topUpAmount === amt ? "default" : "outline"}
                    onClick={() => setTopUpAmount(amt)}
                    className={`h-10 rounded-xl font-extrabold text-sm transition-all ${
                      topUpAmount === amt ? 'bg-primary hover:bg-primary/90 text-white border-primary' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    GHS {amt}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">Payment Method</label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="w-full h-10 rounded-xl bg-slate-50 border-slate-200 font-medium text-slate-800 focus:ring-primary focus:ring-offset-0">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                  <SelectItem value="Paystack" className="text-sm font-medium cursor-pointer">Paystack</SelectItem>
                  <SelectItem value="Moolre" className="text-sm font-medium cursor-pointer">Moolre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-2 sm:justify-start">
            <Button
              variant="secondary"
              onClick={() => setShowTopUpModal(false)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs h-10"
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmTopUp}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs shadow-md h-10"
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl border-sky-100">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-slate-900 text-left">Withdraw Funds</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">Amount (GHS)</label>
              <input 
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {withdrawAmount && parseFloat(withdrawAmount) < 20 && (
                <p className="text-xs text-red-500 mt-1.5 font-bold">Minimum withdrawal is GHS 20.</p>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">Payout Destination</label>
              <Select value={withdrawDestination} onValueChange={setWithdrawDestination}>
                <SelectTrigger className="w-full h-10 rounded-xl bg-slate-50 border-slate-200 font-medium text-slate-800 focus:ring-primary focus:ring-offset-0">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                  <SelectItem value="Mobile Wallet (via Paystack)" className="text-sm font-medium cursor-pointer">Mobile Wallet (via Paystack)</SelectItem>
                  <SelectItem value="Mobile Wallet (via Moolre)" className="text-sm font-medium cursor-pointer">Mobile Wallet (via Moolre)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">Account / Phone Number</label>
              <input 
                type="text"
                placeholder="Enter account details"
                value={withdrawAccount}
                onChange={(e) => setWithdrawAccount(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-2 sm:justify-start">
            <Button
              variant="secondary"
              onClick={() => setShowWithdrawModal(false)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs h-10"
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) < 20 || !withdrawAccount}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs shadow-md h-10 disabled:opacity-50"
            >
              Request Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Success Modal */}
      <Dialog open={showWithdrawSuccess} onOpenChange={setShowWithdrawSuccess}>
        <DialogContent className="rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl border-emerald-100 text-center">
          <div className="flex justify-center">
            <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <DialogTitle className="text-xl font-extrabold text-slate-900">Withdrawal Submitted!</DialogTitle>
            <p className="text-sm text-slate-500 font-medium">
              Your withdrawal request is currently under review. Processing will take up to 24 hours.
            </p>
          </div>

          <DialogFooter className="sm:justify-center pt-2">
            <Button
              onClick={() => setShowWithdrawSuccess(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md h-11"
            >
              Okay, Got It
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
