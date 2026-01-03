# GUI Port Selection Guide

## Overview

The Pangea-Poker GUI now supports **custom port selection**, allowing you to connect to different player backends from separate browser tabs.

## Use Cases

### Multiple Players on Same Machine
- **Player 1:** Backend on port 9001
- **Player 2:** Backend on port 9002
- Connect from different browser tabs to play against yourself for testing

### Remote Players
- **Local Player:** localhost:9001
- **Remote Player:** 159.69.23.31:9002
- Connect to different machines

## How to Use

### 1. Start Multiple Player Backends

**Terminal 1: Player 1**
```bash
cd /root/bet/poker
./bin/bet player config/verus_player_p1.ini --gui
# WebSocket server starts on port 9001
```

**Terminal 2: Player 2**
```bash
cd /root/bet/poker
./bin/bet player config/verus_player_p2.ini --gui
# WebSocket server starts on port 9002
```

### 2. Open GUI in Browser

```bash
cd /root/pangea-poker
npm start
# Opens at http://localhost:1234
```

### 3. Connect to Player 1

**Browser Tab 1:**
1. Click "Player" tab
2. Enter IP: `159.69.23.31` (or `localhost`)
3. Enter Port: `9001`
4. Click "Set Nodes"
5. GUI connects to Player 1 backend

### 4. Connect to Player 2

**Browser Tab 2 (new tab):**
1. Open http://localhost:1234 in new tab
2. Click "Player" tab
3. Enter IP: `159.69.23.31` (or `localhost`)
4. Enter Port: `9002`
5. Click "Set Nodes"
6. GUI connects to Player 2 backend

### 5. Play the Game

- Each tab controls a different player
- Tab 1: Player 1's view and actions
- Tab 2: Player 2's view and actions
- Test the game by playing against yourself!

## Default Ports

| Node Type | Default IP      | Default Port |
|-----------|----------------|--------------|
| Dealer    | 159.69.23.31   | 9000         |
| Player 1  | 159.69.23.31   | 9001         |
| Player 2  | 159.69.23.31   | 9002         |

## Configuration

### Backend Port Configuration

Each player's port is defined in their config file:

**config/verus_player_p1.ini:**
```ini
[verus]
dealer_id  = d1
table_id   = t1
wallet_addr = *
player_id  = p1
ws_port    = 9001    # Player 1 WebSocket port
```

**config/verus_player_p2.ini:**
```ini
[verus]
dealer_id  = d1
table_id   = t1
wallet_addr = *
player_id  = p2
ws_port    = 9002    # Player 2 WebSocket port
```

### GUI Port Input

The GUI now has two input fields per node:
- **IP Address:** The server's IP (e.g., `159.69.23.31`, `localhost`)
- **Port:** The WebSocket port (e.g., `9001`, `9002`)

## Example: Full 2-Player Local Game

### Step 1: Start Dealer and Cashier
```bash
# Terminal 1: Dealer
cd /root/bet/poker
./bin/bet dealer config/verus_dealer.ini --reset

# Terminal 2: Cashier
./bin/bet cashier config/verus_cashier.ini
```

### Step 2: Start Players
```bash
# Terminal 3: Player 1
./bin/bet player config/verus_player_p1.ini --gui

# Terminal 4: Player 2
./bin/bet player config/verus_player_p2.ini --gui
```

### Step 3: Start GUI
```bash
# Terminal 5: GUI
cd /root/pangea-poker
npm start
```

### Step 4: Connect Both Players

**Browser Tab 1 (Player 1):**
- IP: `localhost` or `127.0.0.1`
- Port: `9001`
- Click "Set Nodes"
- Click "Join Table" when prompted

**Browser Tab 2 (Player 2):**
- IP: `localhost` or `127.0.0.1`
- Port: `9002`
- Click "Set Nodes"
- Click "Join Table" when prompted

### Step 5: Play!
- Both players are now connected
- Game proceeds automatically
- Watch cards, betting, and results in each tab

## Troubleshooting

### "Connection Failed"
**Problem:** Can't connect to backend
**Solutions:**
- Check backend is running: `ps aux | grep "bin/bet"`
- Verify port: `netstat -tlnp | grep 9001`
- Check firewall settings
- Try `localhost` instead of IP address

### "Port Already in Use"
**Problem:** Backend fails to start
**Solutions:**
- Check if port is already used: `lsof -i :9001`
- Kill existing process: `pkill -f "bin/bet"`
- Change port in config file

### "Wrong Player Connected"
**Problem:** Tab shows different player's info
**Solutions:**
- Check port number entered in GUI
- Player 1 = port 9001
- Player 2 = port 9002
- Refresh page and re-enter correct port

## Advanced: Custom Ports

### Change Player Port

**1. Edit Config:**
```ini
# config/verus_player_custom.ini
ws_port = 9010    # Custom port
```

**2. Start Backend:**
```bash
./bin/bet player config/verus_player_custom.ini --gui
```

**3. Connect GUI:**
- IP: `localhost`
- Port: `9010`

### Multiple Tables

You can run multiple games simultaneously:

**Game 1:**
- Dealer: port 9000
- Player 1: port 9001
- Player 2: port 9002

**Game 2:**
- Dealer: port 9100
- Player 3: port 9101
- Player 4: port 9102

Each game has its own dealer and players on different ports.

## Benefits

✅ **Multiple players on one machine:** Test full games locally
✅ **Flexible configuration:** Choose any available port
✅ **Easy testing:** Open multiple tabs, one per player
✅ **Remote connections:** Connect to players on different machines
✅ **Clear separation:** Each tab is independent

## Summary

The port selection feature makes it easy to:
1. Connect to different player backends
2. Test multi-player games from one browser
3. Join remote games on different machines
4. Quickly switch between different player instances

Just enter the IP and port, click "Set Nodes", and you're connected!

