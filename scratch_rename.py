import os

def rename_in_files():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.ts') or file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content.replace('driver', 'rider')
                new_content = new_content.replace('Driver', 'Rider')
                new_content = new_content.replace('DRIVER', 'RIDER')
                
                if content != new_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

    # Rename file
    old_file = os.path.join('src', 'components', 'screens', 'DriverDashboardScreen.tsx')
    new_file = os.path.join('src', 'components', 'screens', 'RiderDashboardScreen.tsx')
    if os.path.exists(old_file):
        os.rename(old_file, new_file)
        print("Renamed file")

if __name__ == '__main__':
    rename_in_files()
