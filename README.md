# sokotrack
County Market-Stall Booking &amp; Allocation System


## Step 1: Market & Stalls 🚀

### Markets
✅POST /markets → Create a new market
body: { name, location, county }
✅GET /markets → List all markets
✅GET /markets/:id → Get single market + stalls
✅PUT /markets/:id → Update market info
⏳DELETE /markets/:id → Delete market

### Stalls
✅POST /markets/:marketId/stalls → Add stall(s) to a market
body: { stallNumber, type, monthlyRent }
✅GET /markets/:marketId/stalls → List stalls in a market (with status)
✅GET /stalls/:id → Get stall details (bookings, maintenance, etc.)
⏳PUT /stalls/:id → Update stall (rent, type, status)
⏳DELETE /stalls/:id → Delete stall



## Implementation order
✅Market creation → POST /markets 
✅View markets → GET /markets
✅Add stalls → POST /markets/:marketId/stalls
✅View stalls by market → GET /markets/:marketId/stalls
✅View all stalls → GET /markets/:marketId/stalls => (OPTIONAL)
⌛Update stall status → PUT /stalls/:id



✅ Once this is done, you’ll have the backbone for:

⌛Assigning traders (bookings)
⌛Tracking availability
⌛Payment flows later


