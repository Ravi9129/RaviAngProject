export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    category: 'Regular' | 'Premium' | 'VIP';
    status: 'Active' | 'Inactive' | 'Suspended';
    contactPerson: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
    };
    notes?: string;
  }