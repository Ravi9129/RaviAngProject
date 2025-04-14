export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    salary: number;
    joinDate: string;
    skills: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  }