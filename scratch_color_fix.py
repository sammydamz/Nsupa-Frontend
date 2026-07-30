import re

def polish_colors(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Header Card
    content = content.replace('border-sky-100', 'border-blue-50')
    content = content.replace('bg-sky-100 text-sky-700', 'bg-blue-50 text-primary')

    # Main Card Gradient
    content = content.replace('bg-gradient-to-br from-sky-600 to-sky-700', 'bg-gradient-to-br from-primary via-primary/90 to-primary/70')
    
    # Internal text and borders
    content = content.replace('text-sky-200', 'text-blue-100')
    content = content.replace('bg-sky-800/50 p-3 rounded-2xl border border-sky-400/30', 'bg-white/10 p-3 rounded-2xl border border-white/20')

    # Controls button
    content = content.replace('text-sky-800 hover:text-sky-800', 'text-primary hover:text-primary')
    content = content.replace('hover:bg-sky-50', 'hover:bg-blue-50')

    with open(filepath, 'w') as f:
        f.write(content)

polish_colors('src/components/screens/SubscriptionScreen.tsx')
print('Colors updated.')
