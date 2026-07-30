import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageSquare, Truck, ShieldCheck, CheckCircle2, Clock, Navigation, AlertCircle, X } from 'lucide-react';
import { Order } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeliveryTrackingScreenProps {
  order: Order;
}

export const DeliveryTrackingScreen: React.FC<DeliveryTrackingScreenProps> = ({ order }) => {
  const [etaMins, setEtaMins] = useState<number>(18);
  const [showCallModal, setShowCallModal] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'driver' | 'user'; text: string; time: string }>>([
    { sender: 'driver', text: "Hello! I am near Boundary Road with your 2x 15L factory-sealed refills. I'll arrive in ~18 minutes.", time: '10:02 AM' },
  ]);

  // Simulate ETA ticking down
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMins((prev) => (prev > 1 ? prev - 1 : 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'user' as const, text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory((prev) => [...prev, userMsg]);
    setChatMessage('');

    // Simulate driver reply
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'driver' as const, text: "Understood! I will call when I arrive at your gate.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  const steps = [
    { title: 'Order Confirmed', subtitle: 'Payment via MoMo Received', status: 'completed' },
    { title: 'Depot Quality Check', subtitle: 'Factory Sealed & Scanned at Achimota Hub', status: 'completed' },
    { title: 'Out for Delivery', subtitle: `Rider ${order.driverName || 'Kwame Osei'} on the way`, status: 'active' },
    { title: 'Delivered & Empty Swap', subtitle: 'Inspect tamper ring & receive deposit refund', status: 'pending' },
  ];

  return (
    <div className="space-y-5 pb-24">
      {/* Title */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">Live Delivery Tracking</h1>
              <p className="text-xs text-slate-500">Order #{order.orderNumber} • East Legon, Accra</p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-xs font-bold rounded-full animate-pulse border-none">
            Rider En Route
          </Badge>
        </CardContent>
      </Card>

      {/* Simulated Live GPS Map Container */}
      <div className="relative bg-blue-50 rounded-3xl h-64 overflow-hidden shadow-md border-2 border-sky-100">
        {/* SVG Simulated Map Visual */}
        <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
          {/* Map background roads */}
          <rect width="400" height="240" className="fill-blue-50" />
          
          {/* Roads */}
          <path d="M 0 120 L 400 120" className="stroke-white" strokeWidth="16" />
          <path d="M 180 0 L 180 240" className="stroke-white" strokeWidth="12" />
          <path d="M 60 40 Q 200 180, 340 60" className="stroke-blue-100" strokeWidth="24" fill="none" />
          
          {/* Active Route Path */}
          <path d="M 80 180 Q 180 120, 280 80" className="stroke-sky-400 animate-pulse" strokeWidth="5" strokeDasharray="8,4" fill="none" />

          {/* Depot Location Pin */}
          <circle cx="80" cy="180" r="10" className="fill-sky-600" />
          <text x="80" y="205" textAnchor="middle" className="fill-slate-600" fontSize="10" fontWeight="bold">Achimota Depot</text>

          {/* Customer House Location Pin */}
          <circle cx="280" cy="80" r="12" className="fill-emerald-500" />
          <circle cx="280" cy="80" r="18" className="fill-emerald-500 animate-ping opacity-30" />
          <text x="280" y="60" textAnchor="middle" className="fill-emerald-600" fontSize="10" fontWeight="bold">East Legon House</text>

          {/* Moving Driver Icon */}
          <g transform="translate(180, 120)">
            <circle cx="0" cy="0" r="14" className="fill-sky-400 border-2 border-white" />
            <circle cx="0" cy="0" r="20" className="fill-sky-400 animate-ping opacity-30" />
            <text x="0" y="4" textAnchor="middle" className="fill-white" fontSize="11" fontWeight="bold">R</text>
          </g>
        </svg>

        {/* Floating ETA Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-sky-100 px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-600 animate-spin-slow" />
          <div>
            <span className="text-[10px] text-slate-500 block">Estimated Arrival</span>
            <span className="text-sm font-black text-slate-900">{etaMins} Mins</span>
          </div>
        </div>

        {/* Map Legend Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-[10px] text-slate-600 font-semibold border border-slate-200 shadow-sm">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-sky-500" /> Accra Delivery Network</span>
        </div>
      </div>

      {/* Driver Info Card */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={order.driverPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt="Rider"
                className="w-12 h-12 rounded-2xl object-cover border-2 border-sky-300 shadow-sm"
              />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{order.driverName || 'Kwame Osei'}</h3>
                <p className="text-xs text-slate-500">Certified Nsupa Delivery Rider #12</p>
                <span className="text-[10px] text-emerald-600 font-bold">⭐ 4.98 Rating (480 deliveries)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowCallModal(true)}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-none rounded-2xl transition-colors shadow-sm"
                title="Call Rider"
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Live Chat Drawer Box */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-sky-600" />
                Rider In-App Chat
              </span>
              <Badge variant="outline" className="text-[10px] text-emerald-600 bg-emerald-50 rounded-full border-emerald-200">Online</Badge>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-2 pr-1 text-xs">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-2.5 rounded-2xl max-w-[85%] text-xs ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white font-medium rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
              <Input
                type="text"
                placeholder="Type message to rider..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-white border-slate-200 rounded-xl text-xs h-9"
              />
              <Button
                type="submit"
                className="bg-sky-600 text-white font-bold rounded-xl text-xs hover:bg-sky-700 h-9"
              >
                Send
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Timeline Steps */}
      <Card className="rounded-2xl border-sky-100 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Delivery Timeline</h3>

          <div className="space-y-4 relative pl-4 border-l-2 border-sky-100 ml-2">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 ${
                  step.status === 'completed'
                    ? 'bg-emerald-500 border-emerald-200'
                    : step.status === 'active'
                    ? 'bg-sky-500 border-sky-200 ring-4 ring-sky-100'
                    : 'bg-slate-200 border-slate-300'
                }`} />

                <div className="space-y-0.5">
                  <span className={`text-xs font-bold block ${
                    step.status === 'active' ? 'text-sky-700' : 'text-slate-800'
                  }`}>
                    {step.title}
                  </span>
                  <p className="text-[11px] text-slate-500">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Modal */}
      <Dialog open={showCallModal} onOpenChange={setShowCallModal}>
        <DialogContent className="bg-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl border-sky-100 sm:rounded-[2rem]">
          <DialogHeader className="hidden">
            <DialogTitle>Call Rider</DialogTitle>
          </DialogHeader>
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce mt-4">
            <Phone className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base">Calling {order.driverName || 'Kwame Osei'}</h3>
            <p className="text-xs text-slate-500 mt-1">{order.driverPhone || '+233 20 882 1109'}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-600">
            In-app encrypted call route via Nsupa Ghana Dispatch
          </div>

          <Button
            variant="destructive"
            onClick={() => setShowCallModal(false)}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1"
          >
            <X className="w-4 h-4" />
            <span>End Call</span>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
