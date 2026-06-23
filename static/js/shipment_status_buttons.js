// Shared between scan_home.html and shipments.html.
// Requires a global `userRole` string to already be defined on the page.

// Per-destination status codes/labels for the leg after the parcel leaves Bangladesh
const DESTINATION_CONFIG = {
    'BD_TO_HK': { inTransit: 'IN_TRANSIT_TO_HK', inTransitLabel: 'In Flight to HK', arrived: 'ARRIVED_AT_HK', arrivedLabel: 'Flight Landed in HK', warehouse: 'RECEIVED_AT_HK_WAREHOUSE', warehouseLabel: 'Received in HK Warehouse', outForDelivery: 'OUT_FOR_DELIVERY_HK', outForDeliveryLabel: 'On the Way to Delivery' },
    'BD_TO_UK': { inTransit: 'IN_TRANSIT_TO_UK', inTransitLabel: 'In Flight to UK', arrived: 'ARRIVED_AT_UK', arrivedLabel: 'Flight Landed in UK', warehouse: 'RECEIVED_AT_UK_WAREHOUSE', warehouseLabel: 'Received in UK Warehouse', outForDelivery: 'OUT_FOR_DELIVERY_UK', outForDeliveryLabel: 'On the Way to Delivery' },
    'BD_TO_CN': { inTransit: 'IN_TRANSIT_TO_CN', inTransitLabel: 'In Flight to China', arrived: 'ARRIVED_AT_CN', arrivedLabel: 'Flight Landed in China', warehouse: 'RECEIVED_AT_CN_WAREHOUSE', warehouseLabel: 'Received in China Warehouse', outForDelivery: 'OUT_FOR_DELIVERY_CN', outForDeliveryLabel: 'On the Way to Delivery' },
};

function getRoleButtons(directionCode) {
    const buttons = [];
    const dest = DESTINATION_CONFIG[directionCode] || DESTINATION_CONFIG['BD_TO_HK'];

    // SVG Icons
    const warehouseIcon = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
    `;

    const airportIcon = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
    `;

    const receivedIcon = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    `;

    // BD group users: Show BD buttons only (NO destination-side buttons)
    if (userRole.includes('BD_') || userRole === 'DRIVER') {
        buttons.push(
            { status: 'RECEIVED_AT_BD', label: 'Received in BD Warehouse', icon: warehouseIcon },
            { status: 'HANDED_TO_AIRLINE', label: 'Received in BD Airport', icon: airportIcon }
        );
        // BD users do NOT see Delivery Proof button
    }
    // HK group users: Show destination-side buttons + Delivery Proof
    else if (userRole.includes('HK_')) {
        buttons.push(
            { status: dest.inTransit, label: dest.inTransitLabel, icon: airportIcon },
            { status: dest.arrived, label: dest.arrivedLabel, icon: receivedIcon },
            { status: dest.warehouse, label: dest.warehouseLabel, icon: warehouseIcon },
            { status: dest.outForDelivery, label: dest.outForDeliveryLabel, icon: airportIcon }
        );
        buttons.push({ type: 'delivery', label: 'Delivery Proof' });
    }
    // Admin/Other users: Show all buttons
    else {
        buttons.push(
            { status: 'RECEIVED_AT_BD', label: 'Received in BD Warehouse', icon: warehouseIcon },
            { status: 'HANDED_TO_AIRLINE', label: 'Received in BD Airport', icon: airportIcon },
            { status: dest.inTransit, label: dest.inTransitLabel, icon: airportIcon },
            { status: dest.arrived, label: dest.arrivedLabel, icon: receivedIcon },
            { status: dest.warehouse, label: dest.warehouseLabel, icon: warehouseIcon },
            { status: dest.outForDelivery, label: dest.outForDeliveryLabel, icon: airportIcon }
        );
        buttons.push({ type: 'delivery', label: 'Delivery Proof' });
    }

    return buttons;
}
