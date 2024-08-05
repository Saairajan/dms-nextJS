interface Driver {
    id: number;
    name: string;
    phone: string;
    email: string;
    vehicleType: string;
    licenseNumber: string;
    currentLocation: string;
    availability: boolean;
    shiftStartTime: string; // Assuming ISO date string format
    shiftEndTime: string;   // Assuming ISO date string format
}
