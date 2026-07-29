# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary users include households, offices, and schools ordering water; roadside vendors and hawkers selling it; delivery drivers scanning inventory in transit; and depot managers tracking circulation and triggering deposit payouts.

## Product Purpose
To provide a returnable, reusable alternative to single-use plastic water sachets in Ghana, offering safely managed water at price and volume parity while eliminating the massive plastic waste that clogs urban drains and contributes to flooding.

## Positioning
A 1:1 container swap system that borrows bag-in-box physics (a collapsible inner liner that deflates visibly as water is drawn, plus a breakaway tamper ring) to guarantee safety without requiring batteries or sensors, riding entirely on Ghana's existing three-tier distribution and roadside hawker networks with near-zero behavior change.

## Operating Context
Operates in the informal Ghanaian water distribution network. Hawkers sell from roadside coolers, drivers scan offline-capable apps during routes, and depots monitor dashboards for overdue units and mobile money (MoMo) deposit payouts.

## Capabilities and Constraints
Confirmed functionality includes a driver app with offline sync, a depot dashboard for asset tracking (via passive QR stickers), and an ordering interface supporting individual, office, and school tiers (one-time or subscription). It uses a software layer to generate automatic metrics on liters distributed, shells in circulation, and kg of plastic displaced. Constraints: no digital functionality on the physical bottle or the hawker's side.

## Brand Commitments
The brand identity uses a blue and white color scheme ("Nsupa" logo), conveying fresh, sterile, and eco-friendly circular water.

## Evidence on Hand
Implementation context exists in `context.md` detailing the physical materials, economics, and logistics. The application is built as a responsive web platform using React and shadcn/ui.

## Product Principles
1. Re-use existing logistics (NASPAWAP tiers and roadside hawkers) instead of inventing new distribution channels.
2. Near-zero behavior change for buyers and hawkers; the mechanics stay hidden in the packaging.
3. Passive honesty: physical mechanics (collapsing liner, snap ring) prove water safety visually, skipping expensive tech.
4. Keep the software out of the transaction: digital tracking belongs only to depots and drivers.
