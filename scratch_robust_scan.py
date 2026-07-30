import os

filepath = 'src/components/screens/RiderDashboardScreen.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add scanError state
state_block = """  const [scannedEmptyQR, setScannedEmptyQR] = useState<string | null>(null);
  const [scannedFullQR, setScannedFullQR] = useState<string | null>(null);"""
state_block_new = """  const [scannedEmptyQR, setScannedEmptyQR] = useState<string | null>(null);
  const [scannedFullQR, setScannedFullQR] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);"""
content = content.replace(state_block, state_block_new)

# Add Handlers
handlers_old = """  const handleStartScan = () => {
    setScanStep('scan_empty_out');
    setScannedEmptyQR(null);
    setScannedFullQR(null);
    setScannerOpen(true);
  };"""
handlers_new = """  const handleStartScan = () => {
    setScanStep('scan_empty_out');
    setScannedEmptyQR(null);
    setScannedFullQR(null);
    setScanError(null);
    setScannerOpen(true);
  };

  const handleEmptyScan = (text: string) => {
    const b = bottles.find((b) => b.id === text || b.qrCode === text || (b.qrCode && b.qrCode.endsWith(text)));
    if (b) {
      if (b.linerState !== 'empty_ready_return') {
        setScanError(`Invalid Scan: Container is marked as '${b.linerState}', not empty.`);
      } else {
        setScanError(null);
        setScannedEmptyQR(b.qrCode);
        setTimeout(handleNextStep, 800);
      }
    } else {
      setScanError(`Unrecognized QR Code`);
    }
  };

  const handleFullScan = (text: string) => {
    const b = bottles.find((b) => b.id === text || b.qrCode === text || (b.qrCode && b.qrCode.endsWith(text)));
    if (b) {
      if (b.linerState !== 'freshly_filled') {
        setScanError(`Invalid Scan: Container is marked as '${b.linerState}', not fresh.`);
      } else {
        setScanError(null);
        setScannedFullQR(b.qrCode);
        setTimeout(handleNextStep, 800);
      }
    } else {
      setScanError(`Unrecognized QR Code`);
    }
  };"""
content = content.replace(handlers_old, handlers_new)

# Reset error on close/next
content = content.replace("setScannerOpen(false);\n    setScanStep('scan_empty_out');", "setScannerOpen(false);\n    setScanStep('scan_empty_out');\n    setScanError(null);")

content = content.replace("if (scanStep === 'scan_empty_out') {\n      setScanStep('scan_full_in');", "setScanError(null);\n    if (scanStep === 'scan_empty_out') {\n      setScanStep('scan_full_in');")

# Replace inline handlers in UI for Empty Scan
empty_ui_old = """<CameraView elementId="reader-empty" onScan={(text) => { setScannedEmptyQR(text); setTimeout(handleNextStep, 800); }} />"""
empty_ui_new = """<CameraView elementId="reader-empty" onScan={handleEmptyScan} />
                    {scanError && (
                      <div className="absolute inset-x-2 bottom-2 bg-red-500 text-white text-xs font-bold p-2 rounded-xl text-center">
                        {scanError}
                        <button onClick={() => setScanError(null)} className="block w-full mt-1 underline">Retry</button>
                      </div>
                    )}"""
content = content.replace(empty_ui_old, empty_ui_new)

# Replace inline handlers in UI for Full Scan
full_ui_old = """<CameraView elementId="reader-full" onScan={(text) => { setScannedFullQR(text); setTimeout(handleNextStep, 800); }} />"""
full_ui_new = """<CameraView elementId="reader-full" onScan={handleFullScan} />
                    {scanError && (
                      <div className="absolute inset-x-2 bottom-2 bg-red-500 text-white text-xs font-bold p-2 rounded-xl text-center">
                        {scanError}
                        <button onClick={() => setScanError(null)} className="block w-full mt-1 underline">Retry</button>
                      </div>
                    )}"""
content = content.replace(full_ui_old, full_ui_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied robust scanner logic!")
