import re

with open("src/components/screens/DriverDashboardScreen.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add import
content = content.replace(
    "import { Order } from '../../types';",
    "import { Html5Qrcode } from 'html5-qrcode';\nimport { Order } from '../../types';"
)

# Add CameraView component before DriverDashboardScreen
camera_component = """
const CameraView: React.FC<{ elementId: string; onScan: (text: string) => void }> = ({ elementId, onScan }) => {
  useEffect(() => {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = '';
    const scanner = new Html5Qrcode(elementId);
    let started = false;
    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (text) => {
        started = false;
        onScan(text);
        scanner.stop().then(() => scanner.clear()).catch(() => {});
      },
      () => {}
    ).then(() => {
      started = true;
    }).catch(() => {});

    return () => {
      if (started) {
        scanner.stop().then(() => scanner.clear()).catch(() => {});
      }
    };
  }, [elementId, onScan]);
  return null;
};

export const DriverDashboardScreen
"""
content = content.replace("export const DriverDashboardScreen", camera_component.strip())

# Add new state for the scanned codes
state_add = """
  const [scannedEmptyQR, setScannedEmptyQR] = useState<string | null>(null);
  const [scannedFullQR, setScannedFullQR] = useState<string | null>(null);
"""
content = content.replace("  const [scanCompleted, setScanCompleted] = useState<boolean>(false);", "  const [scanCompleted, setScanCompleted] = useState<boolean>(false);\n" + state_add)

# Reset state when opening scanner
content = content.replace(
    "setScannerOpen(true);",
    "setScannedEmptyQR(null);\n    setScannedFullQR(null);\n    setScannerOpen(true);"
)

# Replace the scan_empty_out section
scan_empty_old = """
                <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                  <QrCode className="w-16 h-16 text-white/60 mx-auto animate-pulse" />
                  <p className="text-sm font-mono text-white/80">SCANNED: {scannedEmpty?.qrCode || 'Nsupa-15L-BTL-8822'}</p>
                  <span className="text-sm text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Container Return Logged for Depot Refill</span>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Scan Delivered Container</span>
                  <RefreshCw className="w-4 h-4" />
                </Button>
"""
scan_empty_new = """
                {!scannedEmptyQR ? (
                  <div className="rounded-2xl overflow-hidden border-2 border-primary/20 bg-black max-w-[250px] mx-auto w-full aspect-square relative">
                    <div id="reader-empty" className="w-full h-full object-cover"></div>
                    <CameraView elementId="reader-empty" onScan={(text) => { setScannedEmptyQR(text); setTimeout(handleNextStep, 800); }} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                      <QrCode className="w-12 h-12 text-white/60 mx-auto" />
                      <p className="text-sm font-mono text-white/80">SCANNED: {scannedEmptyQR}</p>
                      <span className="text-sm text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Return Logged!</span>
                    </div>
                    <Button onClick={handleNextStep} className="w-full h-11 bg-primary text-white font-bold rounded-xl shadow-sm">Proceed to Next Scan</Button>
                  </div>
                )}
"""
content = content.replace(scan_empty_old.strip(), scan_empty_new.strip())

# Replace the scan_full_in section
scan_full_old = """
                <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                  <QrCode className="w-16 h-16 text-white/60 mx-auto animate-pulse" />
                  <p className="text-sm font-mono text-white/80">SCANNED: {scannedFresh?.qrCode || 'Nsupa-15L-BTL-9003'}</p>
                  <span className="text-sm text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Delivery Handoff Logged</span>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Verify Delivery Handoff</span>
                  <Check className="w-4 h-4" />
                </Button>
"""
scan_full_new = """
                {!scannedFullQR ? (
                  <div className="rounded-2xl overflow-hidden border-2 border-primary/20 bg-black max-w-[250px] mx-auto w-full aspect-square relative">
                    <div id="reader-full" className="w-full h-full object-cover"></div>
                    <CameraView elementId="reader-full" onScan={(text) => { setScannedFullQR(text); setTimeout(handleNextStep, 800); }} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-primary rounded-2xl text-center text-white space-y-2">
                      <QrCode className="w-12 h-12 text-white/60 mx-auto" />
                      <p className="text-sm font-mono text-white/80">SCANNED: {scannedFullQR}</p>
                      <span className="text-sm text-emerald-400 font-bold flex items-center gap-1 justify-center"><CheckCircle2 className="w-3 h-3" /> Delivery Logged!</span>
                    </div>
                    <Button onClick={handleNextStep} className="w-full h-11 bg-primary text-white font-bold rounded-xl shadow-sm">Verify Delivery Handoff</Button>
                  </div>
                )}
"""
content = content.replace(scan_full_old.strip(), scan_full_new.strip())

with open("src/components/screens/DriverDashboardScreen.tsx", "w", encoding="utf-8") as f:
    f.write(content)
