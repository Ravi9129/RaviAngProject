import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Employee } from '../models/employee.model';
import { API_CONFIG } from '../utils/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}`);
  }

  getEmployeeById(id: number | string): Observable<Employee> {
    return this.http.get<Employee>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}/${id}`);
  }

  createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.getAllEmployees().pipe(
      map(employees => {
        // Find max ID whether it's string or number
        const maxId = employees.reduce((max, emp) => {
          const currentId = typeof emp.id === 'string' ? parseInt(emp.id) : emp.id;
          return currentId > max ? currentId : max;
        }, 0);
        
        return { 
          ...employee, 
          id: (maxId + 1).toString() // Always create string IDs
        };
      }),
      switchMap(newEmployee => 
        this.http.post<Employee>(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}`,
          newEmployee
        )
      )
    );
  }

  updateEmployee(id: number | string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}/${id}`,
      employee
    );
  }

  deleteEmployee(id: number | string): Observable<void> {
    return this.http.delete<void>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}/${id}`
    );
  }
}