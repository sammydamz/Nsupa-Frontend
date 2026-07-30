import re

def polish_typography(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Increase tiny explicitly sized fonts
    content = re.sub(r'text-\[9px\]', 'text-xs', content)
    content = re.sub(r'text-\[10px\]', 'text-xs', content)
    content = re.sub(r'text-\[11px\]', 'text-xs', content)
    
    # Increase general text sizes that are too small for their context
    # headers
    content = re.sub(r'h1 className="text-base(.*?)"', r'h1 className="text-lg\1"', content)
    # small headers
    content = re.sub(r'h2 className="text-xs(.*?)tracking-wider"', r'h2 className="text-sm\1tracking-wider"', content)
    content = re.sub(r'h3 className="text-xs(.*?)tracking-wider"', r'h3 className="text-sm\1tracking-wider"', content)
    content = re.sub(r'h4 className="text-\[11px\](.*?)tracking-wider"', r'h4 className="text-sm\1tracking-wider"', content)

    # Subtitles
    content = re.sub(r'p className="text-xs text-slate-500"', r'p className="text-sm text-slate-500"', content)

    # Specific structural text-xs that should be text-sm
    content = content.replace('className="space-y-4 text-xs"', 'className="space-y-4 text-sm"')
    
    # Replace some specific small texts
    content = content.replace('text-xs text-blue-100 font-medium uppercase', 'text-sm text-blue-100 font-medium uppercase')
    
    # specific transaction descriptions
    content = content.replace('span className="text-xs font-bold text-slate-900', 'span className="text-sm font-bold text-slate-900')
    content = content.replace('span className="text-xs font-black', 'span className="text-sm font-black')
    
    # buttons
    content = content.replace('text-xs flex items-center', 'text-sm flex items-center')
    content = content.replace('rounded-xl font-extrabold text-xs', 'rounded-xl font-extrabold text-sm')
    content = content.replace('text-xs font-medium cursor-pointer', 'text-sm font-medium cursor-pointer')

    with open(filepath, 'w') as f:
        f.write(content)

polish_typography('src/components/screens/WalletScreen.tsx')
polish_typography('src/components/screens/QRScannerScreen.tsx')
print('Polish applied.')
