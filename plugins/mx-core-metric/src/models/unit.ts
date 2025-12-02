// src/models/unit.ts

export interface Unit {
  id: string;
  department_id: string;
  name: string;
  location: string;
  description: string;
  is_active: boolean;
  created_at: string;
}
