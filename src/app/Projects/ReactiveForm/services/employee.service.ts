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

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}/${id}`);
  }

  // createEmployee(employee: Employee): Observable<Employee> {
  //   return this.http.post<Employee>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}`, employee);
  // }

  // createEmployee(employee: Employee): Observable<Employee> {
  //   return this.getAllEmployees().pipe(
  //     map(employees => {
  //       const newId = employees.length > 0 
  //         ? Math.max(...employees.map(e => e.id)) + 1 
  //         : 1;
  //       return { ...employee, id: newId };
  //     }),
  //     switchMap(newEmployee => 
  //       this.http.post<Employee>(
  //         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}`,
  //         newEmployee
  //       )
  //     )
  //   );
  // }
  // createEmployee(employee: Employee): Observable<Employee> {
  //   return this.getAllEmployees().pipe(
  //     map(employees => {
  //       // Calculate next ID as string
  //       const newId = employees.length > 0 
  //         ? (Math.max(...employees.map(e => +e.id)) + 1).toString() 
  //         : '1'; // Start with '1' as string
  //       return { ...employee, id: newId };
  //     }),
  //     switchMap(newEmployee => 
  //       this.http.post<Employee>(
  //         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}`,
  //         newEmployee
  //       )
  //     )
  //   );
  // }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.getAllEmployees().pipe(
      map(employees => {
        const newId = employees.length > 0 
          ? Math.max(...employees.map(e => e.id)) + 1 
          : 1;
        return { ...employee, id: newId };
      }),
      switchMap(newEmployee => 
        this.http.post<Employee>(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}`,
          newEmployee
        )
      )
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMPLOYEES}/${id}`);
  }
}